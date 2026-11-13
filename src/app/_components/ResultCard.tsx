import Link from "next/link";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { releaseYear, tmdbImage } from "@/lib/tmdb";
import { Movie } from "../types";
import { Rating } from "./Rating";

type Props = {
  movie: Movie;
  active?: boolean;
  onClick?: () => void;
};

export function ResultCard({ movie, active, onClick }: Props) {
  const poster = tmdbImage(movie.poster_path, "w92");
  const year = releaseYear(movie.release_date);

  return (
    <Link
      href={`/movie/${movie.id}`}
      onClick={onClick}
      tabIndex={-1}
      className={cn(
        "flex items-center gap-3 rounded-lg p-1.5 transition-colors",
        active ? "bg-accent text-accent-foreground" : "hover:bg-accent/60"
      )}
    >
      <div className="grid h-[60px] w-10 shrink-0 place-items-center overflow-hidden rounded bg-muted">
        {poster ? (
          <img src={poster} alt="" loading="lazy" className="size-full object-cover" />
        ) : (
          <Film aria-hidden="true" className="size-4 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{movie.title}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Rating value={movie.vote_average} />
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
