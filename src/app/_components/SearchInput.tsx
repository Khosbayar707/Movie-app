"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTmdb } from "@/lib/tmdb";
import { Movie, Paged } from "../types";
import { Suggestion } from "./Suggestion";

type Props = {
  className?: string;
  autoFocus?: boolean;
  /** Called after the visitor picks a result or submits a search. */
  onNavigate?: () => void;
};

const MAX_SUGGESTIONS = 5;

function useDebounced<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export const SearchButtonOrInput = ({ className, autoFocus, onNavigate }: Props) => {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const query = useDebounced(value.trim());
  const { data, isLoading, error } = useTmdb<Paged<Movie>>(query ? "search/movie" : null, {
    query,
    include_adult: "false",
    page: 1,
  });
  const results = query ? data?.results?.slice(0, MAX_SUGGESTIONS) ?? [] : [];
  const pending = value.trim() !== query || isLoading;

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => setActive(-1), [query]);

  // Close when the pointer goes down anywhere outside the field and its panel.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const finish = () => {
    setOpen(false);
    setActive(-1);
    inputRef.current?.blur();
    onNavigate?.();
  };

  const goToMovie = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
    finish();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (active >= 0 && results[active]) return goToMovie(results[active]);
    const q = value.trim();
    if (!q) return;
    router.push(`/search?query=${encodeURIComponent(q)}`);
    finish();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setActive(-1);
      } else if (value) {
        setValue("");
      }
    }
  };

  const showPanel = open && value.trim().length > 0;

  return (
    <form
      ref={rootRef}
      role="search"
      onSubmit={onSubmit}
      className={cn("relative", className)}
    >
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search movies
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={inputRef}
        id={`${listId}-input`}
        type="search"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
        autoComplete="off"
        enterKeyHint="search"
        placeholder="Search movies…"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="h-10 w-full border border-input bg-background pl-9 pr-9 text-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground hover:border-rule focus:border-rule focus:shadow-[inset_0_-2px_0_hsl(var(--primary))] focus-visible:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            inputRef.current?.focus();
          }}
          className="absolute right-1.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {pending && query ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <X aria-hidden="true" className="size-4" />
          )}
          <span className="sr-only">Clear search</span>
        </button>
      )}

      {showPanel && (
        <Suggestion
          id={listId}
          query={value.trim()}
          results={results}
          pending={pending}
          error={Boolean(error)}
          active={active}
          onHover={setActive}
          onPick={finish}
        />
      )}
    </form>
  );
};
