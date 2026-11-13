"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { releaseYear, tmdbImage, useTmdb } from "@/lib/tmdb";
import { Movie, Paged } from "../types";
import { Rating } from "./Rating";
import { StateMessage } from "./StateMessage";
import { Trailer } from "./Trailer";

const SLIDES = 5;
const AUTOPLAY_MS = 8000;

/* On phones the backdrop sits above the copy; from md up the copy overlays it. */
const frame = "relative aspect-video w-full md:aspect-auto md:h-[min(78vh,720px)] md:min-h-[480px]";

function Slide({ movie, active, index }: { movie: Movie; active: boolean; index: number }) {
  const backdrop = tmdbImage(movie.backdrop_path, "w1280") ?? tmdbImage(movie.poster_path, "w780");
  const year = releaseYear(movie.release_date);

  return (
    <CarouselItem
      className="pl-0"
      aria-label={`${index + 1} of ${SLIDES}: ${movie.title}`}
    >
      <div className="relative">
        <div className={cn(frame, "overflow-hidden bg-muted")}>
          {backdrop && (
            <img
              src={backdrop}
              alt=""
              // Slides sit off-screen horizontally, so lazy loading would flash an empty frame.
              fetchPriority={index === 0 ? "high" : "low"}
              className={cn(
                "absolute inset-0 size-full object-cover transition-transform [transition-duration:9000ms] ease-out",
                active ? "scale-[1.04]" : "scale-100"
              )}
            />
          )}
          {/* Legibility scrims tinted from the page background so both themes read. */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-background via-background/70 to-transparent md:block" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent md:h-1/2" />
        </div>

        <div className="md:absolute md:inset-0 md:flex md:items-end">
          <div className="page-container pb-2 pt-4 md:pb-24 md:pt-0">
            <div
              key={active ? "on" : "off"}
              className={cn("max-w-xl", active && "md:animate-hero-in")}
            >
              <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-6xl">
                {movie.title}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="font-medium text-primary">In theaters</span>
                <span aria-hidden="true">·</span>
                <Rating value={movie.vote_average} />
                {year && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{year}</span>
                  </>
                )}
              </div>
              {movie.overview && (
                <p className="mt-4 line-clamp-3 max-w-[60ch] text-sm leading-relaxed text-foreground/80 sm:text-base">
                  {movie.overview}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <Trailer movieId={movie.id} title={movie.title} />
                <Button asChild variant="outline" size="lg" className="bg-background/60 backdrop-blur">
                  <Link href={`/movie/${movie.id}`}>
                    <Info aria-hidden="true" />
                    Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}

export function Hero() {
  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>("movie/now_playing", { page: 1 });
  const movies = data?.results?.filter((m) => m.backdrop_path).slice(0, SLIDES) ?? [];

  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Gentle autoplay; stops while the viewer hovers, focuses, or prefers reduced motion.
  useEffect(() => {
    if (!api || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.querySelector("dialog[open]")) return;
      api.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [api, paused, selected]);

  const scrollTo = useCallback((i: number) => api?.scrollTo(i), [api]);

  if (error && !movies.length) {
    return (
      <div className="page-container py-10">
        <StateMessage
          tone="error"
          title="Couldn't load what's in theaters"
          description="Check your connection and try again."
          onRetry={() => mutate()}
        />
      </div>
    );
  }

  if (isLoading || !movies.length) {
    return (
      <div aria-busy="true" aria-label="Loading featured movies">
        <Skeleton className={cn(frame, "rounded-none")} />
        <div className="page-container mt-4 space-y-3 md:hidden">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Now playing in theaters"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {movies.map((movie, i) => (
            <Slide key={movie.id} movie={movie} index={i} active={i === selected} />
          ))}
        </CarouselContent>
      </Carousel>

      {/* Controls: under the copy on phones, bottom-right over the image from md up. */}
      <div className="page-container pointer-events-none md:absolute md:inset-x-0 md:bottom-8">
        <div className="pointer-events-auto mt-4 flex items-center justify-between gap-4 md:mt-0 md:justify-end">
          <div className="flex items-center gap-1.5" role="group" aria-label="Choose slide">
            {movies.map((movie, i) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Show ${movie.title}`}
                aria-current={i === selected}
                className="group grid h-6 place-items-center px-0.5"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-500 ease-out-expo",
                    i === selected
                      ? "w-7 bg-primary"
                      : "w-1.5 bg-foreground/25 group-hover:bg-foreground/50"
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/60 backdrop-blur"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft aria-hidden="true" />
              <span className="sr-only">Previous movie</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/60 backdrop-blur"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight aria-hidden="true" />
              <span className="sr-only">Next movie</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
