"use client";

import { ConversationStatusConfig } from "@repo/ui/lib/constants";
import type { Doc } from "@repo/backend/_generated/dataModel";

import { Hint } from "@repo/ui/components/shared/hint";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";

interface ConversationStatusButtonProps {
  status: Doc<"conversations">["status"];
  onClick: () => void;
  disabled?: boolean;
}

export function ConversationStatusButton({
  status,
  onClick,
  disabled,
}: ConversationStatusButtonProps) {
  const config = ConversationStatusConfig[status];
  const Icon = config.icon;

  switch (status) {
    case "escalated":
      return (
        <Hint text="Mark as 'resolved'">
          <Button
            type="button"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className={cn(
              "rounded-full shadow-xs hover:opacity-80 hover:-translate-y-0.5 hover:shadow-sm motion-safe:transition-all motion-safe:duration-300",
              config.bgColor
            )}
          >
            <Icon /> Escalated
          </Button>
        </Hint>
      );
    case "resolved":
      return (
        <Hint text="Mark as 'unresolved'">
          <Button
            type="button"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className={cn(
              "rounded-full shadow-xs hover:opacity-80 hover:-translate-y-0.5 hover:shadow-sm motion-safe:transition-all motion-safe:duration-300",
              config.bgColor
            )}
          >
            <Icon /> Resolved
          </Button>
        </Hint>
      );
    case "unresolved":
      return (
        <Hint text="Mark as 'escalated'">
          <Button
            type="button"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className={cn(
              "rounded-full shadow-xs hover:opacity-80 hover:-translate-y-0.5 hover:shadow-sm motion-safe:transition-all motion-safe:duration-300",
              config.bgColor
            )}
          >
            <Icon /> Unresolved
          </Button>
        </Hint>
      );
    default:
      return null;
  }
}
