"use client";

import React from "react";
import Image from "next/image";
import { type LucideIcon } from "lucide-react";

import { useIsMobile } from "@repo/ui/hooks/use-mobile";
import { cn } from "@repo/ui/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@repo/ui/components/ui/drawer";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";

interface ResponsiveDialogProps {
  icon?: LucideIcon | string;
  iconClassName?: string;
  title?: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export const ResponsiveDialog = ({
  icon,
  iconClassName,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  className,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();
  const Icon = icon;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          className={cn(
            "rounded-none border-none p-0 backdrop-blur-2xl dark:bg-card/60",
            className
          )}
        >
          <DrawerHeader
            className={cn(
              "flex flex-col items-center justify-center gap-2",
              !title && "sr-only"
            )}
          >
            {Icon ? (
              typeof Icon === "string" ? (
                <div
                  className={cn(
                    "relative mb-4 size-8 overflow-hidden rounded-md bg-transparent",
                    iconClassName
                  )}
                >
                  <Image
                    src={Icon}
                    alt="icon"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <Icon
                  className={cn("mb-4 size-8 text-primary", iconClassName)}
                />
              )
            ) : null}
            <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
            <DrawerDescription className="text-center text-base text-balance [&_a]:font-medium [&_a]:text-primary [&_a]:hover:underline [&_a]:hover:underline-offset-4">
              {description}
            </DrawerDescription>
          </DrawerHeader>
          <div
            className={cn("max-h-[80%] overflow-auto p-6", !!title && "pt-0")}
          >
            {children}
          </div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-full rounded-xl border-none backdrop-blur-2xl sm:max-w-xl dark:bg-card/60",
          className
        )}
      >
        <DialogHeader
          className={cn(
            "flex flex-col items-center justify-center gap-2",
            !title && "sr-only"
          )}
        >
          {Icon ? (
            typeof Icon === "string" ? (
              <div
                className={cn(
                  "relative mb-4 size-8 overflow-hidden rounded-md bg-transparent",
                  iconClassName
                )}
              >
                <Image
                  src={Icon}
                  alt="icon"
                  fill
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <Icon className={cn("mb-4 size-8 text-primary", iconClassName)} />
            )
          ) : null}
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-center text-base text-balance [&_a]:font-medium [&_a]:text-primary [&_a]:hover:underline [&_a]:hover:underline-offset-4">
            {description}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[500px] overflow-auto px-4">
          {children}
        </ScrollArea>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
