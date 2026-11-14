"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { TMDB_MAX_PAGE, useTmdb } from "@/lib/tmdb";
import { ResultsView, ViewToggle } from "@/app/_components/ResultsView";
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
  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>(`movie/${id}/recommendations`, { page });

  return (
    <div className="page-container py-8 sm:py-10">
      <Link
        href={`/movie/${id}`}
        className="group mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        {movie ? `Back to ${movie.title}` : "Back to film"}
      </Link>
      <SectionHeader
        as="h1"
        title="More like this"
        description={movie ? `Films recommended for viewers of ${movie.title}` : " "}
        aside={<ViewToggle />}
      />
      <ResultsView data={data} isLoading={isLoading} error={error} onRetry={() => mutate()} page={page} />
    </div>
  );
}
