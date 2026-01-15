"use client";

import { FileTextIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { Field, FieldGroup, FieldLabel } from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Button } from "@repo/ui/components/ui/button";

interface KnowledgeTextTabProps {
  onOpenChange?: (open: boolean) => void;
}

export function KnowledgeTextTab({ onOpenChange }: KnowledgeTextTabProps) {
  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <FieldGroup>
      <Alert className="gap-1 border-indigo-500/20 bg-indigo-500/10 text-sm text-pretty text-indigo-900 dark:text-indigo-200">
        <FileTextIcon className="size-5! shrink-0" />
        <AlertTitle>Raw Text</AlertTitle>
        <AlertDescription>
          Paste existing FAQs, policies, or internal notes directly.
        </AlertDescription>
      </Alert>

      <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input id="title" type="text" placeholder="e.g., Refund Policy" />
      </Field>

      <Field>
        <FieldLabel htmlFor="content">Content</FieldLabel>
        <Textarea
          id="content"
          placeholder="Paste text here..."
          className="min-h-[80px]"
        />
      </Field>

      <div className="flex items-center justify-between gap-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="button">Add Content</Button>
      </div>
    </FieldGroup>
  );
}
