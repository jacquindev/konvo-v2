import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  additional?: ReactNode;
}

export function PageHeader({ title, description, additional }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
        {description && (
          <p className="text-base text-balance text-muted-foreground lg:text-lg">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">{additional}</div>
    </div>
  );
}
