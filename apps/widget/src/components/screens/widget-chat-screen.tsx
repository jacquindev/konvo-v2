"use client";

import { useQuery } from "convex/react";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";

import { api } from "@repo/backend/_generated/api";

import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from "@/lib/atoms";

import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";

import { WidgetHeader } from "../widget-header";

export function WidgetChatScreen() {
  const organizationId = useAtomValue(organizationIdAtom);
  const conversationId = useAtomValue(conversationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? { conversationId, contactSessionId }
      : "skip"
  );

  const handleBack = () => {
    setConversationId(null);
    setScreen("selection");
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
      <div className="flex flex-1 flex-col gap-4 p-4">
        <pre>{JSON.stringify(conversation, null, 2)}</pre>
      </div>
    </>
  );
}
