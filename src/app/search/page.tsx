"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { numberFormat, TMDB_MAX_PAGE, useTmdb } from "@/lib/tmdb";
import { MovieGrid } from "../_components/MovieGrid";
import { PaginationSeeMore } from "../_components/PaginationSeeMore";
import { SectionHeader } from "../_components/SectionHeader";
import { StateMessage } from "../_components/StateMessage";
import { Movie, Paged } from "../types";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.trim() ?? "";
  const page = Math.min(Math.max(Number(searchParams.get("page")) || 1, 1), TMDB_MAX_PAGE);

  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>(
    query ? "search/movie" : null,
    { query, include_adult: "false", page }
  );

  if (!query) {
    return (
      <div className="page-container py-10 sm:py-12">
        <SectionHeader as="h1" title="Search" />
        <StateMessage
          title="Search for a movie"
          description="Type a title in the search bar at the top of the page."
        />
      </div>
    );
  }

  const count = data?.total_results ?? 0;

  return (
    <div className="page-container py-10 sm:py-12">
      <SectionHeader
        as="h1"
        title={<>Results for “{query}”</>}
        description={
          data ? `${numberFormat.format(count)} ${count === 1 ? "movie" : "movies"} found` : " "
        }
      />
      <MovieGrid
        movies={data?.results}
        isLoading={isLoading}
        error={error}
        onRetry={() => mutate()}
        skeletonCount={10}
        empty={
          <StateMessage
            title={`No movies match “${query}”`}
            description="Check the spelling, or try a shorter title."
            action={
              <Button asChild variant="outline">
                <Link href="/popular">Browse popular movies</Link>
              </Button>
            }
          />
        }
      />
      {data && (
        <PaginationSeeMore pageInfo={{ currentPages: page, totalPages: data.total_pages }} />
      )}
    </div>
  );
}
