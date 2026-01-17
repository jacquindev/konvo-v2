import {
  ArrowLeftIcon,
  MicIcon,
  PhoneCallIcon,
  PhoneOffIcon,
} from "lucide-react";
import { useSetAtom } from "jotai";

import { useVapi } from "@/hooks/use-vapi";
import { screenAtom } from "@/lib/atoms";
import { cn } from "@repo/ui/lib/utils";

import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@repo/ui/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
} from "@repo/ui/components/ai-elements/message";
import { GeneratedAvatar } from "@repo/ui/components/shared/generated-avatar";

import { WidgetFooter } from "../widget-footer";
import { WidgetHeader } from "../widget-header";

export function WidgetVoiceScreen() {
  const setScreen = useSetAtom(screenAtom);

  const {
    isConnected,
    isSpeaking,
    transcript,
    endCall,
    isConnecting,
    startCall,
  } = useVapi();

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
          <Label>Voice Chat</Label>
        </div>
      </WidgetHeader>
      {transcript.length > 0 ? (
        <Conversation className="h-full">
          <ConversationContent>
            {transcript.map((message, index) => (
              <Message
                key={`${message.role}-${index}-${message.text}`}
                from={message.role}
                className="flex flex-row gap-2 items-start group-[.is-assistant]:flex-row-reverse"
              >
                {message.role === "assistant" && (
                  <GeneratedAvatar seed="assistant" badgeImageUrl="/logo.png" />
                )}
                <MessageContent>{message.text}</MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center rounded-full border border-border bg-muted p-3">
            <MicIcon className="size-6 shrink-0 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Transcript will appear here.</p>
        </div>
      )}

      <div className="border-t bg-muted/50 p-4">
        <div className="flex flex-col items-center gap-4">
          {isConnected && (
            <div className="flex items-center gap-2 animate-pulse">
              <div
                className={cn(
                  "size-3 rounded-full shrink-0",
                  isSpeaking ? "bg-red-500" : "bg-green-500"
                )}
              />
              <span className="text-sm text-muted-foreground">
                {isSpeaking ? "Assistant Speaking..." : "Listening..."}
              </span>
            </div>
          )}

          <div className="flex w-full justify-center">
            {isConnected ? (
              <Button
                size="lg"
                onClick={() => endCall()}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <PhoneOffIcon />
                End call
              </Button>
            ) : (
              <Button
                disabled={isConnecting}
                size="lg"
                onClick={() => startCall()}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <PhoneCallIcon />
                Start call
              </Button>
            )}
          </div>
        </div>
      </div>
      <WidgetFooter />
    </>
  );
}
