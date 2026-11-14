"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "../types";
import { ResultCard } from "./ResultCard";

type Props = {
  id: string;
  query: string;
  results: Movie[];
  pending: boolean;
  error: boolean;
  active: number;
  onHover: (index: number) => void;
  onPick: () => void;
};

export function Suggestion({ id, query, results, pending, error, active, onHover, onPick }: Props) {
  const hasResults = results.length > 0;

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+0.375rem)] z-50 overflow-hidden border border-rule bg-popover text-popover-foreground shadow-[0_18px_40px_-20px_rgb(0_0_0/0.45)] md:left-auto md:w-[min(460px,calc(100vw-2rem))]">
      {hasResults ? (
        <ul id={id} role="listbox" aria-label="Suggested movies" className="max-h-[min(60vh,440px)] divide-y divide-border overflow-y-auto">
          {results.map((movie, i) => (
            <li
              key={movie.id}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => onHover(i)}
            >
              <ResultCard movie={movie} active={i === active} onClick={onPick} />
            </li>
          ))}
        </ul>
      ) : pending ? (
        <div id={id} className="space-y-1.5 p-3" aria-busy="true" aria-label="Searching">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 p-1.5">
              <Skeleton className="h-[60px] w-10 shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p id={id} role="status" className="px-4 py-6 text-center text-sm text-muted-foreground">
          {error ? "Search is unavailable right now. Try again in a moment." : <>No movies match “{query}”.</>}
        </p>
      )}

      {hasResults && (
        <Link
          href={`/search?query=${encodeURIComponent(query)}`}
          onClick={onPick}
          className="flex items-center justify-between gap-2 border-t border-rule px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent"
        >
          <span className="truncate">See all results for “{query}”</span>
          <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
        </Link>
      )}
    </div>
  );
}
