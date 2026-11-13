"use client";

import Link from "next/link";
import { use } from "react";
import { Film, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRuntime, numberFormat, releaseYear, tmdbImage, useTmdb } from "@/lib/tmdb";
import { genreChipClass } from "@/app/_components/FilterGenre";
import { MovieGrid } from "@/app/_components/MovieGrid";
import { Rating } from "@/app/_components/Rating";
import { SectionHeader } from "@/app/_components/SectionHeader";
import { StateMessage } from "@/app/_components/StateMessage";
import { pickTrailer, Trailer } from "@/app/_components/Trailer";
import { CastMember, MovieDetails } from "@/app/types";

type Props = {
  params: Promise<{ id: string }>;
};

function CreditRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b py-3.5 text-sm last:border-b-0">
      <dt className="font-semibold">{label}</dt>
      <dd className="text-muted-foreground">{children}</dd>
    </div>
  );
}

function CastCard({ person }: { person: CastMember }) {
  const photo = tmdbImage(person.profile_path, "w185");
  return (
    <li className="w-28 shrink-0 snap-start sm:w-32">
      <div className="grid aspect-[2/3] place-items-center overflow-hidden rounded-lg bg-muted">
        {photo ? (
          <img src={photo} alt="" loading="lazy" className="size-full object-cover" />
        ) : (
          <User aria-hidden="true" className="size-8 text-muted-foreground" />
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">{person.name}</p>
      {person.character && (
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{person.character}</p>
      )}
    </li>
  );
}

function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading movie">
      <Skeleton className="h-[38vh] min-h-[260px] w-full rounded-none md:h-[56vh]" />
      <div className="page-container relative -mt-24 grid gap-8 md:-mt-40 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        <Skeleton className="hidden aspect-[2/3] rounded-xl md:block" />
        <div className="space-y-4 md:pt-24">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full max-w-2xl" />
        </div>
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
          title={error.status === 404 ? "Movie not found" : "Couldn't load this movie"}
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

  const backdrop = tmdbImage(movie.backdrop_path, "w1280");
  const poster = tmdbImage(movie.poster_path, "w500");
  const year = releaseYear(movie.release_date);
  const runtime = formatRuntime(movie.runtime);
  const crew = movie.credits?.crew ?? [];
  const cast = movie.credits?.cast ?? [];
  const directors = crew.filter((c) => c.job === "Director");
  const writers = [...new Map(crew.filter((c) => c.department === "Writing").map((c) => [c.id, c])).values()];
  const videos = movie.videos?.results ?? [];
  const hasTrailer = Boolean(pickTrailer(videos));
  const similar = movie.recommendations?.results?.slice(0, 10) ?? [];

  return (
    <article>
      {/* Backdrop */}
      <div className="relative h-[38vh] min-h-[260px] w-full overflow-hidden bg-muted md:h-[56vh] md:max-h-[620px]">
        {backdrop && (
          <img src={backdrop} alt="" fetchPriority="high" className="absolute inset-0 size-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/0" />
      </div>

      <div className="page-container relative -mt-28 grid gap-8 md:-mt-48 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] lg:gap-12">
        {/* Poster */}
        <div className="hidden md:block">
          <div className="grid aspect-[2/3] place-items-center overflow-hidden rounded-xl bg-muted shadow-[0_24px_48px_-20px_rgb(0_0_0/0.55)] ring-1 ring-black/5 dark:ring-white/10">
            {poster ? (
              <img src={poster} alt={`${movie.title} poster`} className="size-full object-cover" />
            ) : (
              <Film aria-hidden="true" className="size-10 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="min-w-0 md:pt-36 lg:pt-40">
          <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            {movie.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <Rating value={movie.vote_average} />
            {movie.vote_count > 0 && (
              <span className="tabular-nums">{numberFormat.format(movie.vote_count)} votes</span>
            )}
            {year && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={movie.release_date} className="tabular-nums">
                  {year}
                </time>
              </>
            )}
            {runtime && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{runtime}</span>
              </>
            )}
          </div>

          {movie.genres.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Genres">
              {movie.genres.map((g) => (
                <li key={g.id}>
                  <Link href={`/discover?with_genres=${g.id}`} className={genreChipClass}>
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {movie.tagline && (
            <p className="mt-6 text-base font-medium italic text-foreground/80">{movie.tagline}</p>
          )}
          {movie.overview && (
            <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-foreground/85">
              {movie.overview}
            </p>
          )}

          {hasTrailer && (
            <div className="mt-6">
              <Trailer movieId={movie.id} title={movie.title} videos={videos} />
            </div>
          )}

          <dl className="mt-8 max-w-2xl border-t">
            {directors.length > 0 && (
              <CreditRow label={directors.length > 1 ? "Directors" : "Director"}>
                {directors.map((d) => d.name).join(", ")}
              </CreditRow>
            )}
            {writers.length > 0 && (
              <CreditRow label="Writers">
                {writers.slice(0, 3).map((w) => w.name).join(" · ")}
              </CreditRow>
            )}
            {cast.length > 0 && (
              <CreditRow label="Stars">
                {cast.slice(0, 3).map((c) => c.name).join(" · ")}
              </CreditRow>
            )}
          </dl>
        </div>
      </div>

      {cast.length > 0 && (
        <section aria-labelledby="cast-heading" className="page-container pt-14">
          <SectionHeader title={<span id="cast-heading">Top cast</span>} />
          <ul className="no-scrollbar -mx-4 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-10 lg:scroll-px-10 lg:px-10">
            {cast.slice(0, 15).map((person) => (
              <CastCard key={`${person.id}-${person.character}`} person={person} />
            ))}
          </ul>
        </section>
      )}

      {similar.length > 0 && (
        <section aria-labelledby="similar-heading" className="page-container py-14">
          <SectionHeader
            title={<span id="similar-heading">More like this</span>}
            href={`/movie/${movie.id}/recommendations`}
          />
          <MovieGrid movies={similar} />
        </section>
      )}
    </article>
  );
}
