# Figma PR — the references' design system and how the edition follows it

The owner, 2026-11-10: the PR team likes the design of three Rosewood Mayakoba pages; the owner adds Four Seasons Bangkok, which looks alike and has more interesting solutions, motion above all. Task: take the frozen Figma edition, copy it, dissect the references' design system "to the bone" and convert the copy entirely into it, published at https://razdorsky.github.io/figma-pr/. The texts are the designer's; the order of some blocks may change; blocks become the references' block types; fonts as close to theirs as free fonts allow; our films and clips go where the references put video. No questions, to the end.

References (dissected 2026-11-10 with a headless Chrome at 1440×900 and 390×844, computed styles, fonts, transitions, class changes while scrolling, and full-page screenshots):
- https://www.rosewoodhotels.com/en/mayakoba-riviera-maya (home)
- https://www.rosewoodhotels.com/en/mayakoba-riviera-maya/discover/festive (seasonal page)
- https://www.rosewoodhotels.com/en/mayakoba-riviera-maya/offers/gather-more-gain-more (offer page)
- https://www.fourseasons.com/bangkok/ (home)

## Rosewood Mayakoba — the system

**Type.** Two families only.
- *Engravers Gothic Bold* — a wide engraved grotesque, always capitals with tracking 0.2 em: hero titles 48/48 px, tracking 4.8 px (0.1 em); section labels and card titles 18/21 px, 3.6 px; buttons, eyebrows and small links 12/16.8 px, 2.4 px.
- *Austin Light* (300) — a narrow, high-contrast light serif for everything else: statements 48/48 px, letter-spacing −0.01 em; secondary statements and large card titles 32/32 px; card titles 22/26 px; body 16/19.2 px (a tight 1.2); italic for one-line subtitles under card titles ("Enjoy a complimentary night", "Signature suites | Up to 10 guests"); navigation links 16 px.

**Colour.** Paper #FAFBF5 everywhere, ink #000 (secondary #212529), the brand green #013D2D (Reserve button, announcement bar, the band at the foot), white #FAFBF5 on pictures. No other colours; the photographs carry the colour.

**Layout.** Side margin 40 px on desktop, 20 px on phones. Pictures run to the edges: the What's-on grid is three 4:5 pictures across the full 1440 px with 80 px gutters and no outer margin; full-bleed panels are 1440×866. Statements are centred in a column of about 760 px. A left text column of 432 px stands beside horizontal carousels.

**Header.** Three tiers on paper, not over the picture: an optional green announcement bar; a utility row (small underlined capitals left and right, the wordmark centred); a property row (property name in capitals with a chevron, serif navigation links, a green "RESERVE" button 54 px high). Scrolling down, the utility row leaves and the property row sticks.

**Hero.** A full-width film (autoplay, muted, loop, poster) about 80% of the screen high, darkened; centred capital title, a serif line under it, a small black button. Slides advance with a pagination line; on phones a green Reserve bar sits under the film with pause and sound controls.

**Blocks.**
1. Eyebrow + statement + underlined "View all" link, then three 4:5 cards edge to edge: serif card title 32 px, italic subtitle, body, an outlined "DETAILS" button.
2. Full-bleed picture panel: capital title, serif text, a black button bar.
3. Left column (eyebrow, statement, outlined "VIEW ALL") beside a horizontal carousel of 4:5 cards: capital card titles 18 px, body, a black "RESERVE" and an outlined "DETAILS".
4. Centred eyebrow + statement over a centre-focus carousel: a 3:4 picture 450 px wide in the middle, smaller neighbours cut by the screen edges, a capital caption, a line of text, an underlined link.
5. Split "Celebrate more": a short text column (statement, text, black button) beside a large landscape picture running to the edge.
6. Offer page: a sticky left column (eyebrow, statement, large serif lede, a wide black button) beside the picture and the terms; terms under small bold capital labels; an accordion row "POLICIES, TERMS & CONDITIONS +" between hairlines.
7. "Stay connected" newsletter row between two hairlines: serif line left, black button right.
8. Footer: four columns under capital headings, serif links, a centred monogram, a tiny capital legal line, a green band at the foot.

