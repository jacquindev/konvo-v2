"use client";

import { useState } from "react";
import { BotIcon, CheckCircleIcon, PhoneIcon, XCircleIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import {
  useVapiPhoneNumbers,
  useVapiAssistants,
} from "@/hooks/plugins/vapi/use-vapi-data";

import { Badge } from "@repo/ui/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Spinner } from "@repo/ui/components/ui/spinner";

function VapiPhoneNumbersTab() {
  const { data, isLoading } = useVapiPhoneNumbers();

  return (
    <div className="mt-6 bg-card rounded-lg shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 dark:bg-muted">
            {["Phone Number", "Name", "Status"].map((head) => (
              <TableHead
                key={head}
                className={cn(
                  "px-6 py-4 font-medium",
                  head === "Status" && "text-right"
                )}
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-4 text-center text-muted-foreground animate-pulse"
                  >
                    Loading phone numbers...
                  </TableCell>
                </TableRow>
              );
            }

            if (data.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-4 text-center text-muted-foreground"
                  >
                    No phone numbers configured.
                  </TableCell>
                </TableRow>
              );
            }

            return data.map((item) => {
              const isActive = item.status === "active";
              const isActivating = item.status === "activating";

              return (
                <TableRow key={item.id}>
                  <TableCell className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="size-4 text-muted-foreground" />
                      <span className="font-mono">
                        {item.number || "Not configured"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {item.name || "Unknown"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Badge
                      className={cn(
                        "capitalize py-1.5 px-2 bg-linear-to-tl dark:bg-linear-to-br",
                        isActive
                          ? "from-emerald-400 to-emerald-700 text-white"
                          : isActivating
                            ? "from-sky-400 to-sky-700 text-white opacity-80"
                            : "from-red-400 to-red-700 text-white opacity-80"
                      )}
                    >
                      {isActive ? (
                        <CheckCircleIcon className="size-4 stroke-3 shrink-0" />
                      ) : isActivating ? (
                        <Spinner className="size-4 shrink-0" />
                      ) : (
                        <XCircleIcon className="size-4 stroke-3 shrink-0" />
                      )}
                      {item.status || "Unknown"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            });
          })()}
        </TableBody>
      </Table>
    </div>
  );
}

function VapiAssistantsTab() {
  const { data, isLoading } = useVapiAssistants();

  return (
    <div className="mt-6 bg-card rounded-lg shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 dark:bg-muted">
            {["Assistant", "Model", "First Message"].map((head) => (
              <TableHead key={head} className="px-6 py-4 font-medium">
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-4 text-center text-muted-foreground animate-pulse"
                  >
                    Loading assistants...
                  </TableCell>
                </TableRow>
              );
            }

            if (data.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-4 text-center text-muted-foreground"
                  >
                    No assistants configured.
                  </TableCell>
                </TableRow>
              );
            }

            return data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-6 py-4 font-medium">
                  <div className="flex items-center gap-3">
                    <BotIcon className="size-4 text-muted-foreground" />
                    <span>{item.name || "Unknown"}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-sm font-mono">
                    {item.model?.model || "Unknown"}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="min-w-0 whitespace-pre-wrap truncate line-clamp-1 text-muted-foreground text-sm">
                    {item.firstMessage || "No greeting configured"}
                  </div>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
}

export function VapiDataTable() {
  const [activeTab, setActiveTab] = useState("phone-numbers");

  const tabs = [
    {
      value: "phone-numbers",
      label: "Phone Numbers",
      icon: PhoneIcon,
      iconClassName: "size-4",
      content: <VapiPhoneNumbersTab />,
    },
    {
      value: "assistants",
      label: "Assistants",
      icon: BotIcon,
      iconClassName: "size-5.5",
      content: <VapiAssistantsTab />,
    },
  ];

  return (
    <div>
      <Tabs
        defaultValue="phone-numbers"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-4 w-full motion-safe:transition-all motion-safe:duration-300"
      >
        <TabsList className="h-auto gap-0 bg-transparent p-0 dark:bg-transparent grid grid-cols-2 w-full border-b border-border">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="w-full flex items-center gap-3 shrink-0 rounded-none border-x-0 border-t-0 border-b-3 border-b-transparent px-0 py-3 tracking-wider text-muted-foreground uppercase ring-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none data-[state=active]:border-b-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none motion-safe:transition-all motion-safe:duration-300 dark:data-[state=active]:border-primary dark:data-[state=active]:bg-transparent"
            >
              <tab.icon className={cn(tab.iconClassName, "shrink-0")} />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            value={tab.value}
            key={tab.value}
            className="animate-in space-y-6 duration-300 fade-in"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
