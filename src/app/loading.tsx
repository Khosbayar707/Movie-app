import { CardSkeleton } from "./_components/Card";
import { gridClassName } from "./_components/MovieGrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="page-container py-10 sm:py-12" aria-busy="true" aria-label="Loading">
      <Skeleton className="mb-8 h-8 w-48" />
      <div className={gridClassName}>
        {Array.from({ length: 10 }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
