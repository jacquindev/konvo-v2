"use client";

import Image from "next/image";
import {
  ArrowLeftRightIcon,
  ChevronDownIcon,
  PlugIcon,
  UnplugIcon,
} from "lucide-react";

import type { Feature } from "@/lib/types";
import { cn } from "@repo/ui/lib/utils";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/ui/collapsible";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";

interface PluginCardProps {
  serviceName: string;
  serviceImageClassName?: string;
  serviceImage: string;
  features: Feature[];
  onSubmit: () => void;
  disabled?: boolean;
  isConnected?: boolean;
}

export function PluginCard({
  serviceImage,
  serviceImageClassName,
  serviceName,
  features,
  onSubmit,
  disabled,
  isConnected,
}: PluginCardProps) {
  return (
    <Card className={cn(disabled && "opacity-60 pointer-events-none blur-sm")}>
      <CardHeader
        className={cn(
          "flex flex-col items-center justify-center w-full gap-4",
          isConnected && "hidden",
        )}
      >
        <div className="flex items-center gap-4">
          <div className="relative aspect-square size-10 rounded-md shrink-0 overflow-hidden shadow-xs">
            <Image
              src={serviceImage}
              alt={serviceName}
              fill
              className={cn(
                "object-cover object-center",
                serviceImageClassName,
              )}
            />
          </div>
          <ArrowLeftRightIcon className="size-6 text-muted-foreground ml-3" />
          <div className="relative aspect-square size-16 rounded-md shrink-0 overflow-hidden bg-transparent">
            <Image
              src="/logo.png"
              alt="logo"
              fill
              className={cn("object-cover object-center drop-shadow-xs")}
            />
          </div>
        </div>
        <CardTitle className={cn("text-lg")}>
          Connect your {serviceName} account
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(isConnected && "hidden")}>
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="px-4 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors flex gap-2 items-center">
            <span>Features</span>
            <ChevronDownIcon className="size-3 shrink-0" />
          </CollapsibleTrigger>
          <CollapsibleContent className="grid grid-cols-1 md:grid-cols-2 lg:gap-x-4 gap-x-2 gap-y-1">
            {features.map((feature) => (
              <Item key={feature.label}>
                <ItemMedia variant="icon">
                  <feature.icon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="leading-none">
                    {feature.label}
                  </ItemTitle>
                  <ItemDescription className="text-xs text-pretty">
                    {feature.description}
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter
        className={cn(
          "flex flex-col gap-4",
          isConnected && "flex-row justify-between",
        )}
      >
        {isConnected && (
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "relative size-10 rounded-md overflow-hidden aspect-square shrink-0",
                serviceImageClassName,
              )}
            >
              <Image
                src={serviceImage}
                alt={serviceName}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-y-1 text-muted-foreground">
              <p className="text-foreground font-medium text-sm capitalize">
                {serviceName} Connect
              </p>
              <p className="text-sm line-clamp-2 truncate text-balance">
                You&apos;re already connected to Vapi.
              </p>
            </div>
          </div>
        )}

        <Button
          type="button"
          variant={isConnected ? "destructive" : "default"}
          disabled={disabled}
          onClick={onSubmit}
          className={cn(
            "w-full shadow-sm hover:-translate-y-0.5 hover:shadow-md motion-safe:transition-all motion-safe:duration-300",
            isConnected && "w-auto",
          )}
        >
          {isConnected ? (
            <>
              <UnplugIcon /> Disconnect
            </>
          ) : (
            <>
              <PlugIcon /> Connect
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
