import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  additional?: ReactNode;
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  additional,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="flex items-start gap-3">
        {Icon && <Icon className="size-8" />}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
          {description && (
            <p className="text-sm md:text-base text-pretty text-muted-foreground lg:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">{additional}</div>
    </div>
  );
}
