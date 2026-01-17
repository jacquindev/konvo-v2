"use client";

import { CopyIcon } from "lucide-react";

import { env } from "@/lib/env-client";

import { ResponsiveDialog } from "@repo/ui/components/shared/responsive-dialog";
import { Button } from "@repo/ui/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";
import { copyToClipboard } from "@/lib/utils";

interface IntegrationsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  organizationId: string;
}

const INTEGRATION_SCRIPT = `<script src="${env.NEXT_PUBLIC_WIDGET_URL}" data-organization-id="{{ORGANIZATION_ID}}"></script>`;

function createScript(organizationId: string) {
  return INTEGRATION_SCRIPT.replace(/{{ORGANIZATION_ID}}/g, organizationId);
}

export function IntegrationsModal({
  open,
  setOpen,
  organizationId,
}: IntegrationsModalProps) {
  const snippet = createScript(organizationId);

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="Integration with your website"
      description="Follow these steps to add the chatbot to your website."
    >
      <FieldGroup className="mt-4">
        <Field>
          <FieldLabel>1. Copy the following code</FieldLabel>
          <div className="leading-7 bg-accent/40 border border-border shadow-sm p-4 overflow-auto text-sm font-mono relative rounded-lg whitespace-nowrap">
            <Button
              type="button"
              variant="outline"
              size="icon-xs"
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              onClick={() => copyToClipboard(snippet)}
            >
              <CopyIcon />
            </Button>
            <div>
              &lt;
              <span className="text-pink-600 dark:text-pink-400">script</span>
            </div>
            <div className="pl-4">
              <span className="text-indigo-600 dark:text-indigo-400">src</span>=
              <span className="text-emerald-600 dark:text-emerald-400">
                &quot;{env.NEXT_PUBLIC_WIDGET_URL}&quot;
              </span>
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                data-organization-id
              </span>
              =
              <span className="text-emerald-600 dark:text-emerald-400">
                &quot;{organizationId}&quot;
              </span>
            </div>
            <div>
              &lt;/
              <span className="text-pink-600 dark:text-pink-400">script</span>
              &gt;
            </div>
          </div>
        </Field>

        <Field>
          <FieldLabel>2. Add the code in your page</FieldLabel>
          <FieldDescription className="leading-tight text-xs text-pretty">
            Past the code above in your page. You can add it the HTML head
            section.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </ResponsiveDialog>
  );
}
