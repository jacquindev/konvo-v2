"use client";

import { DollarSignIcon } from "lucide-react";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";
import { PricingTable } from "./pricing-table";
import { SubscriptionDetailsButton } from "./subscription-details-button";

export function SubscriptionsView() {
  return (
    <PageContainer
      header={
        <PageHeader
          icon={DollarSignIcon}
          title="Plans & Billing"
          description="Scale your AI chatbot with flexible plans and transparent usage-based pricing."
          additional={<SubscriptionDetailsButton />}
        />
      }
    >
      <PricingTable />
    </PageContainer>
  );
}
