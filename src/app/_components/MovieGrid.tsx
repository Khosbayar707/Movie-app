import { cn } from "@/lib/utils";
import { Movie } from "../types";
import { Card, CardSkeleton } from "./Card";
import { StateMessage } from "./StateMessage";

type Props = {
  movies?: Movie[];
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  skeletonCount?: number;
  empty?: React.ReactNode;
  className?: string;
};

export const gridClassName =
  "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-6";

export function MovieGrid({
  movies,
  isLoading,
  error,
  onRetry,
  skeletonCount = 10,
  empty,
  className,
}: Props) {
  if (error && !movies?.length) {
    return (
      <StateMessage
        tone="error"
        title="Couldn't load movies"
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
        <li key={movie.id}>
          <Card movie={movie} priority={i < 5} />
        </li>
      ))}
    </ul>
  );
}
