"use client";

import { HomeIcon } from "lucide-react";
import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";

export function DashboardView() {
  return (
    <PageContainer
      header={<PageHeader icon={HomeIcon} title="Dashboard" description="" />}
    >
      Dashboard page view
    </PageContainer>
  );
}
