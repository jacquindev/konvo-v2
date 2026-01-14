import { cn } from "@repo/ui/lib/utils";
import { ReactNode } from "react";

interface WidgetHeaderProps {
  children: ReactNode;
  className?: string;
}

export function WidgetHeader({ children, className }: WidgetHeaderProps) {
  return (
    <div
      className={cn(
        "p-4 text-white bg-linear-to-b from-[#6e56cf] via-[#5d5fef] to-[#4740b3]",
        className
      )}
    >
      {children}
    </div>
  );
}
