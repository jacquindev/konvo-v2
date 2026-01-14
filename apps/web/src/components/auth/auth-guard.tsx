"use client";

import type { ReactNode } from "react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignIn } from "@clerk/nextjs";

import { Spinner } from "@repo/ui/components/ui/spinner";

import { AuthLayout } from "./auth-layout";

export function AuthGuard({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <Spinner className="size-8 text-primary shrink-0" />
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SignIn routing="hash" />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
}
