"use client";

import { notFound, useParams, useSearchParams } from "next/navigation";
import { numberFormat, TMDB_MAX_PAGE, useTmdb } from "@/lib/tmdb";
import { ResultsView, ViewToggle } from "../_components/ResultsView";
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
    <div className="page-container py-8 sm:py-10">
      <SectionHeader
        as="h1"
        title={title}
        description={data ? `${numberFormat.format(data.total_results)} films listed` : " "}
        aside={<ViewToggle />}
      />
      <ResultsView data={data} isLoading={isLoading} error={error} onRetry={() => mutate()} page={page} />
    </div>
  );
}
