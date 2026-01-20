"use client";

import { UserRoundCogIcon } from "lucide-react";
import { UserProfile } from "@clerk/nextjs";

import { Spinner } from "@repo/ui/components/ui/spinner";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";

export function ProfilePageView() {
  return (
    <PageContainer
      header={
        <PageHeader 
          icon={UserRoundCogIcon}
          title="Profile"
          description="View and manage your personal account."
        />
      }
    >
      <UserProfile 
        fallback={
          <div className="flex flex-col items-center justify-center">
            <Spinner className="text-primary shrink-0 size-6" />
          </div>
        }
        appearance={{
          elements: {
            rootBox: "w-full flex-1 container mx-auto",
            cardBox: "max-w-7xl w-full h-auto mx-auto bg-muted p-4 pl-2",
            navbar: "pt-0"
          }
        }}
      />
    </PageContainer>
  )
}
