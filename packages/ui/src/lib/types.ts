import { LucideIcon } from "lucide-react";

export type ConversationStatus = "resolved" | "unresolved" | "escalated";

export type ConversationConfig = {
  icon: LucideIcon;
  bgColor: string;
};
