"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft, Film, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatRuntime, numberFormat, tmdbImage, useTmdb } from "@/lib/tmdb";
import { genreChipClass } from "@/app/_components/FilterGenre";
import { indexLabel } from "@/app/_components/Listing";
import { MovieGrid } from "@/app/_components/MovieGrid";
import { Rating } from "@/app/_components/Rating";
import { SectionHeader } from "@/app/_components/SectionHeader";
import { StateMessage } from "@/app/_components/StateMessage";
import { pickTrailer, Trailer } from "@/app/_components/Trailer";
import { CastMember, MovieDetails } from "@/app/types";

type Props = {
  params: Promise<{ id: string }>;
};

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

/** One row of the facts box: label in caps, value set beside it. */
function FactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 border-b border-border py-2.5 text-sm last:border-b-0">
      <dt className="label-caps pt-0.5 text-muted-foreground">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}

function CastCell({ person, index }: { person: CastMember; index: number }) {
  const photo = tmdbImage(person.profile_path, "w185");
  return (
    <li className="w-[38%] shrink-0 snap-start border-r border-border p-2.5 sm:w-[24%] md:w-auto md:border-b">
      <div className="relative grid aspect-[3/4] place-items-center overflow-hidden bg-muted">
        {photo ? (
          <img src={photo} alt="" loading="lazy" className="size-full object-cover" />
        ) : (
          <User aria-hidden="true" className="size-7 text-muted-foreground" />
        )}
        <span className="font-condensed absolute left-0 top-0 z-10 bg-foreground px-1.5 text-xs font-extrabold tabular-nums text-background">
          {indexLabel(index)}
        </span>
      </div>
      <p className="font-condensed mt-2 line-clamp-2 text-base font-bold leading-tight">{person.name}</p>
      {person.character && (
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">as {person.character}</p>
      )}
    </li>
  );
}

function DetailSkeleton() {
  return (
    <div className="page-container py-8" aria-busy="true" aria-label="Loading film">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-6 h-16 w-2/3" />
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <Skeleton className="aspect-video lg:col-span-8" />
        <Skeleton className="h-[420px] lg:col-span-4" />
      </div>
    </div>
  );
}

