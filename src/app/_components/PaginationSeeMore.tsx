"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TMDB_MAX_PAGE } from "@/lib/tmdb";

export type PageInfo = {
  totalPages: number;
  currentPages: number;
};

/** 1 … 4 5 6 … 20, always showing first, last, and the current page's neighbors. */
function getVisiblePages(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => pages.add(p));
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? ["gap" as const, p] : [p]));
}

const itemClass =
  "inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-md px-3 text-sm font-medium tabular-nums transition-colors";

export const PaginationSeeMore = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const total = Math.min(pageInfo.totalPages, TMDB_MAX_PAGE);
  const current = Math.min(Math.max(pageInfo.currentPages, 1), Math.max(total, 1));
  if (total <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathName}?${params.toString()}`;
  };

  const prevDisabled = current <= 1;
  const nextDisabled = current >= total;

  return (
    <nav aria-label="Pagination" className="mt-12 flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-1">
        <li>
          {prevDisabled ? (
            <span aria-disabled="true" className={cn(itemClass, "pointer-events-none opacity-40")}>
              <ChevronLeft aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </span>
          ) : (
            <Link href={hrefFor(current - 1)} className={cn(itemClass, "hover:bg-accent hover:text-accent-foreground")}>
              <ChevronLeft aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sr-only sm:hidden">Previous page</span>
            </Link>
          )}
        </li>

        {getVisiblePages(current, total).map((page, i) =>
          page === "gap" ? (
            <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-muted-foreground">
              …
            </li>
          ) : (
            <li key={page}>
              <Link
                href={hrefFor(page)}
                aria-label={`Page ${page}`}
                aria-current={page === current ? "page" : undefined}
                className={cn(
                  itemClass,
                  page === current
                    ? "border border-primary/40 bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {page}
              </Link>
            </li>
          )
        )}

        <li>
          {nextDisabled ? (
            <span aria-disabled="true" className={cn(itemClass, "pointer-events-none opacity-40")}>
              <span className="hidden sm:inline">Next</span>
              <ChevronRight aria-hidden="true" className="size-4" />
            </span>
          ) : (
            <Link href={hrefFor(current + 1)} className={cn(itemClass, "hover:bg-accent hover:text-accent-foreground")}>
              <span className="hidden sm:inline">Next</span>
              <span className="sr-only sm:hidden">Next page</span>
              <ChevronRight aria-hidden="true" className="size-4" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
