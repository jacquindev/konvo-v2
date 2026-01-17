import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import type { Doc } from "@repo/backend/_generated/dataModel";

export type Feature = {
  icon: LucideIcon;
  label: string;
  description: string | ReactNode;
};

export type WidgetSettings = Doc<"widgetSettings">;
