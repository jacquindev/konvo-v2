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
    (conversation) => conversation.lastMessage?.message?.role === "user"
  ).length ?? 0;

  if (unrepliedCount <= 0) return null;

  return (
    <span className={cn(
      "absolute -top-1 -right-1 size-4 px-1 shrink-0 max-w-none overflow-hidden rounded-full bg-red-500 text-white text-[6px]! font-mono font-medium flex items-center justify-center shadow-sm",
      "motion-safe:transition-all motion-safe:duration-300",
      className
    )}>
      {unrepliedCount > 99 ? "99+" : unrepliedCount}
    </span>
  )
}
