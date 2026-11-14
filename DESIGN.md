---
name: Movie Z
description: This week's movie listings, set as a ruled, numbered listings magazine printed in ink on bright stock.
colors:
  movie-z-indigo: "hsl(244 58% 51%)"
  indigo-wash: "hsl(244 70% 96%)"
  indigo-deep: "hsl(244 58% 42%)"
  star-gold: "hsl(38 88% 50%)"
  bright-stock: "hsl(60 14% 98.5%)"
  paper-white: "hsl(0 0% 100%)"
  printers-ink: "hsl(250 13% 9%)"
  newsprint-grey: "hsl(250 10% 94%)"
  plate-tint: "hsl(250 10% 93.5%)"
  faded-ink: "hsl(250 6% 38%)"
  hairline: "hsl(250 9% 86%)"
  field-rule: "hsl(250 9% 78%)"
  proof-red: "hsl(2 70% 46%)"
  night-plate: "hsl(250 16% 6%)"
  reversed-ink: "hsl(250 14% 93%)"
  night-popover: "hsl(250 14% 9%)"
  indigo-late: "hsl(237 88% 74%)"
  indigo-late-on: "hsl(246 50% 10%)"
  indigo-wash-late: "hsl(244 32% 17%)"
  indigo-pale-late: "hsl(237 92% 86%)"
  star-gold-late: "hsl(40 92% 60%)"
  night-grey: "hsl(250 10% 13%)"
  night-plate-tint: "hsl(250 10% 12.5%)"
  faded-ink-late: "hsl(250 7% 66%)"
  hairline-late: "hsl(250 8% 19%)"
  rule-late: "hsl(250 14% 88%)"
  field-rule-late: "hsl(250 8% 28%)"
  proof-red-late: "hsl(2 75% 62%)"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "6rem"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 72"
  section-head:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 72"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.25
    fontVariation: "'wdth' 72"
  nav-tab:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 72"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  body-long:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  ui:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.25
  tab-caps:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  figure-index:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 72"
  figure-chart:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 900
    lineHeight: 1
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 62"
rounded:
  none: "0px"
spacing:
  gutter-phone: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "40px"
  cell-tight: "10px"
  cell: "12px"
  row: "12px"
  head-gap: "20px"
  column-gap: "40px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.movie-z-indigo}"
    textColor: "{colors.paper-white}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "hsl(244 58% 51% / 0.9)"
  button-primary-lg:
    backgroundColor: "{colors.movie-z-indigo}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.bright-stock}"
    textColor: "{colors.printers-ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "40px"
  button-outline-hover:
    backgroundColor: "{colors.printers-ink}"
    textColor: "{colors.bright-stock}"
  button-ghost-hover:
    backgroundColor: "{colors.newsprint-grey}"
    textColor: "{colors.printers-ink}"
  nav-tab:
    textColor: "{colors.printers-ink}"
    typography: "{typography.nav-tab}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "40px"
  nav-tab-active:
    backgroundColor: "{colors.movie-z-indigo}"
    textColor: "{colors.paper-white}"
  genre-chip:
    textColor: "{colors.printers-ink}"
    typography: "{typography.tab-caps}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "32px"
  genre-chip-hover:
    backgroundColor: "{colors.printers-ink}"
    textColor: "{colors.bright-stock}"
  genre-chip-active:
    backgroundColor: "{colors.movie-z-indigo}"
    textColor: "{colors.paper-white}"
  view-toggle-active:
    backgroundColor: "{colors.printers-ink}"
    textColor: "{colors.bright-stock}"
    typography: "{typography.tab-caps}"
    height: "36px"
  search-field:
    backgroundColor: "{colors.bright-stock}"
    textColor: "{colors.printers-ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 36px"
    height: "40px"
  listing-row:
    textColor: "{colors.printers-ink}"
    padding: "12px 0"
  listing-row-hover:
    backgroundColor: "{colors.newsprint-grey}"
  listing-row-active:
    backgroundColor: "{colors.indigo-wash}"
    textColor: "{colors.movie-z-indigo}"
  index-badge:
    backgroundColor: "{colors.printers-ink}"
    textColor: "{colors.bright-stock}"
    typography: "{typography.figure-index}"
    padding: "2px 6px"
  index-badge-hover:
    backgroundColor: "{colors.movie-z-indigo}"
    textColor: "{colors.paper-white}"
  pagination-current:
    backgroundColor: "{colors.movie-z-indigo}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.none}"
    height: "40px"
    width: "40px"
  facts-box:
    backgroundColor: "{colors.bright-stock}"
    textColor: "{colors.printers-ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  popover:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.printers-ink}"
    rounded: "{rounded.none}"
    padding: "20px"
