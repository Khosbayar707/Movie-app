"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { numberFormat, TMDB_MAX_PAGE, useTmdb } from "@/lib/tmdb";
import { genreChipActiveClass, genreChipClass, useGenres } from "../_components/FilterGenre";
import { ResultsView, ViewToggle } from "../_components/ResultsView";
import { SectionHeader } from "../_components/SectionHeader";
import { useCenterActive } from "../_components/useCenterActive";
import { Movie, Paged } from "../types";

export default function Page() {
  const searchParams = useSearchParams();
  const genreId = Number(searchParams.get("with_genres")) || null;
  const page = Math.min(Math.max(Number(searchParams.get("page")) || 1, 1), TMDB_MAX_PAGE);
  const view = searchParams.get("view");

  const { genres } = useGenres();
  const chipsRef = useRef<HTMLUListElement>(null);
  useCenterActive(chipsRef, `${genreId}-${genres?.length ?? 0}`);
  const genre = genres?.find((g) => g.id === genreId);

  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>("discover/movie", {
    with_genres: genreId ?? undefined,
    sort_by: "popularity.desc",
    page,
  });

  const chipHref = (id: number) =>
    `/discover?with_genres=${id}${view === "grid" ? "&view=grid" : ""}`;

  return (
    <div className="page-container py-8 sm:py-10">
      <SectionHeader
        as="h1"
        title={
          genreId
            ? genre?.name ?? (
                <span aria-hidden="true" className="inline-block h-12 w-56 animate-pulse bg-muted align-middle" />
              )
            : "All genres"
        }
        description={data ? `${numberFormat.format(data.total_results)} films listed, most popular first` : " "}
        aside={<ViewToggle />}
      />

      <nav aria-label="Genres" className="mb-8">
        <ul ref={chipsRef} className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {genres
            ? genres.map((g) => {
                const active = g.id === genreId;
                return (
                  <li key={g.id} className="shrink-0">
                    <Link
                      href={chipHref(g.id)}
                      aria-current={active ? "page" : undefined}
                      className={cn(genreChipClass, active && genreChipActiveClass)}
                    >
                      {g.name}
                    </Link>
                  </li>
                );
              })
            : Array.from({ length: 14 }, (_, i) => (
                <li key={i} className="shrink-0">
                  <Skeleton className="h-8 w-20" />
                </li>
              ))}
        </ul>
      </nav>

      <ResultsView data={data} isLoading={isLoading} error={error} onRetry={() => mutate()} page={page} />
    </div>
  );
}