**Buttons.** No radius. Solid: 54 px high, padding 0 24 px, black or green, paper text, 12 px capitals tracked 0.2 em. Outlined: 1 px border, same text. Text links: serif 16 px with an underline 8 px below the baseline.

**Motion.** Quiet: opacity 0.2 s, carousel transforms 0.5 s ease, the header's rows on scroll, slide changes.

## Four Seasons Bangkok — what it adds

**Type.** Monotype Garamond (serif body 15/25 px, italic small lines 18 px), Neue Helvetica (capital labels 10–12 px bold with 3 px tracking; capital titles 24 px ExtraLight with 4 px tracking).

**Solutions.**
- A dark, frosted header that sticks, with a booking bar under it: dates, guests, "Add promo code", "CHECK RATES".
- A full-screen hero film with the title over it, the address and quick links, and a row of translucent icon tiles.
- An accommodation carousel whose centre card lifts out (white card with shadow, title, rule, text, two buttons).
- Offer tiles with the title over a darkened picture; experience cards with duration and price.
- A boxed banner picture with the text on its left.
- Alternating rows: a picture half and a grey panel half.
- A black quote section in large italic serif.
- A black footer.

**Motion (measured while scrolling).**
- Pictures settle from scale 1.1 to 1.0 as they come up the screen.
- The hero's darkening and the area under it fade as the page leaves the hero.
- Experience cards scale from 0.66 to 1 with their text panel counter-scaled, so the row opens out as it arrives.
- The centre card of the accommodation carousel animates in.
- The header gains and loses its expanded state with the scroll direction.
- Colours ease over 0.3 s.

## Decisions for Figma PR

**Base.** A copy of the frozen Figma edition (`src/lib/pr`, `src/routes/figma-pr`), with its 28 pages, texts and order. Every text of the frames stays, the designer's placeholders included.

**System.** Rosewood's, as the PR team chose it, with Four Seasons' motion and its booking bar.

**Fonts (OFL, self-hosted in `src/lib/pr/fonts/`).** Chosen side by side against the references at the same size:
- Archivo at width 125 for Engravers Gothic;
- Libre Caslon Display for Austin Light at statement sizes (narrow, high contrast);
- Newsreader Light, with its italic, for Austin Light at text sizes (as light as Austin at 16 px).

**Colour.** Rosewood's paper and ink. Rosewood's green role goes to the Vessyl deep forest green; Vessyl copper is not used.

**Video.** The clips chosen for Figma Enhanced (owner-approved placement):
- the opening of every page that has one (17 pages: Home, Experiences and The Vessyl Presents from their arch films, and 14 photo openings);
- nine section clips on Home, The Frequency Experience, Horses and the River, The Harmonic Hearth, Sound and movement, Horses and the land and The recording studio.

Phone versions and loading as in Figma Enhanced (`docs/figma-enhanced-speed.md`).

**Counters.** Rosewood's carousels show "1 — 3"; the owner has ruled out counters of the kind "1 / 3" (2026-11-09). Carousels here show a thin progress line and arrows instead.

## Block mapping

The markup of every page is the frozen edition's (`data-role`, `data-variant`, `data-part`); only the presentation and the
pictures change. `src/lib/pr/styles/sections.css` holds one block per section type, numbered as below.