---

# Design System: Movie Z

## Overview

**Creative North Star: "The Listings Weekly"**

Movie Z is set as this week's listings magazine. Every list is a ruled, numbered listing with the deciding facts (year, genre, rating, runtime) lined up in fixed cells, read top to bottom the way a printed TV or cinema guide is read. The day edition is printed ink on bright stock; the late edition is the same page reversed out of a night-black plate. The interface is the typesetting and the films are the only full colour on the page: stills sit clean and full-colour in hairline boxes, and when a still changes it prints in, ink first, then the photograph comes up.

Density is editorial, not app-like: tight 12px row rhythm, columns locked by fixed-width grid tracks, condensed uppercase headlines that carry the hierarchy so that colour does not have to. Movie Z indigo is the one spot ink and is reserved for things you can press. Ratings are printed as five star-gold stars filled to the score with the figure beside them. Every corner is square. Depth comes from rules, not shadows: a heavy rule over each section head, closed by a single 1px hairline underneath.

The system rejects the streaming-service look outright: no black ground with a red accent, no full-bleed backdrop hero, no endless rows of unnumbered poster carousels. Movie Z is a discovery tool and presents itself as a publication, never as a player.

**Key Characteristics:**
- Ink on bright stock by day; reversed from a night-black plate in the late (dark) edition, with a user toggle.
- Movie Z indigo as the only spot ink, only on pressable things; star gold only on printed ratings.
- Archivo throughout, pulled narrow on its width axis for uppercase condensed headlines.
- Tabular figures in fixed cells; every listing numbered 01, 02, 03 continuously across pages.
- Heavy rule over each section head, one 1px hairline closing it.
- Square corners everywhere (0px).
- Clean full-colour stills in hairline boxes, printing in from grayscale on change.

## Colors

A near-monochrome ink-and-stock page with exactly one spot ink (indigo) for action and one printed accent (star gold) for ratings; the photographs supply all other colour. Tokens live in `src/app/globals.css` as HSL channel triples and are the normative source.

### Primary
- **Movie Z Indigo** (light `movie-z-indigo`, late `indigo-late`): the brand spot ink. Fills the primary button (Watch trailer, Back to this week), the active section tab in the masthead index, the active genre chip and the current pagination cell; colours text links (All listings, See all, back links), the hover underline decoration on titles (2px on rows and cards, 4px on the Pick title), the active listing row's index and title, the hover fill of poster index badges, the 2px focus outline, text selection and the input caret. The token is the brand indigo #4338CA expressed in HSL; the logo SVG carries #4338CA exactly. In the late edition it lifts to a pale periwinkle with near-black text on it (`indigo-late-on`) so it still reads as the pressable ink against the night plate.
- **Indigo Wash** (light `indigo-wash`, late `indigo-wash-late`): the tint that marks the currently previewed or keyboard-focused row (front-page listing, search suggestion, dropdown item). It is a state of a pressable thing, never a background for content.
- **Indigo Deep** (light `indigo-deep`, late `indigo-pale-late`): text set on the indigo wash (focused dropdown items).

### Secondary
- **Star Gold** (light `star-gold`, late `star-gold-late`): printed rating stars only. The unfilled stars are ink at 15% opacity; the score figure beside them stays in ink, so the gold never carries meaning or legibility on its own.

### Neutral
- **Bright Stock** (`bright-stock`): the page ground, a faintly warm off-white. Also the outline-button ground and the text colour on ink-filled cells.
- **Paper White** (`paper-white`): popovers and dropdown panels, and the text on indigo fills.
- **Printer's Ink** (`printers-ink`): body text, headlines, and the heavy rule. The same ink draws the 3px section rules, the 1px outline-button border, the facts-box frame, still frames, and the inverse fills (index badges, active view toggle, outline-button hover).
- **Newsprint Grey** (`newsprint-grey`) and **Plate Tint** (`plate-tint`): the hover fill on rows, ghost buttons and clear buttons (newsprint), and the empty-image ground and skeleton fill (plate tint).
- **Faded Ink** (`faded-ink`): secondary text: descriptions under heads, column-head labels, year and genre cells, inactive index numbers, the edition line.
- **Hairline** (`hairline`): every 1px divider: listing row separators, ruled grid cells, fact-cell dividers, the column rule between front-page columns.
- **Field Rule** (`field-rule`): the resting border of the search field.
- **Proof Red** (`proof-red`): errors only: the dashed border of an error notice and the destructive button.
- **Late edition neutrals**: `night-plate` ground, `reversed-ink` text, `night-popover` panels, `night-grey` and `night-plate-tint` fills, `faded-ink-late` secondary text, `hairline-late` dividers, `rule-late` heavy rules (a light ink reversed out of the plate), `field-rule-late` field borders, `proof-red-late` errors.

