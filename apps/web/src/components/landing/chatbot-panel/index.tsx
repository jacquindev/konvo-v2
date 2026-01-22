"use client";

import { useEffect, useRef, useState } from "react";
import { SendIcon, User2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { cn } from "@repo/ui/lib/utils";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";

import { CardBody, CardContainer, CardItem } from "@repo/ui/components/shared/3d-card";

import mockMessagesData from "./mock-data.json";

const MOCK_PANEL_MESSAGES = mockMessagesData.map((item) => ({ ...item }));

export function ChatbotPanel() {
  const [visibleCount, setVisibleCount] = useState(0);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside message container when visibleCount changes
  useEffect(() => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleCount]);

  // Loop showing messages one by one
  useEffect(() => {
    const totalMessages = MOCK_PANEL_MESSAGES.length;

    if (visibleCount > totalMessages) {
      const timeout = setTimeout(() => setVisibleCount(0), 4000);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => setVisibleCount((count) => count + 1), 4000);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <CardContainer className="inter-var">
      <CardBody className="h-150 rounded-xl bg-[#0a0a0e]/50 p-0 shadow-lg ring-1 ring-white/5 backdrop-blur-sm max-w-[500px]">
        <CardItem
          translateZ={50}
          className="flex w-full items-center gap-3 border-b border-white/10 p-4"
        >
          <div className="size-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
          <span className="font-medium text-zinc-300">Konvo Inc.</span>
        </CardItem>
        <CardItem
          translateZ={60}
          ref={messagesContainerRef}
          className="h-[425px] flex-1 space-y-6 overflow-y-auto scroll-smooth px-4 py-2"
        >
          <AnimatePresence mode="wait">
            {MOCK_PANEL_MESSAGES.slice(0, visibleCount).map((message) => {
              const isUser = message.sender === "user";

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "flex items-start gap-2",
                    isUser ? "justify-end" : "justify-start"
                  )}
                >
                  {!isUser && (
                    <Avatar className="size-8">
                      <AvatarImage src="/avatar-3.jpg" alt="bot image" />
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%]",
                      isUser ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-xl px-4 py-2 text-xs leading-tight whitespace-pre-wrap",
                        isUser
                          ? "rounded-tr-xs bg-gray-800 text-gray-300"
                          : "rounded-tl-xs bg-primary text-primary-foreground"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                  {isUser && (
                    <Avatar className="size-8 border border-white/10">
                      <AvatarFallback>
                        <User2Icon className="size-4 text-gray-400" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </CardItem>
        <CardItem
          translateZ={50}
          className="pointer-events-none mt-auto w-full border-t border-white/10"
        >
          <div className="flex flex-wrap gap-2 p-4">
            <Badge variant="secondary">FAQ</Badge>
            <Badge variant="secondary">Pricing</Badge>
            <Badge variant="secondary">Support</Badge>
          </div>
          <div className="flex flex-1 items-center justify-between gap-3 px-4">
            <Input readOnly className="flex-1 border-white/10" placeholder="Type a message..." />
            <Button size="icon-sm" type="button">
              <SendIcon />
            </Button>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
