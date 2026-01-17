"use client";

import { useState } from "react";
import { LibraryBigIcon, PlusIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";
import { KnowledgeModal } from "./modal";
import { KnowledgeTable } from "./knowledge-table";
import { KnowledgeQuickActions } from "./knowledge-quick-actions";

export function KnowledgeBaseView() {
  const [activeTab, setActiveTab] = useState("website");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (tab: string) => {
    setActiveTab(tab);
    setOpenModal(true);
  };

  return (
    <PageContainer
      header={
        <PageHeader
          icon={LibraryBigIcon}
          title="Knowledge Base"
          description="Manage your website sources, documents, and uploads here."
          additional={
            <Button
              type="button"
              onClick={() => handleOpenModal("website")}
              className={cn(
                "hover:-translate-y-0.5 hover:shadow-sm shadow-xs motion-safe:duration-300 motion-safe:transition-all"
              )}
            >
              <PlusIcon /> Add New
            </Button>
          }
        />
      }
    >
      <KnowledgeModal
        open={openModal}
        onOpenChange={setOpenModal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onFileUploaded={() => setOpenModal(false)}
      />
      <KnowledgeQuickActions setOpen={handleOpenModal} />
      <Separator />
      <KnowledgeTable />
    </PageContainer>
  );
}
