import React from "react";
import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { AuthGuard } from "@/components/auth/auth-guard";
import { OrgGuard } from "@/components/auth/org-guard";

type Props = { children: React.ReactNode };

const Layout = async ({ children }: Props) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AuthGuard>
      <OrgGuard>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <SidebarInset>
            <AppNavbar />
            <main className="flex-1">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </OrgGuard>
    </AuthGuard>
  );
};

export default Layout;
