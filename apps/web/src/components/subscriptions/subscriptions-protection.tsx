"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Protect } from "@clerk/nextjs";
import {
  BookOpenIcon,
  BotIcon,
  ExternalLinkIcon,
  GemIcon,
  MicIcon,
  PaletteIcon,
  PhoneIcon,
  Users2Icon,
} from "lucide-react";

import type { Feature } from "@/lib/types";

import {
  CardContainer,
  CardBody,
  CardItem,
} from "@repo/ui/components/shared/3d-card";
import { Button } from "@repo/ui/components/ui/button";
import { CardDescription, CardTitle } from "@repo/ui/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";

const features: Feature[] = [
  {
    icon: BotIcon,
    label: "AI Customer Support",
    description: "Intelligent automated responses 24/7.",
  },
  {
    icon: MicIcon,
    label: "AI Voice Agent",
    description: "Natural voice conversations with customers.",
  },
  {
    icon: PhoneIcon,
    label: "Phone System",
    description: "Inbound & Outbound calling capabilities.",
  },
  {
    icon: BookOpenIcon,
    label: "Knowledge Base",
    description: "Train your AI assistant based on documentation.",
  },
  {
    icon: Users2Icon,
    label: "Team Access",
    description: "Up to 5 operators per organization.",
  },
  {
    icon: PaletteIcon,
    label: "Widget Customization",
    description: "Customize your chat widget appearance.",
  },
];

function PremiumFeatureOverlay({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none select-none blur-[2px] max-h-[600px] overflow-hidden">
        {children}
      </div>
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
      <div className="absolute inset-0 z-40 flex items-center justify-center p-6">
        <CardContainer className="inter-var">
          <CardBody className="h-auto w-full max-w-lg border-primary border-[1.5px] rounded-xl bg-card flex flex-col gap-6 items-center justify-center p-6 shadow-sm">
            <CardItem
              translateZ={30}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="w-full flex items-center justify-center mb-2">
                <div className="size-12 inline-flex items-center justify-center rounded-full bg-muted border border-primary/60">
                  <GemIcon className="size-6 shrink-0 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Premium Feature</CardTitle>
              <CardDescription>
                This feature requires a Premium subscription.
              </CardDescription>
            </CardItem>
            <CardItem translateZ={20} className="w-full">
              <div className="max-h-[220px] overflow-y-auto">
                {features.map((feature) => (
                  <Item key={feature.label}>
                    <ItemMedia variant="icon" className="rounded-md size-9">
                      <feature.icon className="size-5 shrink-0 text-muted-foreground" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="leading-none">
                        {feature.label}
                      </ItemTitle>
                      <ItemDescription className="text-xs leading-tight font-light tracking-tight">
                        {feature.description}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            </CardItem>
            <CardItem translateZ={10} className="w-full">
              <Button
                asChild
                type="button"
                size="lg"
                className="w-full hover:-translate-y-0.5 shadow-xs hover:shadow-sm motion-safe:duration-300 motion-safe:transition-all"
              >
                <Link href="/billing" prefetch>
                  View Plans <ExternalLinkIcon />
                </Link>
              </Button>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
}

export function SubscriptionsProtection({ children }: { children: ReactNode }) {
  return (
    <Protect
      condition={(has) => has({ plan: "premium" })}
      fallback={<PremiumFeatureOverlay>{children}</PremiumFeatureOverlay>}
    >
      {children}
    </Protect>
  );
}
