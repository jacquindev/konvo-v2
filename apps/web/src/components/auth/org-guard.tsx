"use client";

import type { ReactNode } from "react";
import { OrganizationList, useOrganization } from "@clerk/nextjs";

import { AuthLayout } from "./auth-layout";

export function OrgGuard({ children }: { children: ReactNode }) {
  const { organization } = useOrganization();

  if (!organization) {
    return (
      <AuthLayout>
        <OrganizationList
          hidePersonal
          skipInvitationScreen
          afterCreateOrganizationUrl="/dashboard"
          afterSelectOrganizationUrl="/dashboard"
        />
      </AuthLayout>
    );
  }

  return <>{children}</>;
}
