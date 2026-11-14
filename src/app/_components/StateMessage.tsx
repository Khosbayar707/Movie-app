"use client";

import { RotateCw } from "lucide-react";
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

/** An empty or failed listing, set as a boxed notice in the column. */
export function StateMessage({ title, description, tone = "neutral", onRetry, action, className }: Props) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "border border-dashed border-rule/40 px-6 py-14 text-center",
        tone === "error" && "border-destructive/60",
        className
      )}
    >
      <p className="font-condensed text-2xl font-extrabold uppercase leading-tight">{title}</p>
      {description && <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {(onRetry || action) && (
        <div className="mt-6 flex justify-center gap-2">
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
