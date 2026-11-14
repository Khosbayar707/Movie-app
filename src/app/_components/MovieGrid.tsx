import { cn } from "@/lib/utils";
import { Movie } from "../types";
import { Card, CardSkeleton } from "./Card";
import { StateMessage } from "./StateMessage";

type Props = {
  movies?: Movie[];
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  /** Index printed on the first cell; omit for unnumbered grids. */
  start?: number;
  skeletonCount?: number;
  empty?: React.ReactNode;
  className?: string;
};

/** Poster cells packed whole, separated by hairline rules rather than gutters of air. */
export const gridClassName =
  "ruled-top grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 [&>*]:border-b [&>*]:border-r [&>*]:border-border [&>*]:p-2.5 sm:[&>*]:p-3";

export function MovieGrid({
  movies,
  isLoading,
  error,
  onRetry,
  start,
  skeletonCount = 10,
  empty,
  className,
}: Props) {
  if (error && !movies?.length) {
    return (
      <StateMessage
        tone="error"
        title="Couldn't load these movies"
        description="Check your connection and try again."
        onRetry={onRetry}
      />
    );
  }

  if (isLoading && !movies?.length) {
    return (
      <div className={cn(gridClassName, className)} aria-busy="true" aria-label="Loading movies">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!movies?.length) {
    return <>{empty ?? <StateMessage title="No movies found" />}</>;
  }

  return (
    <ul className={cn(gridClassName, isLoading && "opacity-60 transition-opacity", className)}>
      {movies.map((movie, i) => (
        <li key={movie.id} className="bg-background">
          <Card movie={movie} index={start !== undefined ? start + i : undefined} priority={i < 5} />
        </li>
      ))}
    </ul>
  );
}