### Named Rules
**The One Spot Ink Rule.** Indigo appears only on things you can press, on their states (active, current, focused, previewed), and in the logo. A heading, a label, a background panel or a decorative mark is never indigo.

**The Printed Rating Rule.** Star gold is spent only on rating stars. The figure next to the stars is always set in ink with tabular numerals; gold is the picture of the score, never the score itself.

**The Films Carry The Colour Rule.** The chrome stays ink, stock and hairline grey. All other colour on the page comes from TMDB stills, posters and cast photos.

## Typography

**Display Font:** Archivo (variable, width axis loaded) with ui-sans-serif, system-ui, sans-serif
**Body Font:** Archivo at normal width
**Label/Mono Font:** none; labels are Archivo in small spaced capitals, figures are Archivo with tabular numerals

**Character:** One workhorse grotesque doing every job. Headlines are the same family pulled to 72% or 62% width, set heavy and uppercase, so the page reads like a condensed listings masthead while running text stays open and comfortable.

### Hierarchy
- **Display** (900, extra-condensed at 62% width, 3rem phone / 4.5rem sm / 6rem lg, line-height 0.86, uppercase): the film title on the detail page. The Pick of the Week title uses the same voice at 3rem / 3.75rem (line-height 0.88); the 404 numeral uses it at 7rem / 10rem; the detail overview's drop cap uses it at 4.6rem.
- **Headline** (800, condensed at 72% width, 2.25rem / 3rem sm / 3.75rem lg, line-height 0.95, uppercase): the h1 of list pages (Upcoming, Top Rated, genre and search results).
- **Section head** (800, condensed, 1.5rem / 1.875rem sm, line-height 0.95 to 1, uppercase): every h2 section head (Pick of the week, Now Playing, Cast, More like this), state-message titles and the Genres panel head (1.5rem).
- **Title** (700, condensed, 16px on cards to 18px on rows, line-height 1.25, sentence case): film titles in listing rows, poster cells, chart entries and search suggestions; cast names. Truncated to one line in rows, clamped to two in cells.
- **Nav tab** (700, condensed, 15px, 0.02em tracking, uppercase): the masthead section index.
- **Body** (400, 15px, line-height 1.625, max 62ch): the Pick overview. **Body long** (400, 17px, line-height 1.7, max 66ch): the detail page overview. UI text is 14px at 600 (buttons, links, fact values); metadata is 12 to 13px in faded ink.
- **Tab caps** (600, 12px, 0.06em, uppercase): genre chips and the List / Grid toggle.
- **Label** (600, 11px, 0.08em, uppercase): column heads of listings (No., Title, Year, Genre, Rating), fact labels (Rating, Year, Runtime, Genre, Released, Director), footer column heads, the masthead edition line, the pagination "Page 4 of 500" line.
- **Figures**: index numbers 01 to 20 (800, condensed, 18px, tabular); Top Ten chart ranks (900, extra-condensed, 3rem / 3.75rem, tabular, right-aligned); poster index badges (800, condensed, 14px, tabular).

### Named Rules
**The Width Axis Rule.** Hierarchy comes from width, weight and case, not from a second family. Headlines are Archivo pulled to 72% (condensed) or 62% (extra-condensed) width, always heavy (800 to 900) and uppercase; running text is never condensed.

**The Fixed Cell Rule.** Every figure that lines up with another (index numbers, years, ratings, runtimes, vote counts, page numbers) is set with tabular numerals inside a fixed-width grid track, so columns align down the whole page. Tabular figures are switched off globally and switched on per cell.

**The Column Head Rule.** Small spaced capitals (11px, 600, 0.08em) are only ever a label for data that follows: a column head, a fact label, a footer column head, a dateline. They are not decoration above headlines.

## Layout

