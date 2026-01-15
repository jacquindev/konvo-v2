import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  text: string | React.ReactNode;
}

export function Hint({
  children,
  text,
  ...props
}: HintProps & React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent {...props}>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
