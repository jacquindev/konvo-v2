"use client";

import { useEffect, useState } from "react";
import { useAction, useMutation } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";

import { api } from "@repo/backend/_generated/api";

import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/lib/atoms";
import type { InitStep } from "@/lib/types";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";
import { Spinner } from "@repo/ui/components/ui/spinner";

import { WidgetHeader } from "../widget-header";

interface WidgetLoadingScreenProps {
  organizationId: string | null;
}

export function WidgetLoadingScreen({
  organizationId,
}: WidgetLoadingScreenProps) {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setScreen = useSetAtom(screenAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);

  // Step 1: Validate Organization
  const validateOrganization = useAction(api.public.organizations.validate);
  useEffect(() => {
    if (step !== "org") return;

    setLoadingMessage("Finding organization ID...");

    if (!organizationId) {
      setErrorMessage("Organization ID is required.");
      setScreen("error");
      return;
    }

    setLoadingMessage("Verifying organization...");
    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result?.reason || "Invalid configuration.");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization.");
        setScreen("error");
      });
  }, [
    organizationId,
    setErrorMessage,
    setLoadingMessage,
    setOrganizationId,
    setScreen,
    step,
    validateOrganization,
  ]);

  // Step 2: Validate session (if exists)
  const validateContactSession = useMutation(
    api.public.contactSessions.validate
  );
  useEffect(() => {
    if (step !== "session") return;

    setLoadingMessage("Finding contact session ID...");

    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }

    setLoadingMessage("Validating session...");

    validateContactSession({ contactSessionId })
      .then((result) => {
        setSessionValid(result.valid);
        setStep("done");
      })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      });
  }, [contactSessionId, setLoadingMessage, step, validateContactSession]);

  useEffect(() => {
    if (step !== "done") return;

    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [contactSessionId, sessionValid, setScreen, step]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">How can I help you today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <Empty className="bg-muted border-[1.5px] border-dashed border-border h-full w-full">
          <EmptyHeader>
            <EmptyMedia>
              <Spinner className="text-primary size-6 shrink-0" />
            </EmptyMedia>
            <EmptyTitle className="text-primary animate-pulse">
              Loading...
            </EmptyTitle>
            <EmptyDescription className="max-w-sm mx-auto text-pretty">
              {loadingMessage || "Be patient. This only take a moment."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </>
  );
}
