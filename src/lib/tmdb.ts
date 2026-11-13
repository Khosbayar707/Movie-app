"use client";

import useSWR from "swr";
import { options } from "@/app/api";

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

/** TMDB never serves more than 500 pages for list endpoints. */
export const TMDB_MAX_PAGE = 500;

type Params = Record<string, string | number | undefined | null>;

export function tmdbUrl(path: string, params: Params = {}) {
  const url = new URL(`${TMDB_BASE}/${path.replace(/^\/+/, "")}`);
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export class TmdbError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new TmdbError(res.status, `TMDB request failed (${res.status})`);
  }
  return res.json();
}

/** Cached, deduplicated TMDB request. Pass `null` as the path to skip. */
export function useTmdb<T>(path: string | null, params?: Params) {
  return useSWR<T, TmdbError>(path ? tmdbUrl(path, params) : null, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });
}

export type ImageSize = "w92" | "w185" | "w342" | "w500" | "w780" | "w1280" | "original";

export function tmdbImage(path: string | null | undefined, size: ImageSize = "w342") {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

export function releaseYear(date?: string | null) {
  return date ? date.slice(0, 4) : null;
}

export function formatRuntime(minutes?: number | null) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export const numberFormat = new Intl.NumberFormat("en-US");
