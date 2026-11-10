# Figma Enhanced: header colours, hairline and the booking bar

The owner, 2026-11-10, after the same changes on Figma PR: the header needs its line from the top of the page, and the
date bar is needed on Figma Enhanced too, in Figma Enhanced's own style. The mechanics are those of Figma PR's bar
(`docs/figma-pr-system.md`, "Booking bar"), in this edition's files and dress; the two editions share no code.

## Header colours (owner, 2026-11-10)

`src/lib/enhanced/styles/header.css`, `interactions.js` (`updateHeader`, `toneUnder`). The header always has a
background now; there are two, each in two strengths:

| | Words and logo | Background |
|---|---|---|
| 1 | white | dark green glass, 72% (`rgb(22 26 17 / 0.72)`) — at the top of a page, over a photograph or a film |
| 2 | white | dark green glass, 86% — after 40px of scrolling, over photographs, films and dark sections |
| 3 | black | white glass, 72% (`rgb(255 255 255 / 0.72)`) — at the top of a page that opens on text |
| 4 | black | white glass, 86% — after 40px of scrolling, over light sections |

The tone follows the section under the header, as before; the 72% at the top replaces the former full transparency
("twice as transparent" as the 86% glass). Copper words are gone: on white glass the words, the logo
(`/brand/logo-dark.svg`) and CHECK AVAILABILITY are black; on green glass they stay white, with the beige button.
The former dark brown state of an open mega panel is gone too: mega panels, the booking bar and its calendar open in
the header's glass of the moment, with its words' colour. A 1px hairline runs under the header — dark on white glass,
light on green glass — and the copper reading-progress line runs on it. The phone gradient over the opening picture
went with the transparency.

## The booking bar

`src/lib/enhanced/components/Booking.svelte`, styles `src/lib/enhanced/styles/booking.css`, wired in
`components/Header.svelte`.

- The designer's "CHECK AVAILABILITY" in the header is now the button that opens and closes the bar
  (`aria-expanded`); before, it opened Orbe's search page. The menu's and the footer's CHECK AVAILABILITY still open
  Orbe directly.
- The bar lies over the page under the header in the header's glass of the moment (green with white words or white
  with black words, blurred, rounded at the foot like the panels), and unrolls: its height grows from nothing (grid
  rows 0fr → 1fr, 520 ms) while the fields settle in; closing rolls it back up. Closed, the bar is hidden and `inert`.
- Escape closes it and returns the focus to the button; opening a mega panel closes it (`enhanced:mega-open`); while
  it is open the header does not step away on scrolling (`interactions.js`, `updateHeader`).
- Fields: muted capitals for "CHECK IN", "CHECK OUT", "GUESTS" (the frames' eyebrow tracking) over values in EB
  Garamond on a hairline; guests 1 to 4 adults, 2 by default.
- "CHECK RATES" ("VER TARIFAS"), the same button as the header's CHECK AVAILABILITY in that glass, opens Orbe's results for the dates and
  guests in a new tab: `bookingResults()` in `src/lib/enhanced/site.ts` builds
  `https://reservations.orbebooking.com/Search/SearchAvailability/PAS6c/en/YYYYMMDD/YYYYMMDD/{adults}/0/` (`/es/` on
  Spanish pages). Without a check-out it asks for one and opens the calendar.
- On opening, the check-in is today and the check-out two nights later, unless the guest has chosen.

## The calendar

One calendar for both dates, in the header's glass, rounded like the panels, under the bar on the left.

- "Check in" or "Check out" opens it: two months side by side. The first click is the check-in, the second the
  check-out, without opening the calendar again; the calendar then closes and the focus moves to Guests. A click on or
  before the check-in while choosing the check-out starts again from that day.
- The two chosen days wear the buttons' colour, the nights between a tinted band, today underlined; while choosing the check-out the band follows the pointer. The nights are counted under
  the months ("2 nights" / "2 noches").
- Past days cannot be chosen; the calendar reaches 18 months ahead.
- Months and weekdays are in the page's language; weeks start on Sunday in English and on Monday in Spanish. Every
  day is a button whose label reads the whole date and whether it is the check-in or the check-out. Arrows move by day
  and week, Page Up and Page Down by month, Home and End to the week's ends, Escape closes the calendar; a click outside
  closes it too.
- With reduced motion the bar and the calendar appear without movement.

## Phones

The designer's header has no booking button below 761px (the menu and the page buttons open Orbe), so the bar opens
from 761px, where the calendar still shows two months.

## Spanish

The new words are in `src/lib/enhanced/content/es.json`, the same es-LA as Figma PR's bar: "Entrada", "Salida",
"Huéspedes", "2 adultos", "VER TARIFAS", "Agregar fecha", "Elige una fecha de salida.", "Mes anterior",
"Mes siguiente", "noche" / "noches", "fecha de entrada" / "fecha de salida". `scripts/spanish-strings.mjs` covers
them (989 strings).

## Checks (2026-11-10)

- Chromium, WebKit and Firefox, English and Spanish: the line is there at the top of light pages and photographs; the
  bar unrolls and rolls back; the header turns to glass with it; the calendar takes both dates in two clicks and
  closes; CHECK RATES fills Orbe's address; a mega panel closes the bar; Escape returns the focus to the button.
- axe (WCAG 2.2 AA): no violations at the top of the page, with the bar open, the calendar open and the menu open, at
  1440, 1024 and 800, in both languages.
- Layout: the 28 pages in both languages at 69 widths in the three engines, against the earlier runs.

## Buttons and the arch sections (owner, 2026-11-10)

- Every control of the edition is rounded 4px, as the designer's CHECK AVAILABILITY in the header: the token
  `--r-control` in `styles/tokens.css` (it was 12px) — the page buttons, the newsletter field and button, the
  next-page button, CHECK RATES and the calendar's days. The film's round "Watch the film" pill keeps its shape.
- The arch sections (Home, Experiences, The Vessyl Presents; `styles/films.css`): the title and its buttons stand in
  the middle of the arch's height instead of at its foot (the copy takes the arch's own top and foot insets and is
  centred), and the title is black. Phones keep the copy above the arch as before.
