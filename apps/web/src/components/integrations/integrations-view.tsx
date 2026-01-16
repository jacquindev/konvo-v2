"use client";

import { ZapIcon } from "lucide-react";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";

export function IntegrationsView() {
  return (
    <PageContainer
      header={<PageHeader icon={ZapIcon} title="Integrations" description="" />}
    >
      Integrations View
    </PageContainer>
  );
}
