"use client";

import Image from "next/image";
import { CopyIcon, ZapIcon } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";

import { copyToClipboard } from "@/lib/utils";

import { Button } from "@repo/ui/components/ui/button";
import { Card, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Field, FieldLabel } from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Separator } from "@repo/ui/components/ui/separator";

import { PageContainer } from "../page-container";
import { PageHeader } from "../page-header";
import { useState } from "react";
import { IntegrationsModal } from "./integrations-modal";

const integrations = [
  { title: "HTML", icon: "/html5.svg" },
  { title: "React", icon: "/react.svg" },
  { title: "Next.js", icon: "/nextjs.svg" },
  { title: "Javascript", icon: "/javascript.svg" },
];

export function IntegrationsView() {
  const [openModal, setOpenModal] = useState(false);

  const { organization } = useOrganization();

  return (
    <>
      <IntegrationsModal
        open={openModal}
        setOpen={setOpenModal}
        organizationId={organization?.id || ""}
      />
      <PageContainer
        header={
          <PageHeader
            icon={ZapIcon}
            title="Integrations"
            description="Get started by choosing the frameworks of your choice."
          />
        }
      >
        <Field>
          <FieldLabel htmlFor="organizationId">
            Organization ID{" "}
            <span className="text-destructive font-normal">*</span>
          </FieldLabel>
          <Field orientation="horizontal">
            <Input
              readOnly
              id="organizationId"
              className="font-mono text-sm text-muted-foreground truncate"
              value={organization?.id || ""}
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(organization?.id || "")}
            >
              <CopyIcon />
            </Button>
          </Field>
        </Field>
        <Separator />
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label className="text-xl">Pick A Framework</Label>
            <p className="text-muted-foreground text-sm text-pretty">
              Start by selecting a framework of your choice. Then add the code
              to your website to enable chatbot for your website.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {integrations.map((framework) => (
              <Card
                key={framework.title}
                role="button"
                className="group/framework border-[1.5px] hover:scale-[1.02] hover:border-primary"
                onClick={() => setOpenModal(true)}
              >
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Image
                      src={framework.icon}
                      alt={framework.title}
                      width={40}
                      height={40}
                      className="object-cover object-center"
                    />
                  </div>
                  <CardTitle className="group-hover/framework:text-foreground text-muted-foreground transition-colors">
                    {framework.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  );
}
