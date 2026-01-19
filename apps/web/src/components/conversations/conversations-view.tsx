"use client";

import { InboxIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";

import { ConversationsNavbar } from "./conversations-navbar";

export function ConversationsView() {
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      <ConversationsNavbar />
      <div className="flex flex-1 flex-col h-full w-full gap-y-4">
        <div className="flex flex-1 items-center justify-center flex-col p-10 w-full">
          <Empty className="shadow-xs border-[1.5px] border-dashed border-primary bg-linear-to-br/oklch from-primary/20 to-accent/20 dark:from-primary/30 dark:to-background w-full max-w-5xl mx-auto">
            <EmptyHeader>
              <EmptyMedia
                variant="icon"
                className="bg-accent/60 text-primary shadow-sm"
              >
                <InboxIcon />
              </EmptyMedia>
              <EmptyTitle>No Conversations Yet</EmptyTitle>
              <EmptyDescription>
                It looks a little quiet here. Start a new conversation or choose
                one from the list to get going.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </div>
    </div>
  );
}
