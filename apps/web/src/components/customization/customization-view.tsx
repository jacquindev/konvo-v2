"use client";

import { useQuery } from "convex/react";
import { PaletteIcon } from "lucide-react";

import { api } from "@repo/backend/_generated/api";

import { Spinner } from "@repo/ui/components/ui/spinner";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";
import { CustomizationForm } from "./customization-form";

export function CustomizationView() {
  const widgetSettings = useQuery(api.private.widgetSettings.getOne);
  const vapiPlugin = useQuery(api.private.plugins.getOne, { service: "vapi" });

  const isLoading = widgetSettings === undefined || vapiPlugin === undefined;

  return (
    <PageContainer
      header={
        <PageHeader
          icon={PaletteIcon}
          title="Widget Customization"
          description="Customize how your chat widget looks and behaves for your customers."
        />
      }
    >
      {isLoading ? (
        <div className="w-full min-h-[calc(100dvh-300px)] flex flex-col items-center justify-center">
          <div className="w-full flex flex-col gap-4 items-center justify-center p-8">
            <Spinner className="size-8 text-primary shrink-0" />
            <p className="text-muted-foreground animate-pulse">
              Loading settings...
            </p>
          </div>
        </div>
      ) : (
        <CustomizationForm
          initialData={widgetSettings}
          hasVapiPlugin={!!vapiPlugin}
        />
      )}
    </PageContainer>
  );
}