| Designer's section | Reference block | How it looks in Figma PR |
|---|---|---|
| Photo opening, and the text openings of Experiences and The Vessyl Presents (`data-pr-hero`) | Rosewood's hero film, Four Seasons' fade | Full width, up to 82% of the screen, a clip or photograph under a soft darkening; centred capital title 48 px tracked 0.1 em, a serif line 22 px, a black button and an outlined one. |
| Text opening, heading title, copy block | Rosewood's centred eyebrow and statement | Centred in a column of 920 px: capital eyebrow 14 px, statement in Libre Caslon Display 48 px, text under it. A copy block with only an eyebrow becomes the label of the cards after it. |
| Split, description (with the rate) | Rosewood's offer page | The lede in display serif 32 px and the text on the left (7 of 11 parts); the rate panel on the right, between hairlines, sticky under the header. |
| Split, editorial | Rosewood's "Celebrate more", Four Seasons' picture rows | A short text column (4 of 12) beside a 16:11 picture that runs to the edge of the page; image-first puts the picture on the left. |
| Facts, amenities | Rosewood's terms under small capital labels | A grid of hairline rows: capital label 11 px, value in serif 20 px. |
| Cards, three across | Rosewood's "What's on" | 4:5 pictures edge to edge with an 80 px gutter; serif title 32 px, text, an outlined button 44 px. |
| Cards, two across | Rosewood's dining cards | 3:2 pictures inside the margins; capital titles 18 px tracked 0.2 em; a black button. |
| Overlay (picture panel) | Rosewood's full-bleed panel | The picture across the page, a capital title 44 px, a serif line, a black bar "View gallery" at the foot. |
| Callout | Four Seasons' boxed banner | A panel inside the margins; the text on the darkened left of the picture. A picture narrower than 900 px (the Vessyl mark on The Frequency Experience, the founder's square portrait) stands whole on the green instead of being enlarged and cut; from 900 px the words and that picture stand side by side as one pair in the middle of the panel (owner, 2026-11-10: they stood at its two ends). Below 900 px the picture comes first, on the green, and the text sits under it on paper. |
| Gallery | Rosewood's centre-focus carousel | Made of the page's own photographs (none added): a 3:4 slide of 450 px in the middle, neighbours cut by the edges, a thin progress line and two arrows (no counter). Every slide opens the gallery dialog. |
| Comparison table, topics | Rosewood's capital headings and hairlines | Capital column heads, hairline rows; topics open and close as accordion rows with "+". |
| Events | Rosewood's event rows | Hairline rows: date in capitals, title in serif, text, action. |
| Quote | Four Seasons' black quote section | Black ground, the quote in large italic serif, the author in capitals. |
| Introduction, logos, map | Rosewood's quiet paper sections | Kept in place, retyped in the new fonts. |
| Newsletter | Rosewood's "Stay connected" row | A serif line on the left and the field and black button on the right, between two hairlines. |

Every designer text and control stays, the placeholders "Button", "button", "+" and "[offer]" included
(owner, 2026-11-10). Below 1100 px the grids narrow; below 900 px splits and cards stack, the header becomes one row
and the reserve button becomes a bar along the foot of the screen; below 600 px the opening title is 26 px.

## Header

`src/lib/pr/components/Header.svelte`, `src/lib/pr/styles/shell.css`. Rosewood's tiers on paper:
- the utility row: the dark wordmark in the middle and, on the right as in the frame's header, the designer's
  "EN | ES" — a link to the page in the other language (`docs/figma-spanish.md`), the current language marked by a
  2px rule. Nothing on the left. (Until 2026-11-10 it also had a "CHECK AVAILABILITY" link on the right and EN | ES on
  the left; the owner had the link removed, since the green button already says it, and the language moved right.)
