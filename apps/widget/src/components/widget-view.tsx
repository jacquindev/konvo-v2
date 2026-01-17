"use client";

import { useAtomValue } from "jotai";

import { screenAtom } from "@/lib/atoms";
import type { WidgetScreen } from "@/lib/types";

import { WidgetAuthScreen } from "./screens/widget-auth-screen";
import { WidgetChatScreen } from "./screens/widget-chat-screen";
import { WidgetContactScreen } from "./screens/widget-contact-screen";
import { WidgetErrorScreen } from "./screens/widget-error-screen";
import { WidgetInboxScreen } from "./screens/widget-inbox-screen";
import { WidgetLoadingScreen } from "./screens/widget-loading-screen";
import { WidgetSelectionScreen } from "./screens/widget-selection-screen";
import { WidgetVoiceScreen } from "./screens/widget-voice-screen";

interface WidgetViewProps {
  organizationId: string;
}

export function WidgetView({ organizationId }: WidgetViewProps) {
  const screen = useAtomValue(screenAtom);

  const renderScreen = (screen: WidgetScreen) => {
    switch (screen) {
      case "auth":
        return <WidgetAuthScreen />;
      case "chat":
        return <WidgetChatScreen />;
      case "contact":
        return <WidgetContactScreen />;
      case "error":
        return <WidgetErrorScreen />;
      case "inbox":
        return <WidgetInboxScreen />;
      case "loading":
        return <WidgetLoadingScreen organizationId={organizationId} />;
      case "selection":
        return <WidgetSelectionScreen />;
      case "voice":
        return <WidgetVoiceScreen />;
      default:
        return null;
    }
  };

  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border shadow-sm bg-card">
      {renderScreen(screen)}
    </main>
  );
}
