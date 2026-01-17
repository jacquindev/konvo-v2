import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { internal } from "../_generated/api";
import { action, query } from "../_generated/server";
import { supportAgent } from "../shared/ai/agents/supportAgent";
import { escalateConversation } from "../shared/ai/tools/escalateConversation";
import { resolveConversation } from "../shared/ai/tools/resolveConversation";
import { search } from "../shared/ai/tools/search";

export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.runQuery(
      internal.shared.contactSessions.getOne,
      {
        contactSessionId: args.contactSessionId,
      },
    );

    if (!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired session.",
      });
    }

    const conversation = await ctx.runQuery(
      internal.shared.conversations.getByThreadId,
      {
        threadId: args.threadId,
      },
    );

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found.",
      });
    }

    if (conversation.status === "resolved") {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Conversation resolved.",
      });
    }

    // TODO: Implement subscription check
    const subscription = await ctx.runQuery(
      internal.shared.subscriptions.getByOrganizationId,
      {
        organizationId: conversation.organizationId,
      },
    );

    const shouldTriggerAgent =
      conversation.status === "unresolved" && subscription?.status === "active";

    if (shouldTriggerAgent) {
      await supportAgent.generateText(
        ctx,
        { threadId: args.threadId },
        {
          prompt: args.prompt,
          tools: {
            resolveConversationTool: resolveConversation,
            escalateConversationTool: escalateConversation,
            searchTool: search,
          },
        },
      );
    } else {
      await supportAgent.saveMessage(ctx, {
        threadId: args.threadId,
        prompt: args.prompt,
      });
    }
  },
});

export const getMany = query({
  args: {
    contactSessionId: v.id("contactSessions"),
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);

    if (!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired session.",
      });
    }

    const paginated = await supportAgent.listMessages(ctx, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });

    return paginated;
  },
});
