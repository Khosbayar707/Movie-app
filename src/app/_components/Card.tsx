import Link from "next/link";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { releaseYear, tmdbImage } from "@/lib/tmdb";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "../types";
import { Rating } from "./Rating";

type Props = {
  movie: Movie;
  className?: string;
  /** Eager-load posters that are visible on first paint. */
  priority?: boolean;
};

export function Card({ movie, className, priority }: Props) {
  const poster = tmdbImage(movie.poster_path, "w342");
  const year = releaseYear(movie.release_date);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className={cn(
        "group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-black/5 transition-[box-shadow,transform] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-[0_14px_30px_-12px_rgb(0_0_0/0.45)] dark:ring-white/5">
        {poster ? (
          <img
            src={poster}
            alt=""
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground">
            <Film aria-hidden="true" className="size-8" />
            <span className="text-xs">No poster</span>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1 px-0.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Rating value={movie.vote_average} showScale={false} />
          {year && (
            <>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{year}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <Skeleton className="mt-3 h-4 w-4/5" />
      <Skeleton className="mt-2 h-3 w-1/3" />
    </div>
  );
}
