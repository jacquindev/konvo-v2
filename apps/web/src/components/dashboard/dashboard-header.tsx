"use client";

import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

export function DashboardHeader() {
  const { user } = useUser();

  const userName = useMemo(() => {
    if (!user?.firstName) return "";

    return user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase();
  }, [user?.firstName])

  return (
    <div className="space-y-2 text-pretty">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">Welcome to Konvo Dashboard, {userName}!</h1>
      <p className="text-base md:text-lg text-muted-foreground leading-tight">
        Let&apos;s get your AI chatbot live in just a few steps.
      </p>
    </div>
  )
}
