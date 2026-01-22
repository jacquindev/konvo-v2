"use client";

import { usePaginatedQuery } from "convex/react";
import { 
  LibraryBigIcon, 
  MessageCircleMoreIcon, 
  MessagesSquareIcon,
  type LucideIcon
} from "lucide-react";

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardAction 
} from "@repo/ui/components/ui/card";

import { api } from "@repo/backend/_generated/api";

export function DashboardKpis() {
  const knowledge = usePaginatedQuery(api.private.files.list, {}, { initialNumItems: 10 });
  const conversations = usePaginatedQuery(api.private.conversations.getMany, {}, { initialNumItems: 10 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KpiCard 
        icon={MessagesSquareIcon}
        title="Total Conversations"
        value={conversations.results?.length ?? 0}
      />
      <KpiCard 
        icon={MessageCircleMoreIcon}
        title="Open Conversations"
        value={conversations.results?.filter((c) => c.status === "unresolved")?.length ?? 0}
      />
      <KpiCard 
        icon={LibraryBigIcon}
        title="Added Resources"
        value={knowledge.results?.length ?? 0}
      />
    </div>
  )
}

export function KpiCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon?: LucideIcon
}) {
  return (
    <Card className="bg-linear-to-b from-card to-primary/10">
      <CardHeader className="space-y-1">
        <CardDescription className="text-xs uppercase tracking-wide">
          {title}
        </CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        {!!Icon && (
          <CardAction>
            <div className="flex items-center justify-center size-8 rounded-lg border border-primary/10 bg-primary/10">
              <Icon className="size-5 shrink-0" />
            </div>
          </CardAction>
        )}
      </CardHeader>
    </Card>
  );
}
