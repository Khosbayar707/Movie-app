"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTmdb } from "@/lib/tmdb";
import { Genre as GenreType } from "../types";

export function useGenres() {
  const { data, error, isLoading } = useTmdb<{ genres: GenreType[] }>("genre/movie/list");
  return { genres: data?.genres, error, isLoading };
}

export const genreChipClass =
  "inline-flex h-8 items-center rounded-full border px-3 text-xs font-medium transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground";

type Props = {
  className?: string;
  /** Icon-only trigger for the phone header. */
  compact?: boolean;
};

export const Genre = ({ className, compact }: Props) => {
  const { genres, error, isLoading } = useGenres();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          compact ? "inline-flex w-9" : "inline-flex px-3",
          className
        )}
      >
        {compact ? (
          <>
            <LayoutGrid aria-hidden="true" className="size-4" />
            <span className="sr-only">Browse genres</span>
          </>
        ) : (
          <>
            Genre
            <ChevronDown
              aria-hidden="true"
              className="size-4 text-muted-foreground transition-transform duration-300 ease-out-expo [[data-state=open]_&]:rotate-180"
            />
          </>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={10}
        collisionPadding={16}
        className="w-[min(560px,calc(100vw-2rem))] rounded-xl p-5"
      >
        <p className="text-lg font-semibold">Genres</p>
        <p className="mt-0.5 text-sm text-muted-foreground">See lists of movies by genre</p>
        <div className="my-4 h-px bg-border" />
        {error ? (
          <p className="text-sm text-muted-foreground">Genres couldn&apos;t be loaded. Try again later.</p>
        ) : isLoading || !genres ? (
          <div className="flex flex-wrap gap-2" aria-busy="true">
            {Array.from({ length: 12 }, (_, i) => (
              <Skeleton key={i} className="h-8 rounded-full" style={{ width: 64 + ((i * 23) % 48) }} />
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
      </PopoverContent>
    </Popover>
  );
};
