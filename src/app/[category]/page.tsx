"use client";

import { notFound, useParams, useSearchParams } from "next/navigation";
import { numberFormat, TMDB_MAX_PAGE, useTmdb } from "@/lib/tmdb";
import { MovieGrid } from "../_components/MovieGrid";
import { PaginationSeeMore } from "../_components/PaginationSeeMore";
import { SectionHeader } from "../_components/SectionHeader";
import { Movie, Paged } from "../types";

const CATEGORIES: Record<string, string> = {
  upcoming: "Upcoming",
  top_rated: "Top Rated",
  popular: "Popular",
  now_playing: "Now Playing",
};

export default function Page() {
  const params = useParams<{ category: string }>();
  const searchParams = useSearchParams();
  const page = Math.min(Math.max(Number(searchParams.get("page")) || 1, 1), TMDB_MAX_PAGE);

  const title = CATEGORIES[params.category];
  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>(
    title ? `movie/${params.category}` : null,
    { page }
  );

  if (!title) notFound();

  return (
    <div className="page-container py-10 sm:py-12">
      <SectionHeader
        as="h1"
        title={title}
        description={
          data
            ? `${numberFormat.format(data.total_results)} movies · Page ${page}`
            : " "
        }
      />
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
