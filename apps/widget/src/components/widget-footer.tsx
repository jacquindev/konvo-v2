"use client";

import { HomeIcon, InboxIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";

export function WidgetFooter() {
  const screen = "selection";

  return (
    <footer className="flex items-center justify-between border-t">
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="flex-1 rounded-none"
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
