import React from "react";

import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";

import { AuthGuard } from "@/components/auth/auth-guard";
import { OrgGuard } from "@/components/auth/org-guard";
import { ConversationsSidebar } from "@/components/conversations/conversations-sidebar";
import { JotaiProvider } from "@/providers/jotai-provider";
import { ConversationsNavbar } from "@/components/conversations/conversations-navbar";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <OrgGuard>
        <JotaiProvider>
          <SidebarProvider
            style={{ "--sidebar-width": "350px" } as React.CSSProperties}
          >
            <ConversationsSidebar />
            <SidebarInset>
              <main className="flex flex-1 flex-col">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </JotaiProvider>
      </OrgGuard>
    </AuthGuard>
  );
};

export default Layout;
