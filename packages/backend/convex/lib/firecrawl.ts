import { ConvexError } from "convex/values";
import Firecrawl from "@mendable/firecrawl-js";

export const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

export type FirecrawlResult = {
  content: string;
  url: string;
  title?: string;
}

export async function scrapeWithFirecrawl(url: string): Promise<FirecrawlResult> {
  const result = await firecrawl.scrape(url, { formats: ["markdown"] })

  const markdown = result?.markdown;
  if (!markdown) {
    throw new ConvexError({
      code: "BAD_REQUEST",
      message: "No markdown returned from Firecrawl."
    })
  }

  return {
    content: markdown,
    url,
    title: result?.metadata?.title,
  }
}



/**
 * Create a stable content hash for text-based sources (Firecrawl, HTML, markdown).
 * This mirrors how @convex-dev/rag hashes binary content.
 */
export async function contentHashFromString(
  content: string
): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(content);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("")
}
