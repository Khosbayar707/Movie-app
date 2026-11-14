import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="page-container py-8 sm:py-10" aria-busy="true" aria-label="Loading">
      <div className="rule-double pt-3">
        <Skeleton className="h-12 w-64" />
      </div>
      <ul className="mt-6">
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i} className="flex items-center gap-4 border-b border-border py-3">
            <Skeleton className="h-4 w-6" />
            <Skeleton className="aspect-[2/3] w-12" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-4 w-20" />
          </li>
        ))}
      </ul>
    </div>
  );
}
