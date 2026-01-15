"use client";

import { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { ConvexError } from "convex/values";
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { Wand2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { api } from "@repo/backend/_generated/api";
import type { Doc, Id } from "@repo/backend/_generated/dataModel";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";
import { cn } from "@repo/ui/lib/utils";

import { Skeleton } from "@repo/ui/components/ui/skeleton";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@repo/ui/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@repo/ui/components/ai-elements/prompt-input";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@repo/ui/components/ai-elements/message";
import { InfiniteScrollTrigger } from "@repo/ui/components/shared/infinite-scroll-trigger";
import { GeneratedAvatar } from "@repo/ui/components/shared/generated-avatar";

import { ConversationsNavbar } from "./conversations-navbar";
import { ConversationStatusButton } from "./conversation-status-button";

interface ConversationViewProps {
  conversationId: Id<"conversations">;
}

const formSchema = z.object({
  message: z.string().min(1, "Please input a message."),
});

export function ConversationView({ conversationId }: ConversationViewProps) {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isEnhancingResponse, setIsEnhancingResponse] = useState(false);

  const conversation = useQuery(api.private.conversations.getOne, {
    conversationId,
  });

  const messages = useThreadMessages(
    api.private.messages.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : "skip",
    { initialNumItems: 10 }
  );

  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: messages.status,
    loadMore: messages.loadMore,
    loadSize: 10,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const createMessage = useMutation(api.private.messages.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createMessage({ conversationId, prompt: values.message });
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? error.message
          : "Failed to save message.";
      toast.error(errorMessage);
    }
  };

  const updateConversationStatus = useMutation(
    api.private.conversations.updateStatus
  );

  const toggleStatus = async () => {
    if (!conversation) return;

    setIsUpdatingStatus(true);

    let newStatus: Doc<"conversations">["status"];

    if (conversation.status === "unresolved") {
      newStatus = "escalated";
    } else if (conversation.status === "escalated") {
      newStatus = "resolved";
    } else {
      newStatus = "unresolved";
    }

    try {
      await updateConversationStatus({ conversationId, status: newStatus });
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? error.message
          : "Unable to update conversation status.";
      toast.error(errorMessage);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const enhanceResponse = useAction(api.private.messages.enhanceResponse);

  const handleEnhanceResponse = async () => {
    const currentValue = form.getValues("message");

    setIsEnhancingResponse(true);

    try {
      const response = await enhanceResponse({ prompt: currentValue });
      form.setValue("message", response);
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? error.message
          : "Unable to enhance response with AI.";
      toast.error(errorMessage);
    } finally {
      setIsEnhancingResponse(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <ConversationsNavbar
        additional={
          !!conversation && (
            <ConversationStatusButton
              status={conversation?.status}
              onClick={toggleStatus}
              disabled={isUpdatingStatus}
            />
          )
        }
      />

      <Conversation className="max-h-[calc(100dvh-188px)]">
        <ConversationContent>
          {isLoadingFirstPage || conversation === undefined ? (
            Array.from({ length: 5 }).map((_, index) => {
              const isUser = index % 2 === 0;
              const widths = ["w-48", "w-60", "w-72"];
              const width = widths[index % widths.length];

              return (
                <div
                  key={index}
                  className={cn(
                    "group flex w-full items-end justify-end gap-2 py-2 [&>div]:max-w-[80%]",
                    isUser ? "is-user" : "is-assistant flex-row-reverse"
                  )}
                >
                  <Skeleton
                    className={cn(
                      "h-10 rounded-lg bg-muted",
                      width,
                      isUser && "bg-secondary"
                    )}
                  />
                  <Skeleton className="size-9 rounded-full" />
                </div>
              );
            })
          ) : (
            <>
              <InfiniteScrollTrigger
                ref={topElementRef}
                canLoadMore={canLoadMore}
                isLoadingMore={isLoadingMore}
                onLoadMore={handleLoadMore}
                noMoreText="No more messages"
              />
              {toUIMessages(messages.results ?? [])?.map((message) => (
                <Message
                  key={message.id}
                  // In reverse, because we are watching as "assistant"
                  from={message.role === "user" ? "assistant" : "user"}
                  className="flex flex-row gap-2 items-start group-[.is-assistant]:flex-row-reverse"
                >
                  {message.role === "user" && (
                    <GeneratedAvatar
                      seed={conversation?.contactSessionId || "user"}
                    />
                  )}
                  <MessageContent>
                    <MessageResponse>{message.text}</MessageResponse>
                  </MessageContent>
                </Message>
              ))}
              <ConversationScrollButton
                variant="secondary"
                size="icon-sm"
                className="shadow-md animate-pulse"
              />
            </>
          )}
        </ConversationContent>
      </Conversation>

      <div className="p-2">
        <PromptInput onSubmit={() => form.handleSubmit(onSubmit)()}>
          <Controller
            control={form.control}
            name="message"
            render={({ field, fieldState }) => (
              <PromptInputBody>
                <PromptInputTextarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  disabled={
                    conversation?.status === "resolved" ||
                    form.formState.isSubmitting ||
                    isEnhancingResponse ||
                    isLoadingFirstPage
                  }
                  placeholder={
                    conversation?.status === "resolved"
                      ? "This conversation has been resolved."
                      : "Type your message..."
                  }
                />
              </PromptInputBody>
            )}
          />
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputButton
                type="button"
                onClick={handleEnhanceResponse}
                disabled={
                  conversation?.status === "resolved" ||
                  !form.formState.isValid ||
                  form.formState.isSubmitting ||
                  isEnhancingResponse ||
                  isLoadingFirstPage
                }
              >
                <Wand2Icon
                  className={cn(isEnhancingResponse && "animate-pulse")}
                />
                {isEnhancingResponse ? "Enhancing..." : "Enhance"}
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit
              type="submit"
              disabled={
                conversation?.status === "resolved" ||
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                isEnhancingResponse ||
                isLoadingFirstPage
              }
              status="ready"
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
