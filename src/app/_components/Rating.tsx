import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value?: number | null;
  /** Show the "/10" scale next to the score. */
  showScale?: boolean;
  className?: string;
};

export function Rating({ value, showScale = true, className }: Props) {
  if (!value) {
    return (
      <span className={cn("text-muted-foreground", className)}>Not rated</span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-1 tabular-nums", className)}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 10`}
    >
      <Star aria-hidden="true" className="size-[1em] fill-rating text-rating" />
      <span className="font-semibold text-foreground">{value.toFixed(1)}</span>
      {showScale && <span className="text-muted-foreground">/10</span>}
    </span>
  );
}