One shared measure for every band: a centred container up to 1440px wide with 16px gutters on phones, 24px from 640px and 40px from 1024px. Page bands use 32 to 40px top padding; home sections use 40px (48px from 640px) vertical padding. Breakpoints are Tailwind's defaults (sm 640, md 768, lg 1024).

The page is built from three listing forms, all ruled:

- **The listing** (default for list pages): an ordered list of rows on a fixed grid. From 768px the tracks are 2.5rem No. / 3.5rem thumbnail / flexible title / 3.5rem year / 9rem genre / 7.5rem rating / 1.25rem arrow, with a column-head row of labels above. Below 768px rows collapse to No. / thumbnail / title / rating. Rows are 12px top and bottom, separated by hairlines. Numbering continues across pages (page 2 starts at 21).
- **The ruled grid** (Grid view, More like this): poster cells packed edge to edge in 2 / 3 / 4 / 5 columns, separated by hairline rules instead of gaps, each cell padded 10px (12px from 640px).
- **The strip** (home Upcoming and Popular, Cast): on phones a bounded, snap-scrolling row of numbered cells (44% then 30% of the width) with a fade mask at the right edge; from 768px it becomes the ruled grid (4 columns showing 8 cells, 5 columns from 1024px showing all 10).

Two-column compositions use a 12-column grid with a 40px column gap and a hairline column rule: the front page sets the Pick of the Week at 7/12 beside the numbered Now Playing listing at 5/12; the detail page sets the still and overview at 8/12 beside the facts box at 4/12; the Top Ten chart runs 1 to 5 and 6 to 10 in two ruled columns. Everything stacks to a single column below 1024px (768px for the chart).

Section heads sit 20px above their content. A ruled grid placed straight under a section head shares the head's closing hairline instead of drawing a second rule.

### Named Rules
**The Ruled Not Spaced Rule.** Items are separated by hairline rules, not by gutters of air. Listings divide rows with hairlines; grids divide cells with hairlines; columns divide with a hairline column rule.

**The Numbered Listing Rule.** Every list of films is numbered with two-digit tabular indexes (01, 02 ...) in rows and corner badges in cells, and the numbering runs continuously across pages.

## Elevation & Depth

The page is flat. Depth is conveyed by rules and tonal fills, not shadows: a 3px ink rule marks the top of every section head, the masthead's section index and the footer; a 1px hairline divides everything else; a 3px ink frame boxes the detail page's facts; inverse ink fills (index badges, active view toggle) and indigo fills (active tab, current page) mark state. The only shadows belong to layers that genuinely float above the page: the genre panel, the search suggestions and the theme menu. The trailer dialog sits on a 90% black backdrop instead of a shadow.

