"use client";

import { useCallback } from "react";
import type { VariantProps } from "class-variance-authority";
import { MoonIcon, SunIcon } from "lucide-react";

import { useMounted } from "@repo/ui/hooks/use-mounted";
import { cn } from "@repo/ui/lib/utils";
import { Button, buttonVariants } from "@repo/ui/components/ui/button";

export type ThemeToggleAnimationVariant =
  | "circle"
  | "circle-blur"
  | "gif"
  | "polygon";
export type ThemeToggleStartPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface ThemeToggleButtonProps {
  theme?: "light" | "dark";
  variant?: ThemeToggleAnimationVariant;
  start?: ThemeToggleStartPosition;
  url?: string; // For gif variant
  className?: string;
  iconClassName?: string;
  size?: VariantProps<typeof buttonVariants>["size"];
  onClick?: () => void;
}

export function ThemeToggleButton({
  theme = "light",
  variant = "circle",
  start = "center",
  url,
  className,
  iconClassName,
  size,
  onClick,
}: ThemeToggleButtonProps) {
  const { mounted } = useMounted();

  const Icon = theme === "light" ? SunIcon : MoonIcon;

  const handleClick = useCallback(() => {
    // Inject animation styles for this specific transition
    const styleId = `theme-transition-${Date.now()}`;
    const style = document.createElement("style");
    style.id = styleId;

    // Generate animation CSS based on variant
    let css = "";
    const positions = {
      center: "center",
      "top-left": "top left",
      "top-right": "top right",
      "bottom-left": "bottom left",
      "bottom-right": "bottom right",
    };

    const cx = start === "center" ? "50" : start.includes("left") ? "0" : "100";
    const cy = start === "center" ? "50" : start.includes("top") ? "0" : "100";

    if (variant === "circle") {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-expand 0.4s ease-out;
            transform-origin: ${positions[start]}
          }
          @keyframes circle-expand {
            from {
              clip-path: circle(0% at ${cx}% ${cy}%);
            }
            to {
              clip-path: circle(150% at ${cx}% ${cy}%);
            }
          }
        }
      `;
    } else if (variant === "circle-blur") {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-blur-expand 0.5s ease-out;
            transform-origin: ${positions[start]};
            filter: blur(0);
          }
          @keyframes circle-blur-expand {
            from {
              clip-path: circle(0% at ${cx}% ${cy}%);
              filter: blur(4px);
            }
            to {
              clip-path: circle(150% at ${cx}% ${cy}%);
              filter: blur(0);
            }
          }
        }
      `;
    } else if (variant === "gif" && url) {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: fade-out 0.4s ease-out;
          }
          ::view-transition-new(root) {
            animation: gif-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1);
            mask-image: url('${url}');
            mask-size: 0%;
            mask-repeat: no-repeat;
            mask-position: center;
          }
          @keyframes fade-out {
            to {
              opacity: 0;
            }
          }
          @keyframes gif-reveal {
            0% {
              mask-size: 0%;
            }
            20% {
              mask-size: 35%;
            }
            60% {
              mask-size: 35%;
            }
            100% {
              mask-size: 300%;
            }
          }
        }
      `;
    } else if (variant === "polygon") {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
          }
          ::view-transition-new(root) {
            animation: ${theme === "light" ? "wipe-in-dark" : "wipe-in-light"} 0.4s ease-out;
          }
          @keyframes wipe-in-dark {
            from {
              clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
          @keyframes wipe-in-light {
            from {
              clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
        }
      `;
    }

    if (css) {
      style.textContent = css;
      document.head.appendChild(style);

      // Clean up animation styles after transition
      setTimeout(() => {
        const styleEl = document.getElementById(styleId);
        if (styleEl) styleEl.remove();
      }, 3000);
    }

    // Call the onClick handler if provided
    onClick?.();
  }, [onClick, start, theme, url, variant]);

  if (!mounted) return null;

  return (
    <Button
      aria-label="Toggle Theme"
      type="button"
      variant="outline"
      size={size}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden motion-safe:transition-all motion-safe:duration-300",
        className
      )}
    >
      <Icon className={cn("h-[1.2rem] w-[1.2rem]", iconClassName)} />
    </Button>
  );
}

// Export a helper hook for using with View Transitions API
export function useThemeTransition() {
  const startTransition = useCallback((updateFn: () => void) => {
    if ("startViewTransition" in document) {
      document.startViewTransition(updateFn);
    } else {
      updateFn();
    }
  }, []);

  return { startTransition };
}
