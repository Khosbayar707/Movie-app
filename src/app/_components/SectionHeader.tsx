import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: React.ReactNode;
  /** h1 on list pages, h2 inside a page. */
  as?: "h1" | "h2";
  id?: string;
  description?: React.ReactNode;
  href?: string;
  linkLabel?: string;
  /** Extra controls set on the right of the heading row (e.g. the view switch). */
  aside?: React.ReactNode;
  className?: string;
};

/** Section head: the heavy-over-hairline double rule, then a condensed headline. */
export function SectionHeader({
  title,
  as: Heading = "h2",
  id,
  description,
  href,
  linkLabel = "See all",
  aside,
  className,
}: Props) {
  return (
    <div className={cn("section-head rule-double mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-2 pt-3", className)}>
      <div className="min-w-0">
        <Heading
          id={id}
          className={cn(
            "font-condensed text-balance font-extrabold uppercase leading-[0.95] tracking-[-0.01em]",
            Heading === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-2xl sm:text-3xl"
          )}
        >
          {title}
        </Heading>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      </div>
      {(href || aside) && (
        <div className="flex shrink-0 items-center gap-4">
          {aside}
          {href && (
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {linkLabel}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
