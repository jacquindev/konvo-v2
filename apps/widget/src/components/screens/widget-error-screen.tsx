"use client";

import { useAtomValue } from "jotai";
import { AlertTriangleIcon } from "lucide-react";

import { errorMessageAtom } from "@/lib/atoms";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";

import { WidgetHeader } from "../widget-header";

export function WidgetErrorScreen() {
  const errorMessage = useAtomValue(errorMessageAtom);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">Tell us something about you.</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <Empty className="bg-destructive/10 border-[1.5px] border-dashed border-destructive h-full w-full">
          <EmptyHeader>
            <EmptyMedia>
              <AlertTriangleIcon className="text-destructive size-6 shrink-0" />
            </EmptyMedia>
            <EmptyTitle className="text-destructive">
              Oops! Something went wrong
            </EmptyTitle>
            <EmptyDescription className="max-w-sm mx-auto text-pretty">
              {errorMessage || "Invalid configuration."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </>
  );
}
