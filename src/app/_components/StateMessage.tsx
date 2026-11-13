"use client";

import { AlertCircle, RotateCw, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: React.ReactNode;
  tone?: "neutral" | "error";
  onRetry?: () => void;
  action?: React.ReactNode;
  className?: string;
};

export function StateMessage({
  title,
  description,
  tone = "neutral",
  onRetry,
  action,
  className,
}: Props) {
  const Icon = tone === "error" ? AlertCircle : SearchX;

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center",
        className
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "mb-4 size-8",
          tone === "error" ? "text-destructive" : "text-muted-foreground"
        )}
      />
      <p className="text-base font-semibold">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {(onRetry || action) && (
        <div className="mt-6 flex gap-2">
          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              <RotateCw aria-hidden="true" />
              Try again
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
