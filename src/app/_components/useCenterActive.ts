"use client";

import { RefObject, useEffect } from "react";

/**
 * Scrolls a horizontal strip so its `[aria-current]` item sits in view.
 * Moves only the strip, never the page, so it is safe to run on every route change.
 */
export function useCenterActive(ref: RefObject<HTMLElement | null>, key: unknown) {
  useEffect(() => {
    const strip = ref.current;
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;
    const active = strip.querySelector<HTMLElement>("[aria-current]");
    if (!active) return;
    const s = strip.getBoundingClientRect();
    const a = active.getBoundingClientRect();
    const target = strip.scrollLeft + (a.left - s.left) - (s.width - a.width) / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: "auto" });
  }, [ref, key]);
}
