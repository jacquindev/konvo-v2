"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { GlobeIcon, ImportIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { api } from "@repo/backend/_generated/api";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { Button } from "@repo/ui/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import { Spinner } from "@repo/ui/components/ui/spinner";

interface KnowledgeWebsiteTabProps {
  onOpenChange?: (open: boolean) => void;
  onFileUploaded?: () => void;
}

const formSchema = z.object({
  category: z.string().trim().optional(),
  websiteUrl: z.url(),
});

export function KnowledgeWebsiteTab({
  onOpenChange,
  onFileUploaded,
}: KnowledgeWebsiteTabProps) {
  const [isAdding, setIsAdding] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { category: "", websiteUrl: "" },
  });

  const addUrl = useAction(api.private.files.addUrl);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsAdding(true);
    try {
      await addUrl({ category: values.category, url: values.websiteUrl });
      onFileUploaded?.();
      toast.success("Content added.");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Unable to crawl your website. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setIsAdding(false);
    }
  };

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

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="websiteUrl"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Website URL <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="https://example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="category"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Category{" "}
                  <span className="text-xs text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="e.g., Refund Policy, Documentation"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isAdding || form.formState.isSubmitting}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isAdding || form.formState.isSubmitting}
            >
              {isAdding || form.formState.isSubmitting ? (
                <>
                  <Spinner /> Importing...
                </>
              ) : (
                <>
                  <ImportIcon /> Import Source
                </>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </FieldGroup>
  );
}
