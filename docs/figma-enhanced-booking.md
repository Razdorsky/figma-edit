# Figma Enhanced: the header's hairline and the booking bar

The owner, 2026-11-10, after the same changes on Figma PR: the header needs its line from the top of the page, and the
date bar is needed on Figma Enhanced too, in Figma Enhanced's own style. The mechanics are those of Figma PR's bar
(`docs/figma-pr-system.md`, "Booking bar"), in this edition's files and dress; the two editions share no code.

## The header's hairline

`src/lib/enhanced/styles/header.css` (`.site-header::after`). Before, the floating header had no line at the top of a
page — it lay on the opening picture with no background — and got a background and a pale border only after 40px of
scrolling. Now a 1px line runs under the header from the first moment, the full width of the screen, so the header
always reads as a band:

- copper at 28% (`--accent`) over light sections, light at 28% (`--on-dark`) over photographs and dark sections; it
  follows the header's tone as the page scrolls;
- the copper reading-progress line runs on top of it;
- with a mega panel or the booking bar open, header and panel are one sheet of glass, and the line goes.

The old border of the scrolled background was removed, so the line is never doubled.

## The booking bar

`src/lib/enhanced/components/Booking.svelte`, styles `src/lib/enhanced/styles/booking.css`, wired in
`components/Header.svelte`.

- The designer's "CHECK AVAILABILITY" in the header is now the button that opens and closes the bar
  (`aria-expanded`); before, it opened Orbe's search page. The menu's and the footer's CHECK AVAILABILITY still open
  Orbe directly.
- The bar lies over the page under the header in the mega panels' dark brown glass (`rgb(38 17 1 / 0.86)`, blurred,
  rounded at the foot like the panels), and unrolls: its height grows from nothing (grid rows 0fr → 1fr, 520 ms) while
  the fields settle in; closing rolls it back up. Header and bar become one sheet: the header takes its dark tone
  (light logo and words, beige button) while the bar is open. Closed, the bar is hidden and `inert`.
- Escape closes it and returns the focus to the button; opening a mega panel closes it (`enhanced:mega-open`); while
  it is open the header does not step away on scrolling (`interactions.js`, `updateHeader`).
- Fields: sand capitals for "CHECK IN", "CHECK OUT", "GUESTS" (`--accent-on-dark`, the frames' eyebrow tracking) over
  values in EB Garamond on a light hairline; guests 1 to 4 adults, 2 by default.
- "CHECK RATES" ("VER TARIFAS") in the beige the header's button wears on glass opens Orbe's results for the dates and
  guests in a new tab: `bookingResults()` in `src/lib/enhanced/site.ts` builds
  `https://reservations.orbebooking.com/Search/SearchAvailability/PAS6c/en/YYYYMMDD/YYYYMMDD/{adults}/0/` (`/es/` on
  Spanish pages). Without a check-out it asks for one and opens the calendar.
- On opening, the check-in is today and the check-out two nights later, unless the guest has chosen.

## The calendar

One calendar for both dates, in the same glass, rounded like the panels, under the bar on the left.

- "Check in" or "Check out" opens it: two months side by side. The first click is the check-in, the second the
  check-out, without opening the calendar again; the calendar then closes and the focus moves to Guests. A click on or
  before the check-in while choosing the check-out starts again from that day.
- The two chosen days are beige with dark figures (the buttons' beige), the nights between a band of lighter glass,
  today underlined in sand; while choosing the check-out the band follows the pointer. The nights are counted under
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