- the navigation row: "MENU" with three lines, the Stay and Experiences groups (the frame's two menus) whose panels
  show the pages as picture cards with an "Overview ↗" link, the "Rates & offers" link, and the green reserve button
  "CHECK AVAILABILITY".

Scrolling (owner, 2026-11-10; `updateHeader()` in `interactions.js`). The header sticks at the top. Once the page
has scrolled past the utility row, scrolling down slides the whole header up by that row's height
(`data-collapsed`, 0.55 s ease-out), so the navigation row stays alone; scrolling up by 20 px anywhere on the page
brings the utility row back, so the language is always one gesture away. While the utility row is away, the small
wordmark slides in from the left at the start of the navigation row and "MENU" moves aside for it by the wordmark's
width; when the row comes back they return, and the hidden wordmark cannot take focus. A mega panel or the booking bar
that is open keeps the header as it is. With reduced motion everything changes at once. Mega-panel pictures load only
when a panel opens. Below 900 px the utility row is hidden; the navigation row carries "MENU" on the left and the
wordmark in the middle.

## Booking bar

Four Seasons' booking bar under the header, in Rosewood's dress (`src/lib/pr/components/Booking.svelte`).
- The reserve button ("CHECK AVAILABILITY") opens and closes it (`aria-expanded`). It lies over the page under the
  header and unrolls: its height grows from nothing (grid rows 0fr → 1fr, 0.5 s) while the fields settle in; closing
  rolls it back up. Escape closes it and returns the focus to the button; opening a mega panel closes it. Closed, it is
  `inert`.
- Dates: one calendar for both (owner, 2026-11-10). "Check in" or "Check out" opens it: two months side by side, one
  below 900 px. The first click is the check-in, the second the check-out, without opening the calendar again; the
  nights between are lit and counted ("2 nights" / "2 noches"), and the calendar then closes and the focus moves to
  Guests. A click on or before the check-in while choosing the check-out starts again from that day. Past days cannot
  be chosen; the calendar reaches 18 months ahead. Months and weekdays are in the page's language (weeks start on
  Sunday in English, Monday in Spanish); every day is a button whose label reads the whole date. Arrows move by day
  and week, Page Up and Page Down by month, Home and End to the week's ends, Escape closes the calendar.
- On opening, the check-in is today and the check-out two nights later, unless the guest has chosen.
- Guests: 1 to 4 adults, 2 by default.
- "CHECK RATES" ("VER TARIFAS"; Four Seasons' word, so it no longer repeats the green button) opens Orbe's results
  for those dates and guests in a new tab: `bookingFor()` in `src/lib/pr/site.ts` builds
  `https://reservations.orbebooking.com/Search/SearchAvailability/PAS6c/en/YYYYMMDD/YYYYMMDD/{adults}/0/` (`/es/` on
  Spanish pages). Without a check-out it asks for one and opens the calendar.
- Below 900 px the bar is a sheet that rises above the reserve bar at the foot of the screen, and the calendar covers
  it while the dates are chosen.

## Menu, newsletter, footer

- **Menu** (`Menu.svelte`, `.pr-menu`): the frozen edition's full-screen menu on paper, its words and order unchanged,
  set in display serif with capital group labels and hairlines. Its top row (owner, 2026-11-10): the close button on
  the left, where "MENU" opened it; the wordmark in the middle; from 1024 px the designer's globe with EN or ES and
  "CHECK AVAILABILITY ↗" on the right, in that order. Below 1024 px those two stay at the foot of the menu (between 900
  and 1023 px they do not fit beside the centred wordmark).
- **Newsletter** (`Newsletter.svelte`, `.pr-newsletter`): Rosewood's "Stay connected" row.
- **Footer** (`Footer.svelte`): the frame's five columns (Stay, Experiences, The Property, Plan your visit, Contact)
  under capital headings, serif links, the Vessyl symbol in the middle as Rosewood's monogram, the legal line
  "©The Vessyl 2026 • La Fortuna, Costa Rica" as the frame writes it, and the green band at the foot. The columns
  stand as one block in the middle, the same distance from both edges of the page: each column as wide as its longest
  line, the gaps 40px at 1101px growing to 136px (owner, 2026-11-10); five in a row from 1101px, three below, two on
  phones. Owner, 2026-11-10: the footer has no wordmark, language switch or CHECK AVAILABILITY any more — the
  symbol below is its one mark, and the header (on phones the reserve bar at the foot) always offers the language and
  the booking.

## Mechanics

`src/lib/pr/interactions.js` is the frozen edition's controller (menu, gallery dialog, toasts, view transitions,
no text selection) with these additions.

