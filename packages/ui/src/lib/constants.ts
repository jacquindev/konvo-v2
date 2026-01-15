import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";

import type { ConversationConfig, ConversationStatus } from "./types";

export const ConversationStatusConfig: Record<
  ConversationStatus,
  ConversationConfig
> = {
  resolved: {
    icon: CheckIcon,
    bgColor: "bg-linear-to-br to-emerald-400 from-emerald-700 text-white",
  },
  unresolved: {
    icon: ArrowRightIcon,
    bgColor: "bg-linear-to-br from-red-700 to-red-400 text-white",
  },
  escalated: {
    icon: ArrowUpIcon,
    bgColor: "bg-linear-to-br from-amber-700 to-amber-400 text-white",
  },
} as const;
