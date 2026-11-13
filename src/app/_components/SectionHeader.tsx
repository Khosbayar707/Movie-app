import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: React.ReactNode;
  /** Rendered as an h1 on list pages, h2 inside a page. */
  as?: "h1" | "h2";
  description?: React.ReactNode;
  href?: string;
  linkLabel?: string;
  className?: string;
};

export function SectionHeader({
  title,
  as: Heading = "h2",
  description,
  href,
  linkLabel = "See more",
  className,
}: Props) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <Heading
          className={cn(
            "text-balance font-bold tracking-tight",
            Heading === "h1" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          )}
        >
          {title}
        </Heading>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {linkLabel}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
