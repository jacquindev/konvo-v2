"use client";

import { GlobeIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { Button } from "@repo/ui/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";

interface KnowledgeWebsiteTabProps {
  onOpenChange?: (open: boolean) => void;
}

export function KnowledgeWebsiteTab({
  onOpenChange,
}: KnowledgeWebsiteTabProps) {
  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <FieldGroup>
      <Alert className="gap-1 border-indigo-500/20 bg-indigo-500/10 text-sm text-pretty text-indigo-900 dark:text-indigo-200">
        <GlobeIcon className="size-5! shrink-0" />
        <AlertTitle>Crawl Website</AlertTitle>
        <AlertDescription>
          Enter a website URL to crawl significantly or add a specific page link
          to provide focused context.
        </AlertDescription>
      </Alert>

      <Field>
        <FieldLabel htmlFor="websiteUrl">
          Website URL <span className="text-destructive">*</span>
        </FieldLabel>
        <Input id="websiteUrl" type="text" placeholder="https://example.com" />
      </Field>

      <div className="flex items-center justify-between gap-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button">Import Source</Button>
      </div>
    </FieldGroup>
  );
}
