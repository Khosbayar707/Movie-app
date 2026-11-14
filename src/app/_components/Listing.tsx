"use client";

import Link from "next/link";
import { ArrowUpRight, Film } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { releaseYear, tmdbImage } from "@/lib/tmdb";
import { Movie } from "../types";
import { useGenreNames } from "./FilterGenre";
import { Rating } from "./Rating";
import { StateMessage } from "./StateMessage";

export function indexLabel(n: number) {
  return String(n).padStart(2, "0");
}

type RowProps = {
  movie: Movie;
  index: number;
  /** compact: the narrow front-page column (no overview, no genre cell). */
  compact?: boolean;
  active?: boolean;
  onPreview?: () => void;
};

/**
 * One listings entry. Index, thumbnail and title lead; year, genre and rating
 * sit in fixed-width cells so the columns line up down the whole page.
 */
export function ListingRow({ movie, index, compact, active, onPreview }: RowProps) {
  const genres = useGenreNames();
  const year = releaseYear(movie.release_date);
  const genre = movie.genre_ids?.map((id) => genres.get(id)).filter(Boolean).slice(0, 2).join(", ");
  const thumb = tmdbImage(movie.poster_path, "w92");

  return (
    <li className="border-b border-border last:border-b-0">
      <Link
        href={`/movie/${movie.id}`}
        onMouseEnter={onPreview}
        onFocus={onPreview}
        aria-current={active ? "true" : undefined}
        className={cn(
          "group grid items-center gap-x-3 py-3 outline-none transition-colors duration-150 focus-visible:bg-accent sm:gap-x-4",
          compact
            ? "grid-cols-[2rem_2.5rem_minmax(0,1fr)_auto]"
            : "grid-cols-[2rem_3rem_minmax(0,1fr)_auto] md:grid-cols-[2.5rem_3.5rem_minmax(0,1fr)_3.5rem_9rem_7.5rem_1.25rem]",
          active ? "bg-accent" : "hover:bg-secondary"
        )}
      >
        <span
          className={cn(
            "font-condensed pl-1 text-lg font-extrabold tabular-nums leading-none",
            active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {indexLabel(index)}
        </span>

        <span className="grid aspect-[2/3] w-full place-items-center overflow-hidden bg-muted">
          {thumb ? (
            <img src={thumb} alt="" loading="lazy" className="size-full object-cover" />
          ) : (
            <Film aria-hidden="true" className="size-4 text-muted-foreground" />
          )}
        </span>

        <span className="min-w-0">
          <span
            className={cn(
              "font-condensed block truncate text-[17px] font-bold leading-tight decoration-primary decoration-2 group-hover:underline sm:text-lg",
              active && "text-primary"
            )}
          >
            {movie.title}
          </span>
          {compact || !movie.overview ? (
            <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              {year && <span className="tabular-nums">{year}</span>}
              {!compact && genre && <span className="truncate">· {genre}</span>}
            </span>
          ) : (
            <span className="mt-0.5 block truncate text-[13px] text-muted-foreground md:pr-6">
              <span className="tabular-nums md:hidden">{year} · </span>
              {movie.overview}
            </span>
          )}
        </span>

        {!compact && (
          <>
            <span className="hidden text-sm tabular-nums text-muted-foreground md:block">{year ?? "—"}</span>
            <span className="hidden truncate text-sm text-muted-foreground md:block">{genre || "—"}</span>
          </>
        )}

        <Rating value={movie.vote_average} className="text-sm" stars={!compact} starsClassName="hidden md:inline-flex" />

        {!compact && (
          <ArrowUpRight
            aria-hidden="true"
            className="hidden size-4 text-muted-foreground transition-[color,transform] duration-150 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-primary md:block"
          />
        )}
      </Link>
    </li>
  );
}

type ListProps = {
  movies?: Movie[];
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  /** Number shown on the first row; continues across pages. */
  start?: number;
  skeletonCount?: number;
  compact?: boolean;
  activeIndex?: number;
  onPreview?: (i: number) => void;
  empty?: React.ReactNode;
  className?: string;
};

export function Listing({
  movies,
  isLoading,
  error,
  onRetry,
  start = 1,
  skeletonCount = 10,
  compact,
  activeIndex,
  onPreview,
  empty,
  className,
}: ListProps) {
  if (error && !movies?.length) {
    return (
      <StateMessage
        tone="error"
        title="Couldn't load these listings"
        description="Check your connection and try again."
        onRetry={onRetry}
      />
    );
  }

  if (isLoading && !movies?.length) {
    return (
      <ul aria-busy="true" aria-label="Loading listings" className={className}>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <li key={i} className="flex items-center gap-4 border-b border-border py-3">
            <Skeleton className="h-4 w-6" />
            <Skeleton className={cn("aspect-[2/3]", compact ? "w-10" : "w-12")} />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-4 w-16" />
          </li>
        ))}
      </ul>
    );
  }

  if (!movies?.length) return <>{empty ?? <StateMessage title="No movies listed" />}</>;

  return (
    <div className={cn(isLoading && "opacity-60 transition-opacity", className)}>
      {!compact && (
        <div
          aria-hidden="true"
          className="label-caps hidden grid-cols-[2.5rem_3.5rem_minmax(0,1fr)_3.5rem_9rem_7.5rem_1.25rem] gap-x-4 border-b border-border pb-2 text-muted-foreground md:grid"
        >
          <span className="pl-1">No.</span>
          <span />
          <span>Title</span>
          <span>Year</span>
          <span>Genre</span>
          <span>Rating</span>
          <span />
        </div>
      )}
      <ol>
        {movies.map((movie, i) => (
          <ListingRow
            key={movie.id}
            movie={movie}
            index={start + i}
            compact={compact}
            active={activeIndex === i}
            onPreview={onPreview ? () => onPreview(i) : undefined}
          />
        ))}
      </ol>
    </div>
  );
}
