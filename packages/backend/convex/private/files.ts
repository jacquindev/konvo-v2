import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import {
  contentHashFromArrayBuffer,
  guessMimeTypeFromContents,
  guessMimeTypeFromExtension,
  vEntryId,
} from "@convex-dev/rag";

import { internal } from "../_generated/api";
import type { Id } from "../_generated/dataModel";
import { action, mutation, query } from "../_generated/server";
import { extractTextContent } from "../lib/extractTextContent";
import { rag } from "../shared/ai/rag";
import {
  convertEntryToPublicFile,
  EntryMetadata,
} from "../lib/convertEntryToPublicFile";

export const addFile = action({
  args: {
    filename: v.string(),
    mimeType: v.string(),
    bytes: v.bytes(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Unauthenticated.",
      });
    }

    const orgId = identity.organization_id as string;

    if (!orgId) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Organization not found.",
      });
    }

    const subscription = await ctx.runQuery(
      internal.shared.subscriptions.getByOrganizationId,
      {
        organizationId: orgId,
      },
    );

    if (subscription?.status !== "active") {
      throw new ConvexError({
        code: "FORBIDDEN",
        message:
          "You need to have an active subscription to perform this action.",
      });
    }

    const { bytes, filename, category } = args;

    const mimeType =
      args.mimeType ||
      guessMimeTypeFromExtension(filename) ||
      guessMimeTypeFromContents(bytes);

    const blob = new Blob([bytes], { type: mimeType });

    const storageId = await ctx.storage.store(blob);

    const text = await extractTextContent(ctx, {
      storageId,
      filename,
      bytes,
      mimeType,
    });

    const { entryId, created } = await rag.add(ctx, {
      // Add the text to a namespace shared by all users in an organization.
      namespace: orgId,
      text,
      key: filename,
      title: filename,
      metadata: {
        storageId,
        uploadedBy: orgId,
        filename,
        category: category ?? null,
      } satisfies EntryMetadata,
      // To avoid re-inserting if the file content hasn't changed
      contentHash: await contentHashFromArrayBuffer(bytes),
    });

    if (!created) {
      console.debug("Entry already exists, skipping upload metadata.");
      await ctx.storage.delete(storageId);
    }

    return {
      url: await ctx.storage.getUrl(storageId),
      entryId,
    };
  },
});

export const deleteFile = mutation({
  args: {
    entryId: vEntryId,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Unauthenticated.",
      });
    }

    const orgId = identity.organization_id as string;

    if (!orgId) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Organization not found.",
      });
    }

    const namespace = await rag.getNamespace(ctx, { namespace: orgId });

    if (!namespace) {
      throw new ConvexError({
        code: "FORBIDDEN",
        message: "You don't have permission to delete this file.",
      });
    }

    const entry = await rag.getEntry(ctx, {
      entryId: args.entryId,
    });

    if (!entry) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Entry not found.",
      });
    }

    if (entry.metadata?.uploadedBy !== orgId) {
      throw new ConvexError({
        code: "FORBIDDEN",
        message: "You don't have permission to delete this file.",
      });
    }

    if (entry.metadata?.storageId) {
      await ctx.storage.delete(entry.metadata.storageId as Id<"_storage">);
    }

    await rag.deleteAsync(ctx, { entryId: args.entryId });
  },
});

export const list = query({
  args: {
    category: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Unauthenticated.",
      });
    }

    const orgId = identity.organization_id as string;

    if (!orgId) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Organization not found.",
      });
    }

    const namespace = await rag.getNamespace(ctx, { namespace: orgId });

    if (!namespace) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const results = await rag.list(ctx, {
      namespaceId: namespace.namespaceId,
      paginationOpts: args.paginationOpts,
    });

    const files = await Promise.all(
      results.page.map((entry) => convertEntryToPublicFile(ctx, entry)),
    );

    const filteredFiles = args.category
      ? files.filter((file) => file.category === args.category)
      : files;

    return {
      page: filteredFiles,
      isDone: results.isDone,
      continueCursor: results.continueCursor,
    };
  },
});
