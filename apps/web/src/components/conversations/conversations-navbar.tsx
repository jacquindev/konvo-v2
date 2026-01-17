"use client";

import { ReactNode } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { UserButton } from "@clerk/nextjs";

import { openContactPanelAtom } from "@/lib/atoms";

import { ThemeToggle } from "@repo/ui/components/theme/toggle";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@repo/ui/components/ui/breadcrumb";
import { Hint } from "@repo/ui/components/shared/hint";

interface ConversationsNavbarProps {
  additional?: ReactNode;
}

export function ConversationsNavbar({ additional }: ConversationsNavbarProps) {
  const openPanel = useAtomValue(openContactPanelAtom);
  const setOpenPanel = useSetAtom(openContactPanelAtom);

  const toggleContactPanel = () => {
    if (openPanel) {
      setOpenPanel(false);
    } else {
      setOpenPanel(true);
    }
  };

  return (
    <nav className="flex h-14 shrink-0 items-center justify-between border-b px-4 shadow-xs  bg-background">
      <div className="flex items-center gap-0.5">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        <ThemeToggle className="border-none shadow-none bg-transparent dark:bg-transparent" />
        <Hint text="Contact Panel">
          <Button
            variant="ghost"
            size="icon-xs"
            className="shadow-none text-muted-foreground hover:text-foreground"
            onClick={toggleContactPanel}
          >
            <MoreHorizontalIcon />
          </Button>
        </Hint>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-4 mx-2"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/conversations">
                Conversations
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-3">
        {additional}
        <UserButton />
      </div>
    </nav>
  );
}
