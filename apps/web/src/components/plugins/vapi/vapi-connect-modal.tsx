"use client";

import Link from "next/link";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { PlugIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { api } from "@repo/backend/_generated/api";

import { ResponsiveDialog } from "@repo/ui/components/shared/responsive-dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Spinner } from "@repo/ui/components/ui/spinner";

interface VapiConnectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  privateApiKey: z.string().min(1, "Vapi private API key is required."),
  publicApiKey: z.string().min(1, "Vapi public API key is required."),
});

export function VapiConnectModal({ open, setOpen }: VapiConnectModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { privateApiKey: "", publicApiKey: "" },
  });

  const upsertSecret = useMutation(api.private.secrets.upsert);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await upsertSecret({
        service: "vapi",
        value: { ...values },
      });
      setOpen(false);
      toast.success("Connected to Vapi!");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? error.message
          : "Failed to add Vapi API keys. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="Connect to Vapi"
      description={
        <>
          Retrieve your{" "}
          <Link href="https://dashboard.vapi.ai/org/api-keys" target="_blank">
            Vapi API keys
          </Link>{" "}
          and connect securely. <br /> Your keys are encrypted and safely stored
          in{" "}
          <Link
            href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
            target="_blank"
          >
            AWS Secrets Manager
          </Link>
          .
        </>
      }
    >
      <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="privateApiKey"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Private API Key</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Your private API key"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="publicApiKey"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Public API Key</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Your public API key"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Spinner /> Connecting...
              </>
            ) : (
              <>
                <PlugIcon /> Connect
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
    </ResponsiveDialog>
  );
}
