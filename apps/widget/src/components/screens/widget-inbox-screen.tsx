"use client";

import { usePaginatedQuery } from "convex/react";
import { ArrowLeftIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { formatDistanceToNow } from "date-fns";

import { api } from "@repo/backend/_generated/api";

import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from "@/lib/atoms";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";

import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { ConversationStatusIcon } from "@repo/ui/components/shared/conversation-status-icon";

import { WidgetFooter } from "../widget-footer";
import { WidgetHeader } from "../widget-header";
import { InfiniteScrollTrigger } from "@repo/ui/components/shared/infinite-scroll-trigger";
import { Id } from "@repo/backend/_generated/dataModel";

export function WidgetInboxScreen() {
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const conversations = usePaginatedQuery(
    api.public.conversations.getMany,
    contactSessionId ? { contactSessionId } : "skip",
    { initialNumItems: 10 }
  );

  const { topElementRef, isLoadingMore, handleLoadMore, canLoadMore } =
    useInfiniteScroll({
      status: conversations.status,
      loadMore: conversations.loadMore,
      loadSize: 10,
    });

  const onSelect = (id: Id<"conversations">) => {
    setConversationId(id);
    setScreen("chat");
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="transparent"
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon />
          </Button>
          <Label>Inbox</Label>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-4 p-6 overflow-y-auto">
        {conversations?.results.length > 0 &&
          conversations.results.map((conversation) => (
            <div
              key={conversation._id}
              role="button"
              className="min-h-20 group rounded-lg border border-border bg-muted/60 shadow-xs hover:border-primary hover:shadow-sm motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-0.5 p-4"
              onClick={() => onSelect(conversation._id)}
            >
              <div className="flex flex-col gap-4 w-full overflow-hidden text-start">
                <div className="flex w-full items-center justify-between gap-4">
                  <p className="text-muted-foreground text-xs font-medium">
                    Chat
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatDistanceToNow(conversation._creationTime, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between gap-4">
                  <p className="truncate text-sm">
                    {conversation.lastMessage?.text}
                  </p>
                  <ConversationStatusIcon
                    status={conversation.status}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          ))}

        <InfiniteScrollTrigger
          ref={topElementRef}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          canLoadMore={canLoadMore}
        />
      </div>
      <WidgetFooter />
    </>
  );
}
