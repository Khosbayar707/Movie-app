"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Play, X } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useTmdb } from "@/lib/tmdb";
import { Video } from "../types";

type Props = {
  movieId: number;
  title: string;
  /** Videos already fetched with the movie; skips the extra request. */
  videos?: Video[];
} & Pick<ButtonProps, "variant" | "size" | "className">;

export function pickTrailer(videos: Video[] = []) {
  const youtube = videos.filter((v) => v.site === "YouTube");
  return (
    youtube.find((v) => v.type === "Trailer" && v.official) ??
    youtube.find((v) => v.type === "Trailer") ??
    youtube.find((v) => v.type === "Teaser") ??
    youtube[0]
  );
}

export function Trailer({ movieId, title, videos, variant, size = "lg", className }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Only hit the videos endpoint once the viewer actually asks for a trailer.
  const { data, isLoading, error } = useTmdb<{ results: Video[] }>(
    open && !videos ? `movie/${movieId}/videos` : null
  );
  const trailer = pickTrailer(videos ?? data?.results);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        <Play aria-hidden="true" className="fill-current" />
        Watch trailer
      </Button>

      <dialog
        ref={dialogRef}
        aria-label={`${title} trailer`}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className="m-auto w-[min(1100px,calc(100vw-2rem))] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="truncate text-sm font-medium text-white/80">{title}</p>
          <Button
            variant="ghost"
            size="icon"
            autoFocus
            onClick={() => setOpen(false)}
            className="shrink-0 text-white hover:bg-white/15 hover:text-white"
          >
            <X aria-hidden="true" />
            <span className="sr-only">Close trailer</span>
          </Button>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
          {open && trailer ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
              title={trailer.name}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-white/70">
              {open && isLoading ? (
                <>
                  <Loader2 aria-hidden="true" className="size-6 animate-spin" />
                  Loading trailer…
                </>
              ) : open && error ? (
                "Couldn't load the trailer. Try again later."
              ) : open ? (
                "No trailer is available for this movie yet."
              ) : null}
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
