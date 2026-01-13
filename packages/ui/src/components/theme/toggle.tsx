"use client";

import { useCallback, useMemo } from "react";
import type { VariantProps } from "class-variance-authority";
import { useTheme } from "next-themes";

import { useMounted } from "@repo/ui/hooks/use-mounted";
import { cn } from "@repo/ui/lib/utils";
import { buttonVariants } from "@repo/ui/components/ui/button";

import {
  ThemeToggleButton,
  useThemeTransition,
  type ThemeToggleAnimationVariant,
  type ThemeToggleStartPosition,
} from "./button";

interface ThemeToggleProps {
  size?: VariantProps<typeof buttonVariants>["size"];
  variant?: ThemeToggleAnimationVariant;
  start?: ThemeToggleStartPosition;
  url?: string;
  className?: string;
  iconClassName?: string;
}

export function ThemeToggle({
  size = "icon-xs",
  variant = "polygon",
  start,
  url,
  className,
  iconClassName,
}: ThemeToggleProps) {
  const { mounted } = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();

  const onClick = useCallback(() => {
    const newMode = resolvedTheme === "dark" ? "light" : "dark";

    startTransition(() => {
      setTheme(newMode);
    });
  }, [resolvedTheme, setTheme, startTransition]);

  const theme = useMemo(
    () => resolvedTheme as "dark" | "light",
    [resolvedTheme]
  );

  if (!mounted) return null;

  return (
    <ThemeToggleButton
      theme={theme}
      size={size}
      start={start}
      variant={variant}
      url={url}
      onClick={onClick}
      iconClassName={cn(
        "text-muted-foreground group-hover:text-foreground",
        iconClassName
      )}
      className={cn("group", className)}
    />
  );
}
