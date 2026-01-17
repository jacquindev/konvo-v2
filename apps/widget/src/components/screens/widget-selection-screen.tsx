"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  ChevronRightIcon,
  MessageCircleMoreIcon,
  MicIcon,
  PhoneIcon,
} from "lucide-react";

import { api } from "@repo/backend/_generated/api";
import { cn } from "@repo/ui/lib/utils";

import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  hasVapiSecretsAtom,
  organizationIdAtom,
  screenAtom,
  widgetSettingsAtom,
} from "@/lib/atoms";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";

import { WidgetFooter } from "../widget-footer";
import { WidgetHeader } from "../widget-header";

export function WidgetSelectionScreen() {
  const [isStartingNewChat, setIsStartingNewChat] = useState(false);

  const setScreen = useSetAtom(screenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const hasVapiSecrets = useAtomValue(hasVapiSecretsAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const createConversation = useMutation(api.public.conversations.create);

  const handleStartChat = async () => {
    if (!organizationId) {
      setErrorMessage("Missing organization ID.");
      setScreen("error");
      return;
    }

    if (!contactSessionId) {
      setScreen("auth");
      return;
    }

    setIsStartingNewChat(true);
    try {
      const conversationId = await createConversation({
        contactSessionId,
        organizationId,
      });

      setConversationId(conversationId);
      setScreen("chat");
    } catch (error) {
      console.error(error);
      setScreen("auth");
    } finally {
      setIsStartingNewChat(false);
    }
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">How can I help you today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col overflow-y-auto p-6 gap-6">
        <Item
          role="button"
          variant="outline"
          className={cn(
            "group border-border bg-muted/60 shadow-xs hover:border-primary hover:shadow-sm motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-0.5",
            isStartingNewChat && "opacity-50 pointer-events-none"
          )}
          onClick={handleStartChat}
        >
          <ItemMedia
            variant="icon"
            className="group-hover:border-primary/40 transition rounded-md"
          >
            <MessageCircleMoreIcon className="group-hover:text-primary" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Start Chat</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
          </ItemActions>
        </Item>

        {hasVapiSecrets && widgetSettings?.vapiSettings?.assistantId && (
          <Item
            role="button"
            variant="outline"
            className={cn(
              "group border-border bg-muted/60 shadow-xs hover:border-primary hover:shadow-sm motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-0.5",
              isStartingNewChat && "opacity-50 pointer-events-none"
            )}
            onClick={() => setScreen("voice")}
          >
            <ItemMedia
              variant="icon"
              className="group-hover:border-primary/40 transition rounded-md"
            >
              <MicIcon className="group-hover:text-primary" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Start Voice Call</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
            </ItemActions>
          </Item>
        )}

        {hasVapiSecrets && widgetSettings?.vapiSettings?.phoneNumber && (
          <Item
            role="button"
            variant="outline"
            className={cn(
              "group border-border bg-muted/60 shadow-xs hover:border-primary hover:shadow-sm motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-0.5",
              isStartingNewChat && "opacity-50 pointer-events-none"
            )}
            onClick={() => setScreen("contact")}
          >
            <ItemMedia
              variant="icon"
              className="group-hover:border-primary/40 transition rounded-md"
            >
              <PhoneIcon className="group-hover:text-primary" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Call Us</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
            </ItemActions>
          </Item>
        )}
      </div>
      <WidgetFooter />
    </>
  );
}