export default function Page(props: Props) {
  const { id } = use(props.params);
  const { data: movie, error, isLoading, mutate } = useTmdb<MovieDetails>(`movie/${id}`, {
    append_to_response: "credits,videos,recommendations",
  });

  if (error && !movie) {
    return (
      <div className="page-container py-16">
        <StateMessage
          tone="error"
          title={error.status === 404 ? "This film isn't listed" : "This listing didn't load"}
          description={
            error.status === 404
              ? "It may have been removed from the catalog."
              : "Check your connection and try again."
          }
          onRetry={error.status === 404 ? undefined : () => mutate()}
        />
      </div>
    );
  }

  if (isLoading || !movie) return <DetailSkeleton />;

  const still = tmdbImage(movie.backdrop_path, "w1280");
  const poster = tmdbImage(movie.poster_path, "w342");
  const runtime = formatRuntime(movie.runtime);
  const released = movie.release_date ? dateFormat.format(new Date(`${movie.release_date}T00:00:00`)) : null;
  const crew = movie.credits?.crew ?? [];
  const cast = movie.credits?.cast ?? [];
  const directors = crew.filter((c) => c.job === "Director");
  const writers = [...new Map(crew.filter((c) => c.department === "Writing").map((c) => [c.id, c])).values()];
  const videos = movie.videos?.results ?? [];
  const hasTrailer = Boolean(pickTrailer(videos));
  const similar = movie.recommendations?.results?.slice(0, 10) ?? [];
  const [first, ...rest] = movie.overview ?? "";

  return (
    <article className="pb-6">
      <header className="page-container pt-6 sm:pt-8">
        <Link
          href="/"
          className="group mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          This week&apos;s listings
        </Link>
        <div className="rule-double pb-5 pt-4">
          <h1 className="font-extra-condensed text-balance text-5xl font-black uppercase leading-[0.86] tracking-[-0.01em] sm:text-7xl lg:text-8xl">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="mt-4 max-w-3xl text-lg font-medium text-muted-foreground sm:text-xl">
              {movie.tagline}
            </p>
          )}
          {hasTrailer && (
            <div className="mt-5">
              <Trailer movieId={movie.id} title={movie.title} videos={videos} />
            </div>
          )}
        </div>
      </header>

      <div className="page-container mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-12">
        {/* Still and review copy */}
        <div className="lg:col-span-8">
          <div className="print-in relative aspect-video overflow-hidden border border-rule bg-muted">
            {still ? (
              <img src={still} alt={`Still from ${movie.title}`} fetchPriority="high" className="size-full object-cover" />
            ) : (
              <div className="grid size-full place-items-center text-muted-foreground">
                <Film aria-hidden="true" className="size-10" />
              </div>
            )}
          </div>

          {movie.overview && (
            <p className="mt-8 max-w-[66ch] text-[17px] leading-[1.7] text-foreground/90">
              <span
                aria-hidden="true"
                className="font-extra-condensed float-left mr-2 mt-1 text-[4.6rem] font-black leading-[0.8]"
              >
                {first}
              </span>
              <span className="sr-only">{first}</span>
              {rest.join("")}
            </p>
          )}
        </div>

        {/* Facts box */}
        <aside aria-label="Facts" className="lg:col-span-4">
          <div className="border-[3px] border-rule p-4 sm:p-5">
            <div className="flex gap-4 border-b border-rule pb-4">
              {poster && (
                <img
                  src={poster}
                  alt={`${movie.title} poster`}
                  className="aspect-[2/3] w-24 shrink-0 border border-border object-cover"
                />
              )}
              <div className="min-w-0">
                <p className="label-caps text-muted-foreground">Rating</p>
                <Rating value={movie.vote_average} className="mt-1 text-2xl" />
                {movie.vote_count > 0 && (
                  <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                    from {numberFormat.format(movie.vote_count)} votes
                  </p>
                )}
              </div>
            </div>

            <dl className="py-1">
              {released && <FactRow label="Released">{released}</FactRow>}
              {runtime && (
                <FactRow label="Runtime">
                  <span className="tabular-nums">{runtime}</span>
                </FactRow>
              )}
              {directors.length > 0 && (
                <FactRow label={directors.length > 1 ? "Directors" : "Director"}>
                  {directors.map((d) => d.name).join(", ")}
                </FactRow>
              )}
              {writers.length > 0 && (
                <FactRow label="Writers">{writers.slice(0, 3).map((w) => w.name).join(", ")}</FactRow>
              )}
              {cast.length > 0 && (
                <FactRow label="Stars">{cast.slice(0, 3).map((c) => c.name).join(", ")}</FactRow>
              )}
              {movie.genres.length > 0 && (
                <FactRow label="Genres">
                  <ul className="flex flex-wrap gap-1.5">
                    {movie.genres.map((g) => (
                      <li key={g.id}>
                        <Link href={`/discover?with_genres=${g.id}`} className={cn(genreChipClass, "h-7 px-2")}>
                          {g.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </FactRow>
              )}
            </dl>

          </div>
        </aside>
      </div>

      {cast.length > 0 && (
        <section aria-labelledby="cast-heading" className="page-container pt-14">
          <SectionHeader id="cast-heading" title="Cast" description="In billing order." />
          <ul className="ruled-top no-scrollbar -mx-4 flex snap-x overflow-x-auto border-y border-border px-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:border-y-0 md:border-l md:border-t md:px-0 lg:grid-cols-6">
            {cast.slice(0, 12).map((person, i) => (
              <CastCell key={`${person.id}-${person.character}`} person={person} index={i + 1} />
            ))}
          </ul>
        </section>
      )}

      {similar.length > 0 && (
        <section aria-labelledby="similar-heading" className="page-container pt-14">
          <SectionHeader
            id="similar-heading"
            title="More like this"
            href={`/movie/${movie.id}/recommendations`}
          />
          <MovieGrid movies={similar} start={1} />
        </section>
      )}
    </article>
  );
}
