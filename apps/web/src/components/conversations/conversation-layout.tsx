"use client";

import { ReactNode } from "react";
import { useAtomValue } from "jotai";

import { useIsMobile } from "@repo/ui/hooks/use-mobile";

import { openContactPanelAtom } from "@/lib/atoms";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/ui/resizable";

import { ConversationContactPanel } from "./conversation-contact-panel";

export function ConversationLayout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const openPanel = useAtomValue(openContactPanelAtom);

  return (
    <ResizablePanelGroup className="h-full flex-1" orientation="horizontal">
      <ResizablePanel
        className="h-full"
        defaultSize={70}
        maxSize={isMobile && openPanel ? "60%" : "100%"}
      >
        <div className="flex flex-1 flex-col h-full">{children}</div>
      </ResizablePanel>
      {openPanel && (
        <>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={30}
            maxSize={isMobile ? "100%" : "40%"}
            collapsible
          >
            <ConversationContactPanel />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
