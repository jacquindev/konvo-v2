"use client";

import { SubscriptionDetailsButton as ClerkSubscriptionDetailsButton } from "@clerk/nextjs/experimental";

import { Button } from "@repo/ui/components/ui/button";
import { EyeIcon } from "lucide-react";

export function SubscriptionDetailsButton() {
  return (
    <ClerkSubscriptionDetailsButton
      for="organization"
      subscriptionDetailsProps={{
        appearance: {
          elements: {
            subscriptionDetailsCard:
              "bg-card rounded-xl border border-border shadow-sm p-2",
            subscriptionDetailsCardActions: "grid grid-cols-1 gap-3",
            subscriptionDetailsActionButton:
              "h-10 rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            subscriptionDetailsCancelButton:
              "h-10 rounded-md bg-destructive text-white hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
          },
        },
      }}
    >
      <Button
        type="button"
        className="shadow-xs hover:shadow-sm hover:-translate-y-0.5 motion-safe:transition-all motion-safe:duration-300"
      >
        <EyeIcon /> View Details
      </Button>
    </ClerkSubscriptionDetailsButton>
  );
}
