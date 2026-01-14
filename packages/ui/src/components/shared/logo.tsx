import { Zen_Dots } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cva } from "class-variance-authority";

import { cn } from "@repo/ui/lib/utils";

const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: ["400"],
});

const logoImageVariant = cva(
  "relative flex aspect-square items-center justify-center bg-transparent",
  {
    variants: {
      size: {
        default: "size-8",
        sm: "size-6",
        lg: "size-10",
        xl: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const logoTextVariant = cva("text-base font-semibold tracking-normal", {
  variants: {
    variant: {
      default: "text-black dark:text-white",
      gradient:
        "bg-linear-to-br from-primary to-chart-1 bg-clip-text text-transparent dark:saturate-150",
    },
    size: {
      default: "text-lg",
      sm: "text-base",
      lg: "text-2xl",
      xl: "text-3xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface LogoProps {
  href?: string;
  option?: "image-only" | "full";
  className?: string;
  size?: "default" | "sm" | "lg" | "xl";
  variant?: "default" | "gradient";
}

export function Logo({
  href = "/",
  option = "full",
  size = "default",
  variant = "default",
  className,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "motion-safe:transition motion-safe:duration-200 motion-safe:hover:scale-[1.02]",
        option === "full"
          ? "flex items-center gap-2"
          : "flex items-center justify-center",
        className
      )}
    >
      <div className={cn(logoImageVariant({ size }))}>
        <Image
          src="/logo.png"
          alt="logo"
          fill
          className="object-cover object-center"
        />
      </div>
      {option === "full" && (
        <p
          className={cn(logoTextVariant({ size, variant }), zenDots.className)}
        >
          konvo
        </p>
      )}
    </Link>
  );
}
