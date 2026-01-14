import type { ReactNode } from "react";

interface PageContainerProps {
  header: ReactNode;
  children: ReactNode;
}

export function PageContainer({ header, children }: PageContainerProps) {
  return (
    <div className="max-w-7xl mx-auto flex animate-in fade-in flex-col gap-8 p-6 lg:p-8 duration-500">
      {header}
      {children}
    </div>
  );
}
