"use client";

import { BlocksIcon } from "lucide-react";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";

export function PluginsView() {
  return (
    <PageContainer
      header={<PageHeader icon={BlocksIcon} title="Plugins" description="" />}
    >
      Plugins Page
    </PageContainer>
  );
}
