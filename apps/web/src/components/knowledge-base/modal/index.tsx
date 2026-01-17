"use client";

import { ResponsiveDialog } from "@repo/ui/components/shared/responsive-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";

import { KnowledgeUploadTab } from "./knowledge-upload-tab";
import { KnowledgeWebsiteTab } from "./knowledge-website-tab";
import { KnowledgeTextTab } from "./knowledge-text-tab";

interface KnowledgeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onFileUploaded?: () => void;
}

export function KnowledgeModal({
  open,
  onOpenChange,
  activeTab,
  setActiveTab,
  onFileUploaded,
}: KnowledgeModalProps) {
  const tabs = [
    {
      value: "website",
      label: "Website",
      content: (
        <KnowledgeWebsiteTab
          onOpenChange={onOpenChange}
          onFileUploaded={onFileUploaded}
        />
      ),
    },
    {
      value: "text",
      label: "Q&A / Text",
      content: (
        <KnowledgeTextTab
          onOpenChange={onOpenChange}
          onFileUploaded={onFileUploaded}
        />
      ),
    },
    {
      value: "upload",
      label: "Upload",
      content: (
        <KnowledgeUploadTab
          onFileUploaded={onFileUploaded}
          onOpenChange={onOpenChange}
        />
      ),
    },
  ];

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Source"
      description="Upload documents to your knowledge base for AI-powered search and retrieval."
    >
      <Tabs
        defaultValue="website"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-4 w-full"
      >
        <div className="border-b border-border px-6">
          <TabsList className="h-auto gap-6 bg-transparent p-0 dark:bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-x-0 border-t-0 border-b-3 border-b-transparent px-0 py-3 text-xs tracking-wider text-muted-foreground uppercase ring-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none data-[state=active]:border-b-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none motion-safe:transition-all motion-safe:duration-300 dark:data-[state=active]:border-primary dark:data-[state=active]:bg-transparent"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="pt-6 px-4 space-y-6">
          {tabs.map((tab) => (
            <TabsContent
              value={tab.value}
              key={tab.value}
              className="animate-in space-y-6 duration-300 fade-in"
            >
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </ResponsiveDialog>
  );
}
