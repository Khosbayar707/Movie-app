"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Movie, Paged } from "../types";
import { Listing } from "./Listing";
import { MovieGrid } from "./MovieGrid";
import { PaginationSeeMore } from "./PaginationSeeMore";

export type View = "list" | "grid";

export function useView(): View {
  return useSearchParams().get("view") === "grid" ? "grid" : "list";
}

/** List / Grid switch kept in the URL so a shared link opens the same layout. */
export function ViewToggle() {
  const view = useView();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hrefFor = (v: View) => {
    const params = new URLSearchParams(searchParams.toString());
    if (v === "list") params.delete("view");
    else params.set("view", v);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const item = (v: View, label: string, Icon: typeof List) => (
    <Link
      href={hrefFor(v)}
      scroll={false}
      aria-current={view === v ? "true" : undefined}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 px-3 text-xs font-semibold uppercase tracking-[0.06em] transition-colors duration-150",
        view === v ? "bg-foreground text-background" : "hover:bg-secondary"
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </Link>
  );

  return (
    <div role="group" aria-label="Layout" className="inline-flex border border-rule">
      {item("list", "List", List)}
      {item("grid", "Grid", LayoutGrid)}
    </div>
  );
}

type Props = {
  data?: Paged<Movie>;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  page: number;
  empty?: React.ReactNode;
};

/** A page of results in the chosen layout, numbered continuously across pages. */
export function ResultsView({ data, isLoading, error, onRetry, page, empty }: Props) {
  const view = useView();
  const start = (page - 1) * 20 + 1;

  return (
    <>
      {view === "grid" ? (
        <MovieGrid
          movies={data?.results}
          isLoading={isLoading}
          error={error}
          onRetry={onRetry}
          start={start}
          skeletonCount={20}
          empty={empty}
        />
      ) : (
        <Listing
          movies={data?.results}
          isLoading={isLoading}
          error={error}
          onRetry={onRetry}
          start={start}
          skeletonCount={12}
          empty={empty}
        />
      )}
      {data && <PaginationSeeMore pageInfo={{ currentPages: page, totalPages: data.total_pages }} />}
    </>
  );
}