### Shadow Vocabulary
- **Floating panel** (`box-shadow: 0 18px 40px -20px rgb(0 0 0 / 0.45)`): the genre panel and the search suggestion panel, always together with a 1px ink border.
- **Menu** (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`): the theme dropdown menu, with a 1px ink border.

### Named Rules
**The Heavy Over Hairline Rule.** Every section head is opened by a 3px ink rule across its top and closed by a single 1px ink hairline beneath it (drawn as `box-shadow: 0 4px 0 -3px` in the rule colour, a rule, not elevation). The masthead's section index uses the same pair: a 3px rule under the tabs, a 2px gap, a 1px rule.

**The Flat Page Rule.** Nothing that sits in the page flow casts a shadow. Shadows are reserved for panels that float over the page (popovers, suggestions, menus), and those panels still carry an ink border.

## Shapes

Every corner is square: the radius scale is set to 0px at every step, and buttons, fields, chips, popovers, dialogs, skeletons, stills and badges all inherit it. The only rounded forms on the page are inside the film-strip logo artwork and the star glyphs, which are brand and printed marks rather than UI geometry.

Borders are the form language. Ink (`printers-ink`, `rule-late` late) draws 1px frames on stills, outline buttons, popovers and the List / Grid toggle, and 3px for heavy rules and the facts box. Hairline grey draws 1px dividers. Stills are cropped with `object-cover` into fixed aspect boxes: 2:3 posters, 3:4 cast photos, 16:9 backdrops. Poster cells carry a near-invisible 5% inner outline so pale posters keep an edge against stock. Index badges are square ink tabs hard against the top-left corner of a still.

**The Square Corner Rule.** Corner radius is 0px everywhere. A rounded control or card does not belong to this page.

## Components

### Buttons
Square, ink-ruled controls; indigo only on the primary action.
- **Shape:** square corners (0px), 40px tall (32px small, 44px large, 40px square icon), 14px semibold label, 16px icons, 8px icon gap.
- **Primary:** indigo fill with white label (Watch trailer with a filled play icon, Back to this week). Large size (44px, 20px side padding) on the Pick and detail page.
- **Outline:** bright stock ground, 1px ink border, ink label (Full listing, Try again, the mobile search and theme icon buttons). Hover inverts it to an ink fill with stock label.
- **Ghost:** no border; hover fills newsprint grey (close search). In the trailer dialog the ghost close button is white and inverts to white fill with black icon.
- **Hover / Focus / Active:** colour transitions over 150ms; primary hover drops the fill to 90%; focus is a 2px indigo ring offset 2px from the stock; pressing nudges the button down 1px; disabled is 40% opacity.
- **Text links:** semibold indigo with a trailing arrow that slides 2px on hover over 200ms, underlined on hover with a 4px offset.

### Chips
- **Style:** genre chips are square index tabs, 32px tall (28px in the facts box), 12px semibold spaced capitals, 1px ink border at 80%, no fill.
- **State:** hover inverts to ink fill with stock text; the active genre is printed solid indigo with an indigo border and white text. On phones the chip row scrolls horizontally and centres the active chip; from 768px it wraps.

### Cards / Containers
- **Poster cell:** a full-colour 2:3 poster in its ruled grid cell, with a square ink index badge (01, 02 ...) in the top-left corner that turns indigo on hover; below it the condensed title (clamped to two lines, indigo underline on hover) and a footer line of printed rating and year in faded ink. No shadow, no radius, no hover zoom.
- **Facts box:** a 3px ink frame, 16px padding (20px from 640px). A poster thumbnail and the large rating head the box over a 1px ink rule; below it, fact rows on a 6.5rem label column (label caps in faded ink, value at 500) divided by hairlines.
- **Still frame:** the Pick of the Week and detail backdrops sit in a 1px ink frame on a plate-tint ground, 16:9, printing in on change.
- **State notice:** empty and error states are a centred boxed notice with a dashed 1px border (ink at 40%, proof red at 60% for errors), a condensed uppercase title, a faded-ink line and an outline Try again button.
- **Skeletons:** square plate-tint blocks pulsing in the exact shape of the content they replace (rows, cells, fact lines).

### Inputs / Fields
- **Style:** the search field is 40px, square, bright stock ground, 1px field-rule border, 14px text, a 16px search icon inset at 12px, faded-ink placeholder "Search movies…".
- **Focus:** the border darkens to ink and an indigo 2px underline is drawn inside the bottom edge (inset shadow); the caret is indigo. Hover also darkens the border to ink.
- **Suggestions:** a floating panel with a 1px ink border and the floating-panel shadow, up to five rows of 40×60 thumbnail, condensed title, printed rating and year, divided by hairlines; the arrow-key-active row takes the indigo wash. A footer link "See all results for …" sits over a 1px ink rule in indigo. Loading shows skeleton rows; no results and errors show one centred faded-ink line.

### Navigation
- **Masthead:** sticky on stock, 64px row with the film-strip logo (indigo artwork by day, white variant in the late edition), a hairline-separated edition dateline in label caps ("Week of Nov 8 – 14, 2026", from 1024px), the search field (up to 340px) and the outline theme button. On phones the search collapses to an outline icon button that expands the field across the row.
- **Section index:** a row of condensed uppercase tabs (This week, Now Playing, Upcoming, Top Rated, Popular, Genres), 40px tall with 12px side padding. Inactive tabs are ink and turn indigo on hover; the active tab is printed as a solid indigo block with white text. The row closes with the heavy-over-hairline rule pair. On phones it scrolls horizontally, fades at the right edge and centres the active tab.
- **Genres panel:** the Genres tab opens a square paper-white popover (up to 600px) with its own heavy-over-hairline head and a wrapped set of genre chips.
- **List / Grid toggle:** two joined 36px segments inside a 1px ink frame, tab-caps labels with 14px icons; the current view is an ink fill with stock text. The view is kept in the URL.
- **Pagination:** under a 3px ink rule; a "Page 4 of 500" label-caps line on the left, then 40px square condensed tabular page cells with hairline borders that invert to ink on hover. The current page is solid indigo. Previous / Next collapse to chevrons on phones; gaps are an ellipsis.
- **Footer colophon:** under a 3px ink rule; logo and a label-caps line over a 1px ink rule, then label-caps column heads on hairlines (Sections, Contact Information) with medium-weight links that turn indigo and underline on hover, plus the TMDB attribution.

### Top Ten Chart
The Top Rated section on the home page is set as a chart, not a grid: two ruled columns (1 to 5, 6 to 10) separated by a hairline column rule. Each entry is an oversized extra-condensed rank figure right-aligned in a 4.5rem track, a 2:3 thumbnail, the condensed title and a printed rating with year. Hover fills the row newsprint grey and prints the rank in indigo.

### Listing Row
The default unit of the system. A two-digit index in faded ink, a 2:3 thumbnail, the condensed title with a faded-ink line beneath (year and overview), then year, genre and printed rating in fixed cells and an arrow that nudges up-right and turns indigo on hover. Hover fills newsprint grey; on the front page, pointing at or focusing a row makes it the active row (indigo wash, indigo index and title) and re-prints the Pick of the Week still with that film.

### Printed Rating
Five star glyphs, ink at 15% opacity, overlaid by the same five in star gold clipped to the score's percentage, followed by the score to one decimal in semibold ink with tabular numerals. Stars are about 0.85em tall so the rating scales with its context (14px in rows, 24px in the facts box). Compact listings drop the stars and keep the figure. Unrated films read "Not rated" in faded ink. Exposed to assistive tech as "Rated 7.5 out of 10".

### Trailer Dialog
A native modal set like a screening room regardless of edition: black ground, 3px white frame, up to 1100px wide, on a 90% black backdrop that closes it on click. A condensed uppercase title bar with a white ghost close button sits over a 16:9 YouTube (no-cookie) player. Loading, error and no-trailer states are a single centred line in white at 70%. Page scroll is locked while it is open.

### Print-in
When a still changes (a new Pick, a detail page opening), it animates from grayscale with 1.35 contrast to full colour over 520ms on the out-expo curve `cubic-bezier(0.16, 1, 0.3, 1)`. The element is keyed on the film so each change re-runs it. Reduced motion collapses this and every other animation and transition to an instant change.

## Do's and Don'ts

### Do:
- **Do** open every section head with the 3px ink rule and close it with one 1px hairline, and let a ruled grid directly beneath share that hairline.
- **Do** number every list of films with two-digit tabular indexes, continuing across pages.
- **Do** set years, ratings, runtimes, counts and page numbers with tabular numerals in fixed-width grid tracks so they align down the page.
- **Do** set headlines in Archivo pulled to 72% or 62% width, 800 to 900 weight, uppercase; keep running text at normal width with a 62 to 66ch measure.
- **Do** spend indigo only on pressable things and their active, current, focused or previewed states, and lift it to `indigo-late` with near-black text in the late edition.
- **Do** print ratings as five star-gold stars filled to the score with the figure in ink beside them.
- **Do** keep stills clean and full-colour in 2:3, 3:4 or 16:9 boxes framed by a hairline or ink rule, and print them in from grayscale (520ms, out-expo) when they change.
- **Do** design every state: skeletons in the exact shape of the content, a boxed dashed notice for empty and error, and a Try again outline button where retry is possible.
- **Do** keep 0px corners on every control, panel, still and badge.
- **Do** keep both editions: ink on bright stock by day, reversed from the night plate late, with the theme toggle in the masthead.

### Don't:
- **Don't** build a black ground with a red accent, a full-bleed autoplaying backdrop hero, or endless rows of unnumbered poster carousels; Movie Z must not look like a Netflix copy. The only horizontal strip is the phone-width fallback of a bounded, numbered, ruled section, which becomes a ruled grid from 768px.
- **Don't** use indigo for headings, labels, panels or decoration, and don't use star gold for anything but rating stars.
- **Don't** round corners or add shadows to anything in the page flow; shadows belong only to floating popovers, suggestions and menus, which keep their ink border.
- **Don't** separate items with gutters of empty space where a hairline rule belongs.
- **Don't** lay a halftone, dot screen, grain or tint over stills or the page ground; stills print clean and full-colour.
- **Don't** add a second typeface or a script, serif or system display face; width, weight and case on Archivo carry the hierarchy.
- **Don't** set small spaced capitals above a headline as an eyebrow; label caps only head data (columns, facts, footer columns, the dateline).
- **Don't** present play, watch-now or subscription affordances beyond Watch trailer; Movie Z plays trailers, never films.
- **Don't** replace the Movie Z name or the film-strip logo, or shift the brand indigo away from #4338CA.
