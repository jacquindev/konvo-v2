"use client";

import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

import { Spinner } from "@repo/ui/components/ui/spinner";

export function PricingTable() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <ClerkPricingTable
        for="organization"
        newSubscriptionRedirectUrl="/billing"
        fallback={<Spinner className="text-primary shrink-0 size-6" />}
        appearance={{
          elements: {
            pricingTable: "gap-6 lg:gap-8",
            pricingTableCardFee: "text-3xl",
            pricingTableCardTitle: "text-xl mb-2",
            pricingTableCardTitleContainer: "mb-2",
            pricingTableCardDescription: "text-sm font-normal",
            pricingTableCard:
              "bg-card rounded-xl shadow-sm border-[1.5px] border-border hover:border-primary motion-safe:transition-all motion-safe:duration-300",
            pricingTableCardFooterButton:
              "h-10 rounded-md hover:-translate-y-0.5 motion-safe:duration-300 motion-safe:transition-all shadow-xs hover:shadow-sm",
          },
        }}
      />
    </div>
  );
}
