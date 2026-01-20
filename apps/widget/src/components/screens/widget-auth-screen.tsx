"use client";

import { useMutation } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { api } from "@repo/backend/_generated/api";
import type { Doc } from "@repo/backend/_generated/dataModel";

import {
  contactSessionIdAtomFamily,
  organizationIdAtom,
  screenAtom,
} from "@/lib/atoms";

import { Button } from "@repo/ui/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Spinner } from "@repo/ui/components/ui/spinner";

import { WidgetHeader } from "../widget-header";

const formSchema = z.object({
  name: z.string().min(1, "Please provide your name."),
  email: z.email("Invalid email address."),
});

export function WidgetAuthScreen() {
  const organizationId = useAtomValue(organizationIdAtom);

  const setScreen = useSetAtom(screenAtom);
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  const createContactSession = useMutation(api.public.contactSessions.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!organizationId) return;

    const metadata: Doc<"contactSessions">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(", "),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      cookieEnabled: navigator.cookieEnabled,
      referrer: document.referrer || "direct",
      currentUrl: window.location.href,
    };

    const contactSessionId = await createContactSession({
      ...values,
      organizationId,
      metadata,
    });

    setContactSessionId(contactSessionId);
    setScreen("selection");
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">Tell us something about you.</p>
        </div>
      </WidgetHeader>
      <form
        className="p-6 flex flex-1 flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg" htmlFor={field.name}>
                  How can we call you?
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  autoComplete="off"
                  placeholder="John Doe"
                  className="h-10"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  What&apos;s your email address?
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  autoComplete="off"
                  placeholder="johndoe@example.com"
                  className="h-10"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            size="lg"
            className="text-base hover:shadow-md hover:-translate-y-0.5 motion-safe:transition-all motion-safe:duration-300"
          >
            {form.formState.isSubmitting ? (
              <>
                <Spinner className="size-4" /> Loading...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </FieldGroup>
      </form>
    </>
  );
}
