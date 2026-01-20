"use client";

import { SettingsIcon } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import { Spinner } from "@repo/ui/components/ui/spinner";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";

export function OrgPageView() {
  return (
    <PageContainer
      header={
        <PageHeader 
          icon={SettingsIcon}
          title="Settings"
          description="View and manage your organization settings."
        />
      }
    >
      <OrganizationProfile 
        fallback={
          <div className="flex flex-col items-center justify-center">
            <Spinner className="text-primary shrink-0 size-6" />
          </div>
        }
        appearance={{
          elements: {
            rootBox: "w-full",
            cardBox: "w-full h-auto mx-auto max-w-7xl bg-muted p-4 pl-2",
            navbar: "pt-0",
            tabListContainer: "overflow-x-auto py-2",
          }
        }}
      />
    </PageContainer>
  )
}
