"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

export function ClerkClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>{children}</ClerkProvider>
  );
}
