"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatRuntime, releaseYear, tmdbImage, useTmdb } from "@/lib/tmdb";
import { Movie, MovieDetails, Paged } from "../types";
import { useGenreNames } from "./FilterGenre";
import { Listing } from "./Listing";
import { Rating } from "./Rating";
import { StateMessage } from "./StateMessage";
import { Trailer } from "./Trailer";

const ROWS = 8;

/** A labelled fact set in its own ruled, fixed-width cell. */
function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 sm:border-l sm:border-border sm:px-3 sm:first:border-l-0 sm:first:pl-0">
      <dt className="label-caps text-muted-foreground">{label}</dt>
      <dd className="mt-1 truncate text-sm font-semibold tabular-nums">{children}</dd>
    </div>
  );
}

/** Section column head: heavy rule over, hairline under, matching every other head. */
export function ColumnHead({
  id,
  title,
  href,
  linkLabel,
}: {
  id: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="rule-double mb-5 flex items-end justify-between gap-4 pb-2 pt-3">
      <h2 id={id} className="font-condensed text-3xl font-extrabold uppercase leading-none">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          {linkLabel}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

function Pick({ movie }: { movie: Movie }) {
  const genres = useGenreNames();
  // List endpoints carry no runtime; the detail record is cached per film by SWR.
  const { data: details } = useTmdb<MovieDetails>(`movie/${movie.id}`);
  const still = tmdbImage(movie.backdrop_path, "w1280") ?? tmdbImage(movie.poster_path, "w780");
  const year = releaseYear(movie.release_date);
  const genre = movie.genre_ids?.map((id) => genres.get(id)).filter(Boolean).slice(0, 2).join(", ");
  const runtime = formatRuntime(details?.runtime);

  return (
    <section aria-labelledby="pick-head" className="flex h-full flex-col">
      <ColumnHead id="pick-head" title="Pick of the week" />

      {/* Keyed on the film so a new pick re-runs the print-in. */}
      <Link
        key={movie.id}
        href={`/movie/${movie.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="print-in relative block aspect-[16/9] overflow-hidden border border-rule bg-muted lg:aspect-auto lg:h-[clamp(13rem,32vh,22rem)]"
      >
        {still && <img src={still} alt="" fetchPriority="high" className="size-full object-cover" />}
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-extra-condensed text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.01em] sm:text-6xl">
          <Link href={`/movie/${movie.id}`} className="decoration-primary decoration-4 underline-offset-[0.12em] hover:underline">
            {movie.title}
          </Link>
        </h3>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-border py-3 sm:grid-cols-[8.5rem_4.5rem_5.5rem_minmax(0,1fr)] sm:gap-x-0">
          <Fact label="Rating">
            <Rating value={movie.vote_average} />
          </Fact>
          <Fact label="Year">{year ?? "—"}</Fact>
          <Fact label="Runtime">{runtime ?? (details ? "—" : " ")}</Fact>
          <Fact label="Genre">{genre || "—"}</Fact>
        </dl>

        {movie.overview && (
          <p className="mt-4 line-clamp-3 max-w-[62ch] text-[15px] leading-relaxed text-foreground/85">
            {movie.overview}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Trailer movieId={movie.id} title={movie.title} />
          <Button asChild variant="outline" size="lg">
            <Link href={`/movie/${movie.id}`}>
              <Info aria-hidden="true" />
              Full listing
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function PickSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading pick of the week">
      <ColumnHead id="pick-head" title="Pick of the week" />
      <Skeleton className="aspect-[16/9] w-full" />
      <Skeleton className="mt-5 h-14 w-3/4" />
      <Skeleton className="mt-5 h-12 w-full" />
      <Skeleton className="mt-4 h-16 w-full" />
    </div>
  );
}

/**
 * The front page: the boxed Pick of the Week beside the numbered Now Playing listing.
 * Pointing at (or focusing) a listing re-prints the pick with that film.
 */
export function FrontPage() {
  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>("movie/now_playing", { page: 1 });
  const movies = data?.results?.filter((m) => m.backdrop_path).slice(0, ROWS) ?? [];
  const [active, setActive] = useState(0);
  const pick = movies[active] ?? movies[0];

  if (error && !movies.length) {
    return (
      <div className="page-container py-10">
        <StateMessage
          tone="error"
          title="This week's listings didn't load"
          description="Check your connection and try again."
          onRetry={() => mutate()}
        />
      </div>
    );
  }

  return (
    <section aria-label="This week" className="page-container pb-6 pt-6 sm:pt-8">
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">{pick ? <Pick movie={pick} /> : <PickSkeleton />}</div>

        <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-10">
          <ColumnHead id="now-playing" title="Now Playing" href="/now_playing" linkLabel="All listings" />
          <p className="-mt-3 mb-2 hidden text-xs text-muted-foreground lg:block">
            Point at a title to preview it.
          </p>
          <Listing
            compact
            movies={movies}
            isLoading={isLoading}
            skeletonCount={ROWS}
            activeIndex={active}
            onPreview={setActive}
            className={cn("lg:[&_a]:py-2.5")}
          />
        </div>
      </div>
    </section>
  );
}
