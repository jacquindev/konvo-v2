"use client";

import { useState } from "react";
import { ArrowLeftIcon, CheckIcon, CopyIcon, PhoneIcon } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";

import { screenAtom, widgetSettingsAtom } from "@/lib/atoms";

import { cn } from "@repo/ui/lib/utils";

import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";

import { WidgetFooter } from "../widget-footer";
import { WidgetHeader } from "../widget-header";
import Link from "next/link";

export function WidgetContactScreen() {
  const [copied, setCopied] = useState(false);

  const setScreen = useSetAtom(screenAtom);

  const widgetSettings = useAtomValue(widgetSettingsAtom);

  const phoneNumber = widgetSettings?.vapiSettings?.phoneNumber;

  const handleCopy = async () => {
    if (!phoneNumber) return;

    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="transparent"
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon />
          </Button>
          <Label>Contact Us</Label>
        </div>
      </WidgetHeader>
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center rounded-full bg-muted p-3 border border-border">
          <PhoneIcon className="size-6 text-muted-foreground shrink-0" />
        </div>
        <p className="text-muted-foreground">Available 24/7</p>
        <p className="font-bold text-2xl">{phoneNumber}</p>
      </div>
      <div className="border-t bg-muted/50 p-4">
        <div className="flex flex-col gap-4 items-center">
          <Button
            size="lg"
            variant="outline"
            onClick={handleCopy}
            className="w-full"
          >
            {copied ? (
              <>
                <CheckIcon /> Copied!
              </>
            ) : (
              <>
                <CopyIcon /> Copy Number
              </>
            )}
          </Button>
          <Button asChild size="lg" className="w-full">
            <Link href={`tel:${phoneNumber}`}>
              <PhoneIcon /> Call Now
            </Link>
          </Button>
        </div>
      </div>
      <WidgetFooter />
    </>
  );
}