- Once the arch's film is open to the full screen it holds the screen for 20% of a screen's scroll before the page moves
  on (it was swept away the moment it opened; first 40%, then halved by the owner): the block is 205svh — 85svh open
  the arch, 20svh hold it
  (`interactions.js`, `updateArch`). The arch's title is 2px smaller than the hero size at every width
  (`calc(var(--t-hero) - 2px)`: 66px at 1440px).

## Panels, split photographs and the introduction (owner, 2026-11-10)

`styles/system.css`, at the level of each component:
- Overlay (a photograph with the translucent brown panel): the panel is rounded 4px; on phones, where it becomes a
  full-width band, it keeps square corners.
- Editorial splits (40/60, 50/50 and 60/40, either side): from 768px the photograph runs to the screen's edge on its
  side and is rounded 4px only at its inner corners; on phones, above the copy inside the margins, all four corners
  are 4px. The photo portals (the arch and the bowl) keep their shapes.
- Introduction (the symbol beside the opening prose): the symbol is about a quarter larger and darker (the designer's
  file is beige at half opacity; a CSS filter deepens it), the prose is 1px smaller, and `text-wrap: pretty` keeps a
  single word from ending a paragraph alone.
- The Dome photograph of Home's two overlays (`81536a0be9ccf3efc5a4`) leaned about 1° (its verticals ran to the right at
  the top). A levelled copy — turned 1° back and cut so that the Dome stands in the middle — is in
  `public/enhanced/photos/dome-level-{800,1200,1600,2016}.webp`, anchored to its top (`object-position: 50% 0%`) so the
  Dome's crown stays on wide screens. The original file is untouched: the frozen Figma edition, Figma PR and the menu
  thumbnails still use it.
- The drifting gallery (`styles/drift.css`): from 900px the cards stand against the screen's edges; their photographs
  have square corners at the edge and 4px corners towards the middle (the arrival mask keeps those corners), and the
  title and text under a left card align with the photograph's right edge, as they align with the left edge under a
  right card.
- Headings are black (`--heading-ink: #000` in `styles/tokens.css`) instead of the frames' green: every h1–h3 on light
  sections, the card titles, the description headings and the comparison rows. The copper accents stay copper (the
  eyebrows, the fact and rate headings the designer set in copper), headings on photographs stay light, and the green
  buttons keep their green (`--heading` still colours them).
- The opening mark (`components/Intro.svelte`, `styles/intro.css`) is black on white, as Blueprint's, instead of the
  designer's copper.
- The drifting cards are a little wider, towards the middle: `--card: min(27.5vw, 50svh)` instead of `min(24vw, 44svh)`
  (396px instead of 346px at 1440px). They keep their places, so the square photographs close the vertical gaps by as
  much as they widen. Their captions keep the page's margin from the screen's edge.
- The next-page block (`styles/next.css`): the button stands in the middle of the picture instead of at its foot; it
  still arrives as the arch opens.

