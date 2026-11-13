"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { numberFormat, TMDB_MAX_PAGE, useTmdb } from "@/lib/tmdb";
import { genreChipClass, useGenres } from "../_components/FilterGenre";
import { MovieGrid } from "../_components/MovieGrid";
import { PaginationSeeMore } from "../_components/PaginationSeeMore";
import { SectionHeader } from "../_components/SectionHeader";
import { Movie, Paged } from "../types";

export default function Page() {
  const searchParams = useSearchParams();
  const genreId = Number(searchParams.get("with_genres")) || null;
  const page = Math.min(Math.max(Number(searchParams.get("page")) || 1, 1), TMDB_MAX_PAGE);

  const { genres } = useGenres();
  const genre = genres?.find((g) => g.id === genreId);

  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>("discover/movie", {
    with_genres: genreId ?? undefined,
    sort_by: "popularity.desc",
    page,
  });

  return (
    <div className="page-container py-10 sm:py-12">
      <SectionHeader
        as="h1"
        title={genreId ? genre?.name ?? <span aria-hidden="true" className="inline-block h-8 w-40 animate-pulse rounded-md bg-muted align-middle" /> : "All genres"}
        description={
          data ? `${numberFormat.format(data.total_results)} movies · Page ${page}` : " "
        }
      />

      <nav aria-label="Genres" className="mb-10">
        <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {genres
            ? genres.map((g) => {
                const active = g.id === genreId;
                return (
                  <li key={g.id} className="shrink-0">
                    <Link
                      href={`/discover?with_genres=${g.id}`}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        genreChipClass,
                        active &&
                          "border-primary bg-primary text-primary-foreground hover:border-primary hover:bg-primary/90 hover:text-primary-foreground"
                      )}
                    >
                      {g.name}
                    </Link>
                  </li>
                );
              })
            : Array.from({ length: 12 }, (_, i) => (
                <li key={i} className="shrink-0">
                  <Skeleton className="h-8 w-20 rounded-full" />
                </li>
              ))}
        </ul>
      </nav>

      <MovieGrid
        movies={data?.results}
        isLoading={isLoading}
        error={error}
        onRetry={() => mutate()}
        skeletonCount={20}
      />
      {data && (
        <PaginationSeeMore pageInfo={{ currentPages: page, totalPages: data.total_pages }} />
      )}
    </div>
  );
}
