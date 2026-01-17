"use client";

import Link from "next/link";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { api } from "@repo/backend/_generated/api";

import type { WidgetSettings } from "@/lib/types";
import {
  useVapiAssistants,
  useVapiPhoneNumbers,
} from "@/hooks/plugins/vapi/use-vapi-data";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { BotIcon, PhoneIcon } from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";

interface CustomizationFormProps {
  initialData?: WidgetSettings | null;
  hasVapiPlugin: boolean;
}

const formSchema = z.object({
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
  const { data: assistants, isLoading: assistantsLoading } =
    useVapiAssistants();
  const { data: phoneNumbers, isLoading: phoneNumbersLoading } =
    useVapiPhoneNumbers();

  const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
        <Card className="relative">
          <Badge
            className="absolute -top-3 right-6 border-primary text-primary text-sm"
            variant="secondary"
          >
            Vapi
          </Badge>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Voice Assistant Settings</CardTitle>
            <CardDescription>
              Configure voice calling features powered by{" "}
              <Link href="https://dashboard.vapi.ai">Vapi</Link>.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4">
              <Controller
                control={form.control}
                name="vapiSettings.assistantId"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Voice Assistant
                    </FieldLabel>
                    <FieldDescription>
                      The Vapi assistant to use for voice calls.
                    </FieldDescription>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={
                        assistantsLoading || form.formState.isSubmitting
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            assistantsLoading
                              ? "Loading assistants..."
                              : "Select an assistant"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent position="popper" side="bottom">
                        <SelectItem value="none">None</SelectItem>
                        {assistants.map((assistant) => (
                          <SelectItem key={assistant.id} value={assistant.id}>
                            <BotIcon />
                            {assistant.name || "Unknown"} -{" "}
                            <span className="text-xs font-mono">
                              {assistant.model?.model || "Unknown"}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="vapiSettings.phoneNumber"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Display Phone Number
                    </FieldLabel>
                    <FieldDescription>
                      The phone number to display in the widget.
                    </FieldDescription>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={
                        phoneNumbersLoading || form.formState.isSubmitting
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            phoneNumbersLoading
                              ? "Loading phone numbers..."
                              : "Select a phone number"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent position="popper" side="bottom">
                        <SelectItem value="none">None</SelectItem>
                        {phoneNumbers.map((phoneNumber) => (
                          <SelectItem
                            key={phoneNumber.id}
                            value={phoneNumber.number || phoneNumber.id}
                          >
                            <PhoneIcon />
                            {phoneNumber.number ? (
                              <span className="font-mono">
                                {phoneNumber.number}
                              </span>
                            ) : (
                              "Unknown"
                            )}{" "}
                            - {phoneNumber.name || "Unknown"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>
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
