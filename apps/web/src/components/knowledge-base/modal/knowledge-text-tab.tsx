"use client";

import { FileTextIcon, PlusIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Button } from "@repo/ui/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { api } from "@repo/backend/_generated/api";
import { useState } from "react";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import { Spinner } from "@repo/ui/components/ui/spinner";

interface KnowledgeTextTabProps {
  onOpenChange?: (open: boolean) => void;
  onFileUploaded?: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(5, "Content is required."),
  category: z.string().optional(),
});

export function KnowledgeTextTab({
  onOpenChange,
  onFileUploaded,
}: KnowledgeTextTabProps) {
  const [isAdding, setIsAdding] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "", category: "" },
  });

  const addManualText = useAction(api.private.files.addManualText);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsAdding(true);

    try {
      await addManualText({
        category: values.category,
        title: values.title,
        content: values.content,
      });
      onFileUploaded?.();
      toast.success("Content added to knowledge base.");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Failed to add content to knowledge base. Please try again later.";
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
        <FileTextIcon className="size-5! shrink-0" />
        <AlertTitle>Raw Text</AlertTitle>
        <AlertDescription>
          Paste existing FAQs, policies, or internal notes directly.
        </AlertDescription>
      </Alert>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-6">
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Title{" "}
                    <span className="text-destructive font-normal">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="e.g., refund-policy"
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
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="e.g., Refund Policy"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Content{" "}
                  <span className="text-destructive font-normal">*</span>
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Paste text here..."
                  className="min-h-[80px]"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isAdding || form.formState.isSubmitting}
            >
              {isAdding || form.formState.isSubmitting ? (
                <>
                  <Spinner /> Adding content...
                </>
              ) : (
                <>
                  <PlusIcon /> Add Content
                </>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </FieldGroup>
  );
}
