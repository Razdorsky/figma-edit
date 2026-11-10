# Interactive Prototype — the one-scene concept, as an edition of its own

The owner, 2026-11-10: there is an interactive prototype of the site, a very early one. It becomes part of this repository and of the same workflow as Figma Enhanced and Figma PR, and it will be developed here.

This document describes the edition as it was brought in (step 0, the baseline): what the concept is, every mechanic, what the port changed, and what the prototype itself leaves open. A new or changed mechanic is described here in the same commit.

- Address: `/interactive-prototype/` (local preview: http://127.0.0.1:4180/interactive-prototype/).
- Files: `src/lib/interactive/`, `src/routes/interactive-prototype/`, photographs in `public/interactive/img/`.
- English only. Not published.

## Where it came from

The prototype arrived as a folder named `Vessyl-concept`: one `index.html` of 1,408 lines with its styles and script inside, fifteen photographs, two logos and three font files. No build, no libraries. The archive is kept outside Git in the raw-source bank, `marketing-site/current-website/2026-11-10-interactive-prototype/`, with the owner's messages.

The owner also gave a link to the prototype published as a Claude artifact. It is the same prototype, live, not a written description: there is no text about the concept behind it. It was walked through on screen on 2026-11-10 (see Checks); its source could not be read, so it was not compared with the archive line by line.

Everything below is taken from the archive's code and from the screen.

## What the concept is

The other editions are the designer's 28 pages in different visual systems. The prototype proposes another way to build the site.

1. **One scene instead of pages.** The whole site is one story that scrolling moves through eleven chapters. There are no blocks: one full-screen photograph flows into the next while the text of a chapter passes over it.
2. **The site as a list of what can be bought.** Copper means one thing: this can be bought. Every item carries one of three states: bought, included, or on request. One list gathers everything sold on the property, and one panel takes a booking for a room, an experience or a table.
3. **"You do not have to stay here to come here."** The guest who comes for a few hours stands next to the guest who stays the night, in the scenes and in the booking panel ("Two ways in").
4. **A rail instead of a menu.** Five sections stay on the left. The current one lights up and opens its sub-items as the story moves.
5. **A gate.** The site opens on a black screen. Holding for a second and a half brings up light and sound; scrolling enters in silence.
6. **Inner pages as layers.** A page rises over the story and goes back down to the same place.

The headings and the introductory texts are the designer's, the same as in the Figma edition. The selling lines are new ("No rose petals", "we reply with a quote, not a brochure", "no cut taken").

## Files

| What | Where |
|---|---|
| Shell: styles in order, document attributes | `src/routes/interactive-prototype/+layout.svelte` |
| The page: the order of scenes and layers, the engine's start | `src/routes/interactive-prototype/[...slug]/+page.svelte`, `+page.ts` |
| The engine | `src/lib/interactive/interactions.js` |
| The eleven scenes | `src/lib/interactive/scenes/` |
| Chrome, rail, footer, full list, booking panel, inner page, gate, logos | `src/lib/interactive/components/` |
| Styles | `src/lib/interactive/styles/` |
| Typefaces | `src/lib/interactive/fonts/` |
| Page list, canvas colour, photograph addresses | `src/lib/interactive/site.ts`, `site-data.json` |
| Photographs | `public/interactive/img/` |

The engine finds everything by the prototype's ids and classes (`L1`…`L11`, `rail`, `units`, `exps`, `panel`, `page`, `all`, `gate`). The markup in the components keeps them.

The eight style files are the prototype's one stylesheet cut at its own section marks. Their order in the layout is the prototype's order: `base`, `story`, `shell`, `scenes`, `gate`, `booking`, `page`, `footer`. Keep it.

## Mechanics

### The gate

A black layer over everything (`#gate`). The vertical logo fades in after 0.16 s, a copper line grows to 240 px after 0.82 s, and the ring with its captions appears after 1.7 s.

- **Hold.** Pressing anywhere on the gate, except on "scroll to enter without sound", turns the sound on and starts the hold. The ring fills by time, 1.5 s to the end. While it fills, a warm glow (`.halo`) rises over the first photograph and the photograph brightens. Letting go early lets the ring fall back. At the end the gate fades for a second, a cream flash (`#flash`) rises to 42% and fades over 1.6 s, and the glow dies away slowly.
- **Scroll.** A wheel or touch movement, the keys Space, Enter, Arrow Down and Page Down, or the link under the ring open the site in silence.
- **After the gate** the chrome arrives in turn: the headline's lines rise one after another, then the logo, the chapter label and the top-right controls, then the rail's five items from the left, then the buttons under the headline, the ticks and "What you can book".

### The one scene and its timeline

`#story` is twenty screens tall; `#world` inside it stays on screen (`position:sticky`). Scroll progress through the story is a number `T` from 0 to 1. Each frame `T` moves 13% of the way to its target, so the story follows the scroll softly; with reduced motion it follows at once.

Each scene has a window on `T`. Neighbouring windows overlap, so two scenes are on screen together at a joint and no border shows.

| Scene | Layer | Window | Chapter label | Rail section |
|---|---|---|---|---|
| Threshold | `L1` | 0.000–0.088 | 01 · Threshold | none |
| Place | `L2` | 0.070–0.152 | 02 · The place | none |
| Dome | `L3` | 0.135–0.232 | 03 · The Dome | none |
| Stay | `L4` | 0.215–0.342 | 04 · Stay | Stay |
| Experiences | `L5` | 0.322–0.468 | 05 · Experiences | Experiences |
| Sound | `L6` | 0.448–0.552 | 06 · Sound and movement | The Property |
| Studio | `L11` | 0.534–0.628 | 07 · The studio | The Property |
| Table | `L7` | 0.610–0.702 | 08 · The table | The Property |
| WholeProperty | `L8` | 0.684–0.778 | 09 · The whole property | The whole property |
| PlanVisit | `L9` | 0.760–0.850 | 10 · Plan your visit | Plan Your Visit |
| Everything | `L10` | 0.832–1.000 | 11 · What you can book | none |

Inside its window a scene does four things.

- **Visibility.** It fades in over the first 16% of the window and out over the last 16%. The curve is the square root of an ease, so that the brightness of two overlapping scenes adds up to about one. The first scene is already in place at the top of the page. A scene answers the pointer only while it is more than half visible (`.live`).
- **Photograph.** The picture (`.lbg`) comes in at 1.14 of its size, settles to 1, and grows again as it leaves. It drifts 110 px upwards through the window.
- **Text.** The column (`.lc`) travels 150 px upwards, faster than the picture, arrives a little later and leaves earlier.
- **Pointer.** The picture shifts against the pointer, at most 17 px to either side and 11 px up or down, and the text shifts up to 4.5 px with it. Both follow softly.

Every photograph is dimmed to 66% and lies under three shades: a vignette, a darkening at the top and bottom, and a dark column on the left under the text.

### Chapter label, ticks and thread

- The label under the logo names the most visible scene. The old text leaves upwards and the new one rises from below.
- Ten ticks at the bottom right; the tick of the current scene is long and copper.
- A copper thread on the left grows with the story, sways a few pixels, and is brightest in the middle of it.

### The rail

Five sections on the left, centred on the screen's height: Stay, Experiences, The Property, The whole property, Plan Your Visit.

- The section of the current scene is larger, copper and marked with a tick, and its sub-items are open. Pointing at any section opens its sub-items too.
- One sub-item is copper: the page in focus. In Stay and Experiences it is the item chosen with the cursor. In the Property scenes it is Sound and movement, The studio or The table. In Plan Your Visit it is Getting here.
- Clicking a section scrolls smoothly to its scene. Clicking a sub-item opens its inner page.
- "What you can book" under the sections opens the full list.
- When the footer comes up, the rail rises to stay above it, and fades when there is no room left.
- At 980 px and narrower the rail is hidden and the text column takes the full width.

### The Place scene

The introduction lights up sentence by sentence as the scene passes. Three numbers (118 acres, 14 units, 1 dome) count up once, over 1.1 s.

### Lists chosen with the cursor

Stay lists three kinds of unit and Experiences six things to book. Both work the same way.

- The row nearest the pointer's height is the active one. Before the pointer has moved, a point that slides down the list with the scroll chooses instead.
- Rows near the active one are brighter, shifted to the right and larger. The active row opens its one-line description and its price turns copper.
- The photograph behind changes with the active row, wiped in over a second: sideways in Stay, upwards in Experiences.
- While the pointer is over the rail, the lists freeze, so that they do not argue with the menu.

### Three states

One language for everything that is sold, used in the scenes and in the full list.

| State | Marker | Examples |
|---|---|---|
| Bought | filled copper dot | "five offers", "reserve a table", "book with your room" |
| Included | hollow dot | "included in every rate", "included for guests", "we book it for you" |
| On request | no dot, italic | "booked by email, not by form", "we reply with a quote, not a brochure" |

The rules behind it are written in the styles: copper is kept for what can be bought; what can be clicked is underlined, not coloured, because colour is taken by the price; each scene has one filled button; text has four volumes, each with a measured contrast.

### "What you can book here"

A full-screen list that comes down from the top. Seven groups and 26 rows: Stay, Experiences, Sessions on the property, The table, Getting here, The studio, The whole property. The last two are on request. Each row opens its inner page. It is opened from the rail, from the first scene and from the last.

### The booking panel

A drawer on the right over a blurred veil, titled "Two ways in", with three tabs: Stay, Experiences, Table. Each tab shows fields, the options with their prices and one button. The header's "Book" opens Stay; the scenes' buttons open the tab they belong to. It closes with ×, a click on the veil, or Escape.

### Inner pages

A full-screen page that rises from below: a photograph, a title, a paragraph, four facts and one button. The engine fills it from a table. Seven pages are written: the Dome, the Day and the Half Day, the table, the Frequency Experience, the Villas, the studio, Horses and the River. The other eighteen keys open the same page as an outline. Back, Escape or the veil send it down again.

### Sound

Made in the browser (Web Audio), nothing is downloaded. Three sine voices hold a chord in F major and glide to the next one every 14 s (F, Dm, B♭, C). Over them a single note from the F major pentatonic sounds every five to eight seconds, with a pure fifth above it, and moves by step. Everything passes a high-pass at 62 Hz and a low-pass at 1100 Hz; the volume breathes very slowly. Only the SOUND button and the hold at the gate start it.

### Footer

Five columns of links, the newsletter line "Three or four emails a year", and the copyright line. Links to pages open the inner page. FAQ, Policies, the contact links and the newsletter field are the prototype's placeholders.

### Type

Headings in EB Garamond (medium and bold), text in Roboto at weight 300, small labels in upper case with wide spacing. One radius of 12 px on buttons and 8 px on fields.

## What the port changed

The edition renders as the prototype does. At 1440×900, in all eleven scenes and in the footer, 650 elements of the two were compared: positions and sizes agree within a quarter of a pixel, and the computed styles agree in every property. The only differences are notations the build rewrites without changing the result (`to right` as `90deg`, `background:none` as a zero position, the tokens' colours as hex).

- **One file became components.** The markup is the prototype's, cut into scenes and components. The comments were translated into English.
- **Photographs** live in `public/interactive/img/` and are addressed through `photo()` in `site.ts`, so that they follow the site's base path.
- **Typefaces** are the prototype's three files, served locally. Its link to Google Fonts, a fallback for opening the file from disk, is dropped; the text measures the same without it.
- **Shell.** The logo, chapter label and top-right controls are wrapped in `<header class="site-header">`, the story in `<main id="content">`, and the footer has the class `site-footer`: `scripts/check.mjs` looks for them. The page has a description and a theme colour.
- **The engine starts when the page is mounted and can stop.** `installStory()` returns a function that removes the listeners, stops both loops and the sound's timers, and closes the audio.
- **Clicks are caught in the capture phase.** A footer link is `#`. The site's router sees clicks first and, from the second such click on, would scroll the story to its top behind the page that opens.
- **A window without height no longer blackens the scene.** Progress was 0/0 there, the value stuck, and every scene stayed hidden until a reload. The story now waits at its start.
- **`body>div{overflow-wrap:normal}`** in `base.css`. The site's shell wraps the page in one more `div`, and the prototype's wrap rule would reach through it to the rail, the footer and the booking panel.
- **Logos** take their colour from a `fill` attribute instead of a class in an inline style.

Left out, because nothing used it:

- the styles of an earlier version: `.holdui`, `.idx`, `.idxhint`, `.moment`;
- in the script: `boot()` (an opening with a curtain, never called), `moments`, the listener for `#hint`, and a second click handler on the unit rows, whose result the common handler replaced in the same click.

Kept but not in force: the block at the end of the prototype's stylesheet (see the first open point). It is in `styles/footer.css` as a comment.

## Open points

These are the prototype's own. The baseline keeps them as they are; each is a candidate for a step.

**Layout**

- **Phones and tablets.** The prototype's last style block (reduced motion, 1100 px, 860 px) sat behind a comment that was never closed, so none of it applies. At 980 px and narrower the rail is hidden and nothing replaces it. On a phone the logo and the top-right controls overlap, and the headline stays at 60 px.
- **Short windows.** The rail is centred on the screen's height and grows with its open section. With Experiences or The Property open it is 546 px tall, so in a window shorter than about 740 px it runs under the chapter label and the logo (at 700 px it starts 77 px from the top; the label ends at 96 px). With two six-item sections open at once, while one closes and the next opens or while the pointer holds another one open, it is 779 px tall and reaches the logo in any window shorter than about 970 px.
- **Reduced motion.** Only the timeline's easing respects it.
- The shared shell's viewport has no `viewport-fit=cover`, so the prototype's safe-area insets are zero.

**Content**

- `EN | ES` does nothing. There is no Spanish.
- Eighteen of the 25 inner pages are outlines. Every inner page's button reads "Book a Dome session".
- Rates, prices and numbers are the designer's placeholders (`[rate]`, `[price]`, `[x]`).
- Footer placeholders: FAQ, Policies, contacts, the newsletter field.
- There is no video.

**Booking**

- The fields are drawn, not live, and the three buttons do nothing. There is no hand-off to the booking partner.
- "Write about the studio" and "Send an enquiry" open the Experiences tab.

**Details**

- The rail's current section is copper, while the prototype's own rule keeps copper for what can be bought.
- The first photograph is not dimmed like the others: the light of the gate sets its filter on every frame. The contrast the text scale counts on is not guaranteed there.
- The gate's ring is about a fifth full before anyone holds: its length is 270 and the script counts from 220.
- A press on the gate too short to open it still turns the sound on: it plays behind the closed gate, and it stays on if the reader then enters by scrolling, the way that is labelled "without sound".
- Eleven scenes, ten ticks: the last scene lights none.
- The introduction of the Place scene is written by the script, so it is not in the page's HTML.
- Inner pages, the list and the panel have no addresses: a link cannot point at them, and the browser's Back does not close them.

**Speed and access**

- All nineteen pictures (4.6 MB of JPEG, fifteen files) load at once, in one size.
- Two animation loops run all the time.
- The layers are not dialogs: focus is not moved or held, and the rows of the full list cannot be reached from the keyboard. The logos have no text alternative.

## Checks (2026-11-10)

- `npm run check`: 205 routes, types, the frozen Figma edition and the Spanish dictionaries pass.
- The 56 pages of `/figma/` are the same before and after, apart from the hashed file names and the build number.
- The edition against the prototype, side by side in one browser at 1440×900: the comparison above; the same chapter label and the same active classes in every scene; the same result for the booking panel and its tabs, the full list, a written inner page and an outline, Escape, the veil, the sound button, three footer links in a row, and a rail click.
- The gate's hold opens the site with the sound on.
- The published artifact, on screen at 1440×900: the gate, all eleven scenes and the footer show the same chapter labels, texts, photographs, rail and controls as the edition; the ring is part-filled at rest in both, and a short press leaves the gate closed in both. This is a comparison by eye, not of code.
- `npm run build:pages -- interactive-prototype` builds a 10 MB artifact in which every reference resolves.
- Not checked: Safari and Firefox, and the sound by ear.

## Publication

Not published. Like the other editions it would be a repository of its own, `Razdorsky/interactive-prototype`, served at `https://razdorsky.github.io/interactive-prototype/`; `scripts/build-pages.mjs` already prepares its artifact, with `_app`, `brand` and `interactive` only. Create the repository and push only when the owner asks.
