"use client";

import { usePaginatedQuery } from "convex/react";

import { api } from "@repo/backend/_generated/api";
import { cn } from "@repo/ui/lib/utils";


export function ConversationsNotificationBadge({ className }: { className?: string }) {
  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: undefined },
    { initialNumItems: 10 },
  );

  const unrepliedCount = conversations.results?.filter(
    (conversation) => conversation.lastMessage?.message?.role === "user" && conversation.status !== "resolved"
  ).length ?? 0;

  if (unrepliedCount <= 0) return null;

  return (
    <span className={cn(
      "absolute -top-1 -right-1 p-1 min-w-4.5 h-4.5 text-wrap leading-none tracking-tighter max-w-none overflow-hidden rounded-full bg-red-500 dark:bg-red-700 text-white text-xs font-mono font-normal flex items-center justify-center shadow-sm",
      "motion-safe:transition-all motion-safe:duration-300",
      className
    )}>
      {unrepliedCount >= 99 ? "!" : unrepliedCount}
    </span>
  )
}
