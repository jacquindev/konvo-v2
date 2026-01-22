"use client";

import { DashboardHeader } from "./dashboard-header";
import { DashboardKpis } from "./dashboard-kpis";
import { DashboardOnboarding } from "./dashboard-onboarding";

export function DashboardView() {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in flex flex-col gap-8 p-6 md:p-8 lg:p-10 duration-500">
      <DashboardHeader />
      <DashboardKpis />
      <DashboardOnboarding />
    </div>
  );
}
