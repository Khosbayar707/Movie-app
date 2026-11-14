"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTmdb } from "@/lib/tmdb";
import { Genre as GenreType } from "../types";

export function useGenres() {
  const { data, error, isLoading } = useTmdb<{ genres: GenreType[] }>("genre/movie/list");
  return { genres: data?.genres, error, isLoading };
}

/** id → name lookup for the genre_ids that list endpoints return. */
export function useGenreNames() {
  const { genres } = useGenres();
  return useMemo(() => new Map(genres?.map((g) => [g.id, g.name]) ?? []), [genres]);
}

/** A square index tab, ink-ruled; the active one is printed solid indigo. */
export const genreChipClass =
  "inline-flex h-8 items-center whitespace-nowrap border border-rule/80 px-3 text-xs font-semibold uppercase tracking-[0.06em] transition-colors duration-150 hover:bg-foreground hover:text-background";
export const genreChipActiveClass =
  "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground";

type Props = {
  className?: string;
  triggerClassName?: string;
  /** Marks the trigger as the current section (on genre pages). */
  current?: boolean;
};

export const Genre = ({ className, triggerClassName, current }: Props) => {
  const { genres, error, isLoading } = useGenres();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-current={current ? "page" : undefined}
        className={cn(
          "group inline-flex items-center gap-1 transition-colors data-[state=open]:text-primary",
          triggerClassName,
          className
        )}
      >
        Genres
        <ChevronDown
          aria-hidden="true"
          className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={12}
        collisionPadding={16}
        className="w-[min(600px,calc(100vw-2rem))] border-rule p-0 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.45)]"
      >
        <div className="rule-double mx-5 mt-5 pt-3">
          <p className="font-condensed text-2xl font-extrabold uppercase leading-none">Genres</p>
          <p className="mt-1 text-sm text-muted-foreground">See this week&apos;s listings by genre</p>
        </div>
        <div className="p-5 pt-4">
          {error ? (
            <p className="text-sm text-muted-foreground">
              Genres couldn&apos;t be loaded. Try again later.
            </p>
          ) : isLoading || !genres ? (
            <div className="flex flex-wrap gap-2" aria-busy="true">
              {Array.from({ length: 14 }, (_, i) => (
                <Skeleton key={i} className="h-8" style={{ width: 64 + ((i * 23) % 48) }} />
              ))}
            </div>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <li key={genre.id}>
                  <Link
                    href={`/discover?with_genres=${genre.id}`}
                    onClick={() => setOpen(false)}
                    className={genreChipClass}
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
