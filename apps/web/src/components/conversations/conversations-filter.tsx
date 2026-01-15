"use client";

import { ListIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";

import { statusFilterAtom } from "@/lib/atoms";

import { ConversationStatusConfig } from "@repo/ui/lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

const statuses = ["unresolved", "escalated", "resolved"] as const;

export function ConversationsFilter() {
  const statusFilter = useAtomValue(statusFilterAtom);
  const setStatusFilter = useSetAtom(statusFilterAtom);

  return (
    <Select
      defaultValue="all"
      value={statusFilter}
      onValueChange={(value) =>
        setStatusFilter(
          value as "unresolved" | "escalated" | "resolved" | "all"
        )
      }
    >
      <SelectTrigger
        size="sm"
        className="bg-transparent border-none dark:bg-transparent shadow-none text-sm font-medium"
      >
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent align="end" side="bottom" position="popper">
        <SelectItem value="all">
          <div className="flex items-center gap-2">
            <ListIcon className="size-4 shrink-0" />
            <span>All</span>
          </div>
        </SelectItem>
        {statuses.map((status) => {
          const Icon = ConversationStatusConfig[status].icon;

          return (
            <SelectItem key={status} value={status}>
              <div className="flex items-center gap-2">
                <Icon className="size-4 shrink-0" />
                <span className="capitalize">{status}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
