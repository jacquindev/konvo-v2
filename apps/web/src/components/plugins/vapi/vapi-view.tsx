"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import {
  GlobeIcon,
  PhoneCallIcon,
  PhoneIcon,
  SettingsIcon,
  WorkflowIcon,
} from "lucide-react";

import { api } from "@repo/backend/_generated/api";

import { Button } from "@repo/ui/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";

import { PageContainer } from "../../page-container";
import { PageHeader } from "../../page-header";
import { PluginCard } from "../plugin-card";
import { VapiConnectModal } from "./vapi-connect-modal";
import { VapiDisconnectModal } from "./vapi-disconnect-modal";
import { VapiDataTable } from "./vapi-data-table";

export function VapiView() {
  const vapiPlugin = useQuery(api.private.plugins.getOne, { service: "vapi" });

  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openDisconnectModal, setOpenDisconnectModal] = useState(false);

  const togglePluginConnection = () => {
    if (vapiPlugin) {
      setOpenDisconnectModal(true);
    } else {
      setOpenConnectModal(true);
    }
  };

  return (
    <>
      <VapiConnectModal open={openConnectModal} setOpen={setOpenConnectModal} />
      <VapiDisconnectModal
        open={openDisconnectModal}
        setOpen={setOpenDisconnectModal}
      />
      <PageContainer
        header={
          <PageHeader
            icon="/vapi.jpg"
            iconClassName="dark:invert"
            title="Vapi Plugin"
            description={
              <>
                Connect to{" "}
                <Link href="https://dashboard.vapi.ai" target="_blank">
                  Vapi
                </Link>{" "}
                to enable AI voice calls and phone support.
              </>
            }
          />
        }
      >
        <PluginCard
          serviceImage="/vapi.jpg"
          serviceName="Vapi"
          serviceImageClassName="dark:invert"
          disabled={vapiPlugin === undefined}
          isConnected={!!vapiPlugin}
          onSubmit={togglePluginConnection}
          features={[
            {
              label: "Web Voice Calls",
              icon: GlobeIcon,
              description:
                "Enable real-time AI voice conversations inside your app.",
            },
            {
              label: "Dedicated Phone Numbers",
              icon: PhoneIcon,
              description:
                "Provision business phone numbers for inbound and outbound calls.",
            },
            {
              label: "Custom Workflow",
              icon: WorkflowIcon,
              description:
                "Design tailored voice flows and automate call handling logic.",
            },
            {
              label: "AI Outbound Calls",
              icon: PhoneCallIcon,
              description:
                "Automate customer outreach and follow-ups with AI-driven calls.",
            },
          ]}
        />

        {vapiPlugin && (
          <>
            <Item
              variant="outline"
              className="bg-card shadow-sm p-6 rounded-xl"
            >
              <ItemMedia variant="icon" className="size-10">
                <SettingsIcon className="size-6 shrink-0 text-primary" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Widget Configuration</ItemTitle>
                <ItemDescription>
                  Set up voice calls for your chat widget.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  type="button"
                  className="shadow-sm hover:-translate-y-0.5 hover:shadow-md motion-safe:transition-all motion-safe:duration-300"
                  asChild
                >
                  <Link href="/customization" prefetch>
                    <SettingsIcon /> Configure
                  </Link>
                </Button>
              </ItemActions>
            </Item>

            <VapiDataTable />
          </>
        )}
      </PageContainer>
    </>
  );
}