- **Clips** (`setupClips`, `syncClip`). Every `video[data-loop]` is muted and plays while at least a fifth of it is on
  the screen, the tab is visible and reduced motion is off; otherwise it pauses. Clips further down the page start
  loading a screen and a half before they arrive (`preload` switches to `auto`). Each clip sits over its first frame
  (`img[data-clip-frame]`), so the picture is there before the clip moves. The opening clip gets a pause button
  (`.pr-film-toggle`, bottom right, `aria-pressed`, "Pause the video" / "Play the video").
- **Pictures settle** (`setupSettle`, `updateSettle`, Four Seasons). Every picture outside the opening (except maps,
  logos and carousel slides) starts at 110% and settles to 100% over the first three quarters of the screen as it
  comes up: `--z` from 1.1 to 1.0, applied as `transform: scale(var(--z))` inside the picture's frame.
- **Opening fade** (Four Seasons). `--hero-p` runs from 0 to 1 as the page scrolls past the opening: the picture grows
  by 6%, the darkening eases off by 60%, the words rise 40 px and fade.
- **Opening words.** On arrival the eyebrow, title, line and buttons rise 18 px and fade in, 0.12 s apart.
- **Carousel** (`setupCarousels`). A gallery section with at least three of the page's photographs becomes the
  centre-focus carousel: a scroll-snapping track, arrows and arrow keys move one slide and centre it, the progress line
  shows the position, the middle slide starts centred.
