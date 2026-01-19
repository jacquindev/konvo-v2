"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AlignHorizontalJustifyStartIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { useSidebar } from "@repo/ui/components/ui/sidebar";
import { ThemeToggle } from "@repo/ui/components/theme/toggle";

import { UserButton } from "./auth/user-button";

// Special case characters for breadcrumb names
const breadcrumbMap: Record<string, string> = {
  "knowledge-base": "Knowledge Base",
  customization: "Widget Customization",
  billing: "Plans & Billing",
};

const formatSegment = (segment: string) => {
  if (breadcrumbMap[segment]) {
    return breadcrumbMap[segment];
  }

  return segment
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
};

export function AppNavbar() {
  const { toggleSidebar } = useSidebar();

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    const label =
      index === 0 && breadcrumbMap[segment]
        ? breadcrumbMap[segment]
        : formatSegment(segment);

    return { href, label };
  });

  return (
    <nav className="sticky top-0 flex h-16 shrink-0 items-center justify-between border-b px-4 shadow-xs group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:px-6 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={toggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          <AlignHorizontalJustifyStartIcon className="fill-current" />
        </Button>
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((item, idx) => (
              <React.Fragment key={idx}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.href}
                    className={cn(
                      "capitalize",
                      idx < crumbs.length - 1
                        ? "text-muted-foreground"
                        : "text-foreground",
                    )}
                  >
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {idx < crumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-3">
        <UserButton />
        <ThemeToggle />
      </div>
    </nav>
  );
}
