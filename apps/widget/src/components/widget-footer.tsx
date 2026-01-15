"use client";

import { HomeIcon, InboxIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";

import { screenAtom } from "@/lib/atoms";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";

export function WidgetFooter() {
  const screen = useAtomValue(screenAtom);

  const setScreen = useSetAtom(screenAtom);

  return (
    <footer className="flex items-center justify-between border-t">
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="flex-1 rounded-none"
        onClick={() => setScreen("selection")}
      >
        <HomeIcon
          className={cn(
            "size-6 shrink-0",
            screen === "selection" && "text-primary"
          )}
        />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="flex-1 rounded-none"
        onClick={() => setScreen("inbox")}
      >
        <InboxIcon
          className={cn(
            "size-6 shrink-0",
            screen === "inbox" && "text-primary"
          )}
        />
      </Button>
    </footer>
  );
}
