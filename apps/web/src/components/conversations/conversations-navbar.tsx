"use client";

import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";

import { ThemeToggle } from "@repo/ui/components/theme/toggle";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { MoreHorizontalIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@repo/ui/components/ui/breadcrumb";

interface ConversationsNavbarProps {
  additional?: ReactNode;
}

export function ConversationsNavbar({ additional }: ConversationsNavbarProps) {
  return (
    <nav className="flex h-14 shrink-0 items-center justify-between border-b px-4 shadow-xs  bg-background">
      <div className="flex items-center gap-0.5">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        <ThemeToggle className="border-none shadow-none bg-transparent dark:bg-transparent" />
        <Button
          variant="ghost"
          size="icon-xs"
          className="shadow-none text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontalIcon />
        </Button>
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
