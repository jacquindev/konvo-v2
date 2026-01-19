import type { ReactNode } from "react";

interface PageContainerProps {
  header: ReactNode;
  children: ReactNode;
}

export function PageContainer({ header, children }: PageContainerProps) {
  return (
    <div className="max-w-7xl mx-auto flex animate-in fade-in flex-col gap-8 p-6 md:p-8 lg:p-10 duration-500">
      <div className="flex-1">{header}</div>
      <main className="flex-1 flex flex-col gap-8">
        {children}
      </main>
    </div>
  );
}