- **Small pictures in callouts** (`markGraphics`). A callout picture narrower than 900 px (the Vessyl mark, the
  founder's square portrait) would be enlarged and cut if it filled the panel: it stands whole (`object-fit: contain`)
  on the green, to the right of the text, centred on phones. Owner, 2026-11-10: the picture used to fill the whole panel,
  drawn small at its right edge, with the words at the left edge, so the two stood far apart and off the middle. From
  900 px the panel is now a grid of two columns — the words at most 440 px, the picture at most 420 px, a gap of
  `clamp(48px, 5vw, 96px)` — centred as one pair (`sections.css`, "A callout with a graphic"). Four callouts carry a
  graphic: the founder on Home, The Harmonic Hearth and The Recording Studio, and the Vessyl mark on The Frequency
  Experience. The other nine are photographs across the panel with the words on their darkened left, as before.
- **Header and booking**: as above.
- **Hover.** Card titles draw an underline from the left; buttons fill with black or green; colours ease over 0.3 s.
- **Reduced motion.** No clip plays, nothing settles, the opening does not fade, the words do not rise, carousels
  move without animation.

One scroll listener drives settling, the opening fade and the header on one animation frame.

## Spanish

Every page also exists in Latin American Spanish under `/figma-pr/es/` (owner, 2026-11-10). The dictionary is
`src/lib/pr/content/es.json`, the helpers `src/lib/pr/i18n.ts`; EN | ES in the utility row and the globe in the menu
switch to the same page in the other language, and the utility row's 2px rule marks the current
language. The booking bar speaks Spanish ("Entrada", "Salida", "Huéspedes", "2 adultos") and opens Orbe's Spanish
results. How it works, the translation and the checks: `docs/figma-spanish.md`.

## Opening mark

`src/lib/pr/components/Intro.svelte`, `src/lib/pr/styles/motion.css`, `interactions.js` (owner, 2026-11-10): the
Vessyl symbol in black builds from the bottom up and the word appears, on the PR paper, as Figma Enhanced and Blueprint
open. It plays on every load of a page, a reload included, and with reduced motion too; a change of language does not
reload the page, so it never shows the mark ("Language" below).

Owner, 2026-11-10: the site warms up under the mark, and the mark leaves after the full load. It waits for the fonts,
the window's `load`, the first picture decoded and the warm-up (`warmSite`): the mega panels' pictures, now light copies
(`public/media/pr-thumbs/`, the short side 640px, 1.4 MB for the ten photographs instead of about 9 MB at full size;
`megaPhoto` in `site.ts`), loaded and decoded where the header shows the panels (before, they loaded when a panel
opened). Never before 2.1s, in any case by 6s. Past 2.1s, while the warm-up runs, the mark breathes very slowly and
softly — 400ms to 30% and 400ms back (`html[data-intro="waiting"]`) — and when everything is ready the breath it is in
runs to its end, where the mark is whole, and the sheet leaves from there (`leaveIntro`), fading away over 1.2s (it was
0.8s with a blur). A head script lifts it at 3.6s only if the page script never came. Measured with the cache off: at
4 Mbit/s Villas waits from 3.2s, breathes, reaches the 6s limit and leaves with the mark whole.

## Language

Owner, 2026-11-10: EN | ES changes the page's text smoothly, with no reload and no opening mark. The links in the
utility row and the menu navigate inside the site with `data-sveltekit-reset="false"` (the scroll and the focus stay).
The page's own words are rebuilt (`{#key data.locale}` in `[...slug]/+page.svelte`); the header, the menu and the footer
change theirs in place. The block at the top of the screen keeps its exact place (`+layout.svelte`, `keepPlace`,
`returnToPlace`), an open menu stays open, the pictures on screen are decoded first (at most 350ms), and the page in the
new language fades in over the old one for 700ms (`motion.css`, `data-vt="lang"`), so the words crossfade while the
pictures stand still. Checked in Chrome, WebKit and Firefox, from the utility row and from the menu, at the top of a
page and halfway down.

## The Dome photograph on Home

Both of Home's overlays (the opening of "Take the whole property" and the Dome panel) use Figma Enhanced's levelled copy
of the Dome photograph (`public/enhanced/photos/dome-level-*.webp`, owner, 2026-11-10): turned 1° back, cut so that
the Dome stands in the middle of the screen, anchored to its top so the crown stays on wide screens.

## Fonts licensing

Archivo, Libre Caslon Display and Newsreader are under the SIL Open Font License 1.1 and served from the site
(`src/lib/pr/fonts/`, Latin subsets as woff2). The references' own fonts (Engravers Gothic, Austin, Monotype Garamond,
Neue Helvetica) are commercial and are not used.

## Checks

- Texts: every visible text of the 28 frames and the shell is on its page, the same as in the frozen edition
  (`node scripts/check.mjs` and a frame-by-frame comparison with the 2026-11-10 bank dumps).
- Layout: 28 pages × 69 widths (360–2560) in Chromium, WebKit and Firefox: nothing outside the screen, no clipped or
  overlapping text.
- Accessibility: axe (WCAG 2.2 AA) on all 28 pages at 1440, 768 and 375.
- Interactions: opening clip plays and pauses, the header sticks, pictures settle, mega panels open with their
  pictures, the booking bar opens Orbe's results, the menu opens, the carousel moves.
- Header, menu and booking bar of 2026-11-10, in English and Spanish: in Chromium, WebKit and Firefox the utility row
  leaves on scrolling down and returns after 20 px up, the small wordmark and MENU trade places without overlapping the
  navigation at 900–2560 px, the bar unrolls and rolls back, the calendar takes both dates in two clicks and closes,
  CHECK RATES fills Orbe's address, Escape returns the focus to the reserve button, the menu opens with the focus on
  the close button; on a phone the sheet and the calendar rise above the reserve bar. axe: no violations with the
  header collapsed, the bar open, the calendar open and the menu open, at 1440, 1024 and 375. Layout: no issue the
  pages did not have before, in the three engines.
