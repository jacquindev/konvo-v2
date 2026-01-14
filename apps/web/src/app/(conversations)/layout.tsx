import React from "react";

import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";

import { AuthGuard } from "@/components/auth/auth-guard";
import { OrgGuard } from "@/components/auth/org-guard";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <OrgGuard>
        <SidebarProvider>
          <SidebarInset>
            <main className="flex flex-1 flex-col">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </OrgGuard>
    </AuthGuard>
  );
};

export default Layout;
