# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, served by the same app:

- **Viewers deciding what to watch.** Someone, often in the evening, looking for a movie: browsing what is in theaters or coming soon, searching a title they heard about, watching a trailer, and checking cast, runtime and rating before committing.
- **Reviewers of the project.** Teachers and prospective employers who open Movie Z as a portfolio piece to judge the builder's product and front-end craft.

## Product Purpose

Movie Z is a movie discovery app built on the TMDB API. It lets people browse Now Playing, Upcoming, Top Rated and Popular lists, filter by genre, search titles, watch trailers, and read a movie's details, cast and recommendations. Success means a viewer finds something worth watching quickly, and a reviewer sees a finished, considered product rather than a tutorial clone.

## Positioning

A focused discovery tool: find, preview, decide. It is not a streaming service and plays no full movies; it must not present itself as one.

## Operating Context

- Used on phones and laptops, in both light and dark environments.
- All movie data, posters, backdrops, cast photos and trailers come from TMDB and YouTube at runtime; the app owns no media.
- Deployed on Vercel from GitHub (`Khosbayar707/Movie-app`).

## Capabilities and Constraints

- Next.js 15 (App Router), React 19, Tailwind CSS 3, shadcn/Radix primitives, SWR for TMDB requests.
- Routes: `/` (home), `/[category]` (upcoming, top_rated, popular, now_playing), `/discover?with_genres=`, `/search?query=`, `/movie/[id]`, `/movie/[id]/recommendations`.
- TMDB list endpoints cap at 500 pages; images come in fixed TMDB sizes.
- The TMDB token currently lives in `src/app/api.ts` (open item: move to an env variable).

## Brand Commitments

- Name **Movie Z** and the film-strip logo (`public/assets/Logo.svg`, white variant `Logo (1).svg`) stay.
- Indigo (`#4338CA`) stays the brand color.
- Light and dark modes both stay, with a user toggle.
- UI copy stays in English.
- Must not look like a Netflix copy (black ground with a red accent, streaming-service row clichés).

## Evidence on Hand

- Live TMDB catalog data and imagery; no testimonials, user counts, or reviews exist and none may be invented.
- Footer contact details (support@movieZ.com, +976 (11) 123-4567) and the "© 2024 Movie Z" line are existing copy.
- TMDB attribution is required by TMDB's API terms.

## Product Principles

1. Finding a movie beats admiring the interface: every page gets to a poster, a title and a next step fast.
2. Let the films carry the color and drama; the interface frames them.
3. Honest about what it is: discovery and trailers, no fake streaming affordances.
4. Finished in every state: loading, empty, error and long content are designed, not left to defaults.

## Accessibility & Inclusion

Keyboard-operable navigation, search and dialogs; visible focus; WCAG AA contrast in both themes; respect reduced motion.
