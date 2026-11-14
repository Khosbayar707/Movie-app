import { cn } from "@/lib/utils";

type Props = {
  value?: number | null;
  /** Show the printed five-star row next to the score. */
  stars?: boolean;
  /** Extra classes for the star row, e.g. to hide it on narrow listings. */
  starsClassName?: string;
  className?: string;
};

const STAR =
  "M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.7l5.9-.9z";

/** A listings-style rating: five printed stars filled to the score, then the figure. */
export function Rating({ value, stars = true, starsClassName, className }: Props) {
  if (!value) {
    return <span className={cn("text-muted-foreground", className)}>Not rated</span>;
  }

  const pct = Math.max(0, Math.min(100, value * 10));

  return (
    <span
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 10`}
      className={cn("inline-flex items-center gap-1.5 tabular-nums", className)}
    >
      {stars && (
        <span className={cn("relative inline-flex shrink-0", starsClassName)} aria-hidden="true">
          <Row className="text-foreground/15" />
          <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
            <Row className="text-rating" />
          </span>
        </span>
      )}
      <span className="font-semibold text-foreground">{value.toFixed(1)}</span>
    </span>
  );
}

function Row({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 20" className={cn("h-[0.85em] w-[4.25em] fill-current", className)}>
      {[0, 20, 40, 60, 80].map((x) => (
        <path key={x} d={STAR} transform={`translate(${x} 0)`} />
      ))}
    </svg>
  );
}
