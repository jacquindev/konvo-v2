"use client";

import { useMemo, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePaginatedQuery } from "convex/react";
import { 
  ArrowDownToLineIcon, 
  CheckCircleIcon, 
  CircleIcon, 
  PlusIcon 
} from "lucide-react";
import { useOrganization } from "@clerk/nextjs";

import { api } from "@repo/backend/_generated/api";
import { cn } from "@repo/ui/lib/utils";

import { useIntegrationsPageState } from "@/hooks/integrations/use-integrations-page-state";

import { Button } from "@repo/ui/components/ui/button";
import { 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";

export function DashboardOnboarding() {
  const knowledge = usePaginatedQuery(api.private.files.list, {}, { initialNumItems: 1 });
  const conversations = usePaginatedQuery(api.private.conversations.getMany, {}, { initialNumItems: 1 });

  const { organization } = useOrganization();
  const { hasOpenedIntegrations } = useIntegrationsPageState(organization?.id);

  const onboardingSteps = useMemo(() => {
    const steps = [
      {
        id: "chatbot",
        label: "Create chatbot",
        done: true,
      },
      {
        id: "knowledge",
        label: "Add knowledge",
        href: "/knowledge-base",
        done: (knowledge.results?.length ?? 0) > 0,
        actionLabel: <PlusIcon />,
        actionClassName: "size-7"
      },
      {
        id: "embed",
        label: "Install embed",
        href: "/integrations",
        done: hasOpenedIntegrations(),
        actionLabel: <ArrowDownToLineIcon />,
        actionClassName: "size-7"
      },
      {
        id: "conversations",
        label: "Receive first conversations",
        done: (conversations.results?.length ?? 0) > 0
      }
    ];
    return steps;
  }, [
    conversations.results?.length, 
    hasOpenedIntegrations, 
    knowledge.results?.length
  ]);

  const completedSteps = onboardingSteps.filter(step => step.done).length;
  const progress = Math.round((completedSteps / onboardingSteps.length) * 100);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm grid grid-cols-2 overflow-hidden">
      <div className="max-w-none p-6 gap-6">
        <CardHeader className="p-0 text-pretty">
          <CardTitle className="text-lg leading-snug">We&apos;re glad that you&apos;re here.</CardTitle>
          <CardDescription className="text-sm font-light leading-tight tracking-tighter">
            Follow these steps to setup your chatbot with ease.
          </CardDescription>
          <CardContent className="p-0 pt-4 space-y-4">
            <div className="grid grid-cols-5 items-center gap-3">
              <Progress 
                value={progress}
                className="col-span-3"
              />
              <span className="col-span-2 text-xs tracking-tight">
                {progress}% complete
              </span>
            </div>
            <div className="space-y-2">
              {onboardingSteps.map((step) => (
                <OnboardingStep 
                  key={step.id}
                  done={step.done}
                  label={step.label}
                  href={!step.done ? step.href : undefined}
                  actionLabel={step.actionLabel}
                  actionClassName={step.actionClassName}
                />
              ))}
            </div>
          </CardContent>
        </CardHeader>
      </div>
      <div className="relative h-auto w-auto bg-linear-to-r from-card from-5% to-indigo-500/30">
        <Image 
          src="/banner.webp"
          alt="banner"
          fill
          className="object-cover saturate-200 dark:saturate-150"
        />
      </div>
    </div>
  )
}

export function OnboardingStep({ 
  done = false, 
  label, 
  href,
  actionLabel = "Get started",
  actionClassName,
}: { 
  done?: boolean;
  label: ReactNode;
  href?: string;
  actionLabel?: ReactNode;
  actionClassName?: string
}) {
  const isActionable = !!href && !done;

  return (
    <div 
      role="listitem"
      className="flex items-center gap-2 py-0.5 [&_svg]:size-4 [&_svg]:shrink-0"
    >
      {done ? (
        <CheckCircleIcon aria-hidden className="text-emerald-600 dark:text-emerald-400" />
      ) : (
        <CircleIcon aria-hidden className="text-muted-foreground" />
      )}

      <div className={cn("text-sm tracking-tight", done && "text-zinc-400 line-through font-light")}>
        {label}
      </div>

      {isActionable && (
        <Button asChild size="sm" variant="secondary" className={cn("ml-2", actionClassName)}>
          <Link href={href}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  )
}
