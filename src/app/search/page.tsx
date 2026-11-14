"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { numberFormat, TMDB_MAX_PAGE, useTmdb } from "@/lib/tmdb";
import { ResultsView, ViewToggle } from "../_components/ResultsView";
import { SectionHeader } from "../_components/SectionHeader";
import { StateMessage } from "../_components/StateMessage";
import { Movie, Paged } from "../types";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.trim() ?? "";
  const page = Math.min(Math.max(Number(searchParams.get("page")) || 1, 1), TMDB_MAX_PAGE);

  const { data, error, isLoading, mutate } = useTmdb<Paged<Movie>>(query ? "search/movie" : null, {
    query,
    include_adult: "false",
    page,
  });

  if (!query) {
    return (
      <div className="page-container py-8 sm:py-10">
        <SectionHeader as="h1" title="Search" />
        <StateMessage
          title="Search the listings"
          description="Type a title into the search box at the top of the page."
        />
      </div>
    );
  }

  const count = data?.total_results ?? 0;

  return (
    <div className="page-container py-8 sm:py-10">
      <SectionHeader
        as="h1"
        title={<>“{query}”</>}
        description={data ? `${numberFormat.format(count)} ${count === 1 ? "film matches" : "films match"} your search` : " "}
        aside={<ViewToggle />}
      />
      <ResultsView
        data={data}
        isLoading={isLoading}
        error={error}
        onRetry={() => mutate()}
        page={page}
        empty={
          <StateMessage
            title={`Nothing listed for “${query}”`}
            description="Check the spelling, or try a shorter title."
            action={
              <Button asChild variant="outline">
                <Link href="/popular">Browse popular films</Link>
              </Button>
            }
          />
        }
      />
    </div>
  );
}
