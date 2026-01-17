"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

interface PageHeaderProps {
  icon?: LucideIcon | string;
  iconClassName?: string;
  title: string;
  description?: string | ReactNode;
  additional?: ReactNode;
}

export function PageHeader({
  icon: Icon,
  iconClassName,
  title,
  description,
  additional,
}: PageHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:flex-wrap md:items-center">
      <div className="flex grow shrink-0 items-start gap-3">
        {Icon &&
          (typeof Icon === "string" ? (
            <div
              className={cn(
                "size-8 lg:size-10 bg-transparent aspect-square relative shrink-0 rounded-md overflow-hidden",
                iconClassName,
              )}
            >
              <Image
                src={Icon}
                alt={title}
                fill
                className={cn(
                  "object-cover object-center",
                  isScrolled && "opacity-0 transition-opacity",
                )}
              />
            </div>
          ) : (
            <div className="shrink-0 rounded-lg border border-primary bg-radial from-background to-primary/60 flex items-center justify-center size-8 lg:size-10 shadow-primary/60 shadow-md">
              <Icon
                className={cn("size-5 shrink-0 lg:size-6", iconClassName)}
              />
            </div>
          ))}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
          {description && (
            <div className="text-sm lg:text-base text-pretty text-muted-foreground xl:text-lg transition [&_a]:font-medium [&_a]:text-primary [&_a]:hover:underline [&_a]:hover:underline-offset-4">
              {description}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">{additional}</div>
    </div>
  );
}
