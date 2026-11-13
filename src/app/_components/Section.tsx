"use client";

import { cn } from "@/lib/utils";
import { useTmdb } from "@/lib/tmdb";
import { Movie, Paged } from "../types";
import { Card, CardSkeleton } from "./Card";
import { SectionHeader } from "./SectionHeader";
import { StateMessage } from "./StateMessage";

type Props = {
  title: string;
  endpoint: string;
};

const ITEMS = 10;

/**
 * A home-page row: a swipeable rail on phones, a two-row grid from tablet up.
 * Tablet (4 columns) shows 8 posters so both rows stay full.
 */
const listClass =
  "no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-x-4 md:gap-y-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5 lg:gap-x-6";
const itemClass = "w-[42%] shrink-0 snap-start sm:w-[28%] md:w-auto";
const tabletHidden = "md:hidden lg:block";

export function Section({ title, endpoint }: Props) {
  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>(
    `movie/${endpoint}`,
    { page: 1 }
  );
  const movies = data?.results?.slice(0, ITEMS);

  return (
    <section aria-labelledby={`section-${endpoint}`} className="page-container py-8 sm:py-10">
      <SectionHeader title={<span id={`section-${endpoint}`}>{title}</span>} href={`/${endpoint}`} />

      {error && !movies ? (
        <StateMessage
          tone="error"
          title={`Couldn't load ${title.toLowerCase()} movies`}
          description="Check your connection and try again."
          onRetry={() => mutate()}
        />
      ) : isLoading || !movies ? (
        <div className={listClass} aria-busy="true" aria-label={`Loading ${title}`}>
          {Array.from({ length: ITEMS }, (_, i) => (
            <CardSkeleton key={i} className={cn(itemClass, i >= 8 && tabletHidden)} />
          ))}
        </div>
      ) : (
        <ul className={listClass}>
          {movies.map((movie, i) => (
            <li key={movie.id} className={cn(itemClass, i >= 8 && tabletHidden)}>
              <Card movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
