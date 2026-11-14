import Link from "next/link";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { releaseYear, tmdbImage } from "@/lib/tmdb";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "../types";
import { Rating } from "./Rating";

type Props = {
  movie: Movie;
  /** Listing number printed in the cell's corner. */
  index?: number;
  className?: string;
  priority?: boolean;
};

/** A poster cell: the full-color still in a hairline box, facts set below. */
export function Card({ movie, index, className, priority }: Props) {
  const poster = tmdbImage(movie.poster_path, "w342");
  const year = releaseYear(movie.release_date);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className={cn(
        "group flex h-full flex-col bg-background outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        className
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-muted outline outline-1 -outline-offset-1 outline-black/5 dark:outline-white/5">
        {poster ? (
          <img
            src={poster}
            alt=""
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground">
            <Film aria-hidden="true" className="size-7" />
            <span className="label-caps">No still</span>
          </div>
        )}
        {index !== undefined && (
          <span className="font-condensed absolute left-0 top-0 z-10 bg-foreground px-1.5 py-0.5 text-sm font-extrabold tabular-nums text-background transition-colors duration-150 group-hover:bg-primary group-hover:text-primary-foreground">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-0.5 pb-1 pt-2.5">
        <h3 className="font-condensed line-clamp-2 text-base font-bold leading-tight decoration-primary decoration-2 group-hover:underline">
          {movie.title}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <Rating value={movie.vote_average} />
          {year && <span className="tabular-nums">{year}</span>}
        </div>
      </div>
    </Link>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-background", className)}>
      <Skeleton className="aspect-[2/3] w-full" />
      <Skeleton className="mt-2.5 h-4 w-4/5" />
      <Skeleton className="mt-2 h-3 w-1/2" />
    </div>
  );
}
