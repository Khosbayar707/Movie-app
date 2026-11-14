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
  "font-condensed inline-flex h-10 min-w-10 items-center justify-center gap-1 border border-transparent px-3 text-base font-bold tabular-nums transition-colors duration-150";

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
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-between gap-4 border-t-[3px] border-rule pt-4">
      <p className="label-caps hidden text-muted-foreground sm:block">
        Page <span className="tabular-nums">{current}</span> of <span className="tabular-nums">{total}</span>
      </p>
      <ul className="mx-auto flex flex-wrap items-center justify-center gap-1 sm:mx-0">
        <li>
          {prevDisabled ? (
            <span aria-disabled="true" className={cn(itemClass, "pointer-events-none opacity-40")}>
              <ChevronLeft aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </span>
          ) : (
            <Link href={hrefFor(current - 1)} className={cn(itemClass, "border-border hover:border-rule hover:bg-foreground hover:text-background")}>
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
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-rule hover:bg-foreground hover:text-background"
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
            <Link href={hrefFor(current + 1)} className={cn(itemClass, "border-border hover:border-rule hover:bg-foreground hover:text-background")}>
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
