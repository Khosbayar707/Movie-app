"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { TMDB_MAX_PAGE, useTmdb } from "@/lib/tmdb";
import { MovieGrid } from "@/app/_components/MovieGrid";
import { PaginationSeeMore } from "@/app/_components/PaginationSeeMore";
import { SectionHeader } from "@/app/_components/SectionHeader";
import { Movie, MovieDetails, Paged } from "@/app/types";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Recommend(props: Props) {
  const { id } = use(props.params);
  const searchParams = useSearchParams();
  const page = Math.min(Math.max(Number(searchParams.get("page")) || 1, 1), TMDB_MAX_PAGE);

  const { data: movie } = useTmdb<MovieDetails>(`movie/${id}`);
  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>(
    `movie/${id}/recommendations`,
    { page }
  );

  return (
    <div className="page-container py-10 sm:py-12">
      <Link
        href={`/movie/${id}`}
        className="mb-4 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        {movie ? `Back to ${movie.title}` : "Back to movie"}
      </Link>
      <SectionHeader
        as="h1"
        title="More like this"
        description={movie ? `Movies similar to ${movie.title}` : " "}
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
