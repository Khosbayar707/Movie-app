"use client";

import Link from "next/link";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { releaseYear, tmdbImage, useTmdb } from "@/lib/tmdb";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie, Paged } from "../types";
import { Card, CardSkeleton } from "./Card";
import { indexLabel } from "./Listing";
import { Rating } from "./Rating";
import { SectionHeader } from "./SectionHeader";
import { StateMessage } from "./StateMessage";

type Props = {
  title: string;
  endpoint: string;
  description?: string;
  /** grid: numbered poster cells. chart: a two-column top-ten with oversized figures. */
  variant?: "grid" | "chart";
};

const ITEMS = 10;

/* Phones get a swipeable strip of cells; tablets show 8 (two full rows of 4), desktops all 10. */
const stripClass =
  "ruled-top no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto border-y border-border px-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:border-y-0 md:border-l md:border-t md:px-0 lg:grid-cols-5";
const stripItemClass =
  "w-[44%] shrink-0 snap-start border-r border-border p-2.5 sm:w-[30%] md:w-auto md:border-b md:p-3";
const tabletHidden = "md:hidden lg:block";

function ChartEntry({ movie, rank }: { movie: Movie; rank: number }) {
  const thumb = tmdbImage(movie.poster_path, "w185");
  const year = releaseYear(movie.release_date);
  return (
    <li className="border-b border-border">
      <Link
        href={`/movie/${movie.id}`}
        className="group grid grid-cols-[3.25rem_3.5rem_minmax(0,1fr)] items-center gap-4 py-3 outline-none transition-colors duration-150 hover:bg-secondary focus-visible:bg-accent sm:grid-cols-[4.5rem_3.75rem_minmax(0,1fr)]"
      >
        <span className="font-extra-condensed text-right text-5xl font-black leading-none tabular-nums text-foreground/90 transition-colors duration-150 group-hover:text-primary sm:text-6xl">
          {rank}
        </span>
        <span className="grid aspect-[2/3] place-items-center overflow-hidden bg-muted">
          {thumb ? (
            <img src={thumb} alt="" loading="lazy" className="size-full object-cover" />
          ) : (
            <Film aria-hidden="true" className="size-4 text-muted-foreground" />
          )}
        </span>
        <span className="min-w-0">
          <span className="font-condensed block truncate text-lg font-bold leading-tight decoration-primary decoration-2 group-hover:underline">
            {movie.title}
          </span>
          <span className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <Rating value={movie.vote_average} />
            {year && <span className="tabular-nums">{year}</span>}
          </span>
        </span>
      </Link>
    </li>
  );
}

export function Section({ title, endpoint, description, variant = "grid" }: Props) {
  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>(`movie/${endpoint}`, { page: 1 });
  const movies = data?.results?.slice(0, ITEMS);
  const headingId = `section-${endpoint}`;

  let body: React.ReactNode;
  if (error && !movies) {
    body = (
      <StateMessage
        tone="error"
        title={`${title} didn't load`}
        description="Check your connection and try again."
        onRetry={() => mutate()}
      />
    );
  } else if (variant === "chart") {
    body =
      isLoading || !movies ? (
        <div aria-busy="true" className="grid gap-x-10 md:grid-cols-2">
          {Array.from({ length: ITEMS }, (_, i) => (
            <Skeleton key={i} className="my-3 h-20" />
          ))}
        </div>
      ) : (
        // Two ruled columns: 1–5 down the left, 6–10 down the right.
        <div className="grid md:grid-cols-2">
          {[movies.slice(0, 5), movies.slice(5, 10)].map((col, c) => (
            <ol
              key={c}
              start={c * 5 + 1}
              className={cn(c === 1 ? "md:border-l md:border-border md:pl-10" : "md:pr-10")}
            >
              {col.map((movie, i) => (
                <ChartEntry key={movie.id} movie={movie} rank={c * 5 + i + 1} />
              ))}
            </ol>
          ))}
        </div>
      );
  } else {
    body =
      isLoading || !movies ? (
        <div className={stripClass} aria-busy="true" aria-label={`Loading ${title}`}>
          {Array.from({ length: ITEMS }, (_, i) => (
            <CardSkeleton key={i} className={cn(stripItemClass, i >= 8 && tabletHidden)} />
          ))}
        </div>
      ) : (
        <ul className={stripClass}>
          {movies.map((movie, i) => (
            <li key={movie.id} className={cn(stripItemClass, i >= 8 && tabletHidden)}>
              <Card movie={movie} index={i + 1} />
            </li>
          ))}
        </ul>
      );
  }

  return (
    <section aria-labelledby={headingId} className="page-container py-10 sm:py-12">
      <SectionHeader id={headingId} title={title} description={description} href={`/${endpoint}`} />
      {body}
    </section>
  );
}
