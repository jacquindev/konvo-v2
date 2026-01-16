"use client";

import { useAction, useQuery } from "convex/react";
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { api } from "@repo/backend/_generated/api";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";

import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
  widgetSettingsAtom,
} from "@/lib/atoms";

import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@repo/ui/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputBody,
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
import {
  Suggestion,
  Suggestions,
} from "@repo/ui/components/ai-elements/suggestion";
import { InfiniteScrollTrigger } from "@repo/ui/components/shared/infinite-scroll-trigger";
import { GeneratedAvatar } from "@repo/ui/components/shared/generated-avatar";

import { WidgetHeader } from "../widget-header";
import { useMemo } from "react";

const formSchema = z.object({
  message: z.string().min(1, "Please input a message."),
});

export function WidgetChatScreen() {
  const organizationId = useAtomValue(organizationIdAtom);
  const conversationId = useAtomValue(conversationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const widgetSettings = useAtomValue(widgetSettingsAtom);

  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const suggestions = useMemo(() => {
    if (!widgetSettings) return [];

    return Object.keys(widgetSettings.defaultSuggestions).map((key) => {
      return widgetSettings.defaultSuggestions[
        key as keyof typeof widgetSettings.defaultSuggestions
      ];
    });
  }, [widgetSettings]);

  const handleBack = () => {
    setConversationId(null);
    setScreen("selection");
  };

  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? { conversationId, contactSessionId }
      : "skip"
  );

  const messages = useThreadMessages(
    api.public.messages.getMany,
    conversation?.threadId && contactSessionId
      ? { threadId: conversation.threadId, contactSessionId }
      : "skip",
    { initialNumItems: 10 }
  );

  const { topElementRef, canLoadMore, handleLoadMore, isLoadingMore } =
    useInfiniteScroll({
      status: messages.status,
      loadMore: messages.loadMore,
      loadSize: 10,
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const createMessage = useAction(api.public.messages.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!conversation || !contactSessionId) return;

    form.reset();

    await createMessage({
      threadId: conversation.threadId,
      prompt: values.message,
      contactSessionId,
    });
  };

  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="transparent" onClick={handleBack}>
            <ArrowLeftIcon />
          </Button>
          <Label>Chat</Label>
        </div>
        <Button size="icon" variant="transparent">
          <MenuIcon />
        </Button>
      </WidgetHeader>
      <Conversation>
        <InfiniteScrollTrigger
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
          ref={topElementRef}
        />
        <ConversationContent>
          {toUIMessages(messages.results ?? [])?.map((message) => {
            return (
              <Message
                key={message.id}
                from={message.role === "user" ? "user" : "assistant"}
                className="flex flex-row gap-2 items-start group-[.is-assistant]:flex-row-reverse"
              >
                {message.role === "assistant" && (
                  <GeneratedAvatar seed="assistant" badgeImageUrl="/logo.png" />
                )}
                <MessageContent>
                  <MessageResponse>{message.text}</MessageResponse>
                </MessageContent>
              </Message>
            );
          })}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {toUIMessages(messages.results ?? [])?.length === 1 && (
        <Suggestions className="flex flew-row flex-wrap w-full py-2 px-4">
          {suggestions.map((suggestion) => {
            if (!suggestion) return null;

            return (
              <Suggestion
                key={suggestion}
                suggestion={suggestion}
                onClick={() => {
                  form.setValue("message", suggestion, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                  form.handleSubmit(onSubmit)();
                }}
              />
            );
          })}
        </Suggestions>
      )}

      <PromptInput
        onSubmit={() => form.handleSubmit(onSubmit)()}
        className="rounded-none border-x-0 border-b-0 p-4"
      >
        <Controller
          control={form.control}
          name="message"
          disabled={conversation?.status === "resolved"}
          render={({ field, fieldState }) => (
            <PromptInputBody>
              <PromptInputTextarea
                {...field}
                aria-invalid={fieldState.invalid}
                disabled={conversation?.status === "resolved"}
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
          <PromptInputTools />
          <PromptInputSubmit
            disabled={
              conversation?.status === "resolved" || !form.formState.isValid
            }
            status="ready"
            type="submit"
          />
        </PromptInputFooter>
      </PromptInput>
    </>
  );
}
