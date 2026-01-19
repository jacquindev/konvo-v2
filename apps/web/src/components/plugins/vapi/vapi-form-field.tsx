"use client";

import Link from "next/link";
import { BotIcon, PhoneIcon } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  useVapiAssistants,
  useVapiPhoneNumbers,
} from "@/hooks/plugins/vapi/use-vapi-data";

import { customizationFormSchema } from "@/components/customization/customization-form";

import { Badge } from "@repo/ui/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

interface VapiFormFieldProps{
  form: UseFormReturn<z.infer<typeof customizationFormSchema>>
}

export function VapiFormField({ form }: VapiFormFieldProps) {
  const { data: assistants, isLoading: assistantsLoading } =
    useVapiAssistants();
  const { data: phoneNumbers, isLoading: phoneNumbersLoading } =
    useVapiPhoneNumbers();

    return (
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
    )
}
