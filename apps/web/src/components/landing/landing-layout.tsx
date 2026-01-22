"use client";

import type { ReactNode } from "react";
import UnicornScene from "unicornstudio-react";

import { LandingNavbar } from "./landing-navbar";

export function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div 
      className="relative flex min-h-screen w-full flex-col bg-[#010102] font-sans antialiased text-zinc-200 selection:text-zinc-800"
    >
      <div className="absolute inset-0 z-0">
        <UnicornScene
          projectId="L99tNyU87GNVw5k0YV79"
          fps={60}
          dpi={2}
          scale={0.8}
          lazyLoad
          production
        />
      </div>
      
      <LandingNavbar />
      <main className="z-10 flex h-screen w-full flex-1 flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
