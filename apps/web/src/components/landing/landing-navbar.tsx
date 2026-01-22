"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

import { Button } from "@repo/ui/components/ui/button";
import { Zen_Dots } from "next/font/google";
import { Authenticated, Unauthenticated } from "convex/react";

const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: ["400"],
});

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#integration", label: "Integration" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQs" },
];

export function LandingNavbar() {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn("fixed z-50 w-full", isScrolled && "px-4")}
      >
        <div
          className={cn(
            "h-16 border-b border-white/5 bg-black/30 px-6 shadow-sm backdrop-blur-xl ease-out motion-safe:transition-all motion-safe:duration-400 lg:px-12",
            isScrolled && "mx-auto mt-3 max-w-5xl rounded-2xl border lg:px-6"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0">
            <div className="animate-in fade-in-20 duration-500 flex w-full justify-between lg:w-auto">
              <Link href="/" className="flex items-center gap-x-1">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p
                  className={cn(
                    "text-white text-xl tracking-normal text-shadow-sm text-shadow-black/30",
                    zenDots.className
                  )}
                >
                  konvo
                  <span className="font-semibold text-xl text-primary">.</span>
                </p>
              </Link>

              <Button
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setMenuState(!menuState)}
                className="bg-transparent border-white/10 hover:bg-transparent text-white hover:text-zinc-300 relative z-20 block cursor-pointer lg:hidden"
              >
                <MenuIcon className="m-auto size-5 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
                <XIcon className="absolute inset-0 m-auto size-5 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
              </Button>
            </div>

            <div className="animate-in fade-in-20 duration-500 not-first:not-[]:absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm font-medium">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="border-b-3 border-transparent py-4 text-zinc-400 hover:border-primary hover:text-white motion-safe:transition motion-safe:duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-in fade-in-20 duration-500 z-20 mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 bg-black/60 py-6 shadow-2xl shadow-zinc-300/50 backdrop-blur-2xl in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-0 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex">
              <div className="lg:hidden">
                <ul className="space-y-4 text-base">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="block border-l-3 border-transparent px-6 py-2 text-zinc-400 duration-150 hover:border-primary hover:text-white"
                      >
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-6 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <div
                  className={cn("px-6 lg:px-0", isScrolled && "inline-flex")}
                >
                  <Authenticated>
                    <Button type="button" asChild>
                      <Link href="/dashboard" prefetch>
                        Dashboard
                      </Link>
                    </Button>
                  </Authenticated>
                  <Unauthenticated>
                    <Button type="button" asChild>
                      <Link href="/sign-in">Get Started</Link>
                    </Button>
                  </Unauthenticated>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
