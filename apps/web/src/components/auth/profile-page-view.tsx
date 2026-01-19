"use client";

import { UserRoundCogIcon } from "lucide-react";
import { UserProfile } from "@clerk/nextjs";

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
        appearance={{
          elements: {
            rootBox: "w-full",
            cardBox: "w-full h-auto mx-auto max-w-7xl bg-muted p-4 pl-2",
            navbar: "pt-0",
          }
        }}
      />
    </PageContainer>
  )
}
