"use client";

import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { api } from "@repo/backend/_generated/api";

import type { WidgetSettings } from "@/lib/types";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Spinner } from "@repo/ui/components/ui/spinner";

import { VapiFormField } from "../plugins/vapi/vapi-form-field";

interface CustomizationFormProps {
  initialData?: WidgetSettings | null;
  hasVapiPlugin: boolean;
}

export const customizationFormSchema = z.object({
  greetMessage: z.string().min(1, "Greeting message is required."),
  defaultSuggestions: z.object({
    suggestion1: z.string().optional(),
    suggestion2: z.string().optional(),
    suggestion3: z.string().optional(),
  }),
  vapiSettings: z.object({
    assistantId: z.string().optional(),
    phoneNumber: z.string().optional(),
  }),
});

export function CustomizationForm({
  initialData,
  hasVapiPlugin,
}: CustomizationFormProps) {
  const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert);

  const form = useForm<z.infer<typeof customizationFormSchema>>({
    resolver: zodResolver(customizationFormSchema),
    defaultValues: {
      greetMessage:
        initialData?.greetMessage || "Hello, how can I help you today?",
      defaultSuggestions: {
        suggestion1: initialData?.defaultSuggestions?.suggestion1 || "",
        suggestion2: initialData?.defaultSuggestions?.suggestion2 || "",
        suggestion3: initialData?.defaultSuggestions?.suggestion3 || "",
      },
      vapiSettings: {
        assistantId: initialData?.vapiSettings?.assistantId || "",
        phoneNumber: initialData?.vapiSettings?.phoneNumber || "",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof customizationFormSchema>) => {
    try {
      const vapiSettings: WidgetSettings["vapiSettings"] = {
        assistantId:
          values.vapiSettings?.assistantId === "none"
            ? ""
            : values.vapiSettings.assistantId,
        phoneNumber:
          values.vapiSettings?.phoneNumber === "none"
            ? ""
            : values.vapiSettings.phoneNumber,
      };

      await upsertWidgetSettings({
        greetMessage: values.greetMessage,
        defaultSuggestions: values.defaultSuggestions,
        vapiSettings,
      });

      toast.success("Widget settings updated.");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : "Failed to configure widget settings. Please try again later.";
      toast.error(errorMessage);
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-8"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-lg">General Chat Settings</CardTitle>
          <CardDescription>
            Configure basic chat behavior and messages.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <FieldGroup>
            <Controller
              control={form.control}
              name="greetMessage"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Greeting Message</FieldLabel>
                  <FieldDescription>
                    The first message customers see when they open the chat.
                  </FieldDescription>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Welcome message shown when chat open"
                    className="min-h-[80px]"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field>
              <FieldLabel>Default Suggestions</FieldLabel>
              <FieldDescription>
                Quick reply suggestions shown to customers to help guide the
                conversation
              </FieldDescription>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Controller
                  control={form.control}
                  name="defaultSuggestions.suggestion1"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Suggestion 1</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g., How do I get started?"
                        className="truncate"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="defaultSuggestions.suggestion2"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Suggestion 2</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g., What are your pricing plan?"
                        className="truncate"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="defaultSuggestions.suggestion3"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Suggestion 3</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g., I need help with my account."
                        className="truncate"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {hasVapiPlugin && (
        <VapiFormField form={form} />
      )}

      <div className="flex justify-end w-full">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full lg:w-auto motion-safe:duration-300 motion-safe:transition-all hover:-translate-y-0.5 shadow-xs hover:shadow-sm"
        >
          {form.formState.isSubmitting ? (
            <>
              <Spinner /> Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
