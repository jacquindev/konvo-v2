import { Entry, EntryId } from "@convex-dev/rag";

import { QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export type PublicFile = {
  id: EntryId;
  name: string;
  type: string;
  size: string;
  status: "ready" | "processing" | "error";
  url: string | null;
  category?: string;
};

export type EntryMetadata = {
  storageId: Id<"_storage">;
  uploadedBy: string;
  filename: string;
  category: string | null;
  sourceUrl?: string;
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** i).toFixed(1))}${sizes[i]}`;
}

export async function convertEntryToPublicFile(
  ctx: QueryCtx,
  entry: Entry
): Promise<PublicFile> {
  const metadata = entry.metadata as EntryMetadata | undefined;

  const storageId = metadata?.storageId;

  let fileSize = "unknown";

  if (storageId) {
    try {
      const storageMetadata = await ctx.db.system.get(storageId);
      if (storageMetadata) {
        fileSize = formatFileSize(storageMetadata.size);
      }
    } catch (error) {
      console.error("Failed to to get storage metadata:", error);
    }
  }
  
  const entryKey = entry.key ?? "Untitled"

  const isWebsite = entryKey.startsWith("http://") || entryKey.startsWith("https://")

  const filename = entryKey ?? metadata?.filename ?? "Untitled";
  const extension = entryKey.split(".").pop()?.toLowerCase() || "txt";

  let status: "ready" | "processing" | "error" = "error";

  if (entry.status === "ready") {
    status = "ready";
  } else if (entry.status === "pending") {
    status = "processing";
  }

  const url = storageId ? await ctx.storage.getUrl(storageId) : null;

  return {
    id: entry.entryId,
    name: filename,
    type: isWebsite ? "web" : extension,
    size: fileSize,
    status,
    url,
    category: metadata?.category || undefined,
  };
}
