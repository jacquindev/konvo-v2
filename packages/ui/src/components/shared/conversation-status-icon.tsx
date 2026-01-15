import type { ConversationStatus } from "@repo/ui/lib/types";
import { ConversationStatusConfig } from "@repo/ui/lib/constants";
import { cn } from "@repo/ui/lib/utils";

interface ConversationStatusIconProps {
  status: ConversationStatus;
  className?: string;
}

export function ConversationStatusIcon({
  status,
  className,
}: ConversationStatusIconProps) {
  const config = ConversationStatusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "shadow-xs flex items-center justify-center rounded-full p-1.5 shrink-0 size-6",
        config.bgColor,
        className
      )}
    >
      <Icon className="size-4 stroke-3 shrink-0" />
    </div>
  );
}
