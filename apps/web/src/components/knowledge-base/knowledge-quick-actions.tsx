"use client";

import {
  FileTextIcon,
  GlobeIcon,
  UploadIcon,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

interface KnowledgeQuickActionsProps {
  setOpen: (tab: string) => void;
}

export function KnowledgeQuickActions({ setOpen }: KnowledgeQuickActionsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
      <KnowledgeQuickActionCard
        title="Add Website"
        description="Crawl your website or specific pages to automatically keep your knowledge base in sync."
        icon={GlobeIcon}
        iconClassName="group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:border-sky-400/60"
        className="hover:border-sky-400/60"
        onClick={() => setOpen("website")}
      />
      <KnowledgeQuickActionCard
        title="Manual Text"
        description="Manually copy & paste FAQs, internal notes, or policies directly into the editor for quick updates."
        icon={FileTextIcon}
        iconClassName="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-400/60"
        className="hover:border-emerald-400/60"
        onClick={() => setOpen("text")}
      />
      <KnowledgeQuickActionCard
        title="Upload File"
        description="Upload files to instantly train your assistant with existing documents."
        icon={UploadIcon}
        iconClassName="group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:border-amber-400/60"
        className="hover:border-amber-400/60"
        onClick={() => setOpen("upload")}
      />
    </div>
  );
}

interface KnowledgeQuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
  className?: string;
  onClick: () => void;
}

export function KnowledgeQuickActionCard({
  title,
  description,
  icon: Icon,
  iconClassName,
  className,
  onClick,
}: KnowledgeQuickActionCardProps) {
  return (
    <Card
      role="button"
      className={cn(
        "group border-[1.5px] hover:scale-[1.02] motion-safe:transition-all motion-safe:duration-300",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex w-full items-center justify-center">
        <div
          className={cn(
            "rounded-full border border-border bg-muted p-3 shadow-xs transition group-hover:shadow-sm",
            iconClassName
          )}
        >
          <Icon className="size-6 shrink-0" />
        </div>
      </CardContent>
      <CardHeader className="flex w-full flex-col items-center justify-center text-center text-balance">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mx-auto max-w-md">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
