# Figma Edit

`/figma-edit/` (owner, 2026-11-11) is a copy of the frozen Figma edition brought in line with the agency's content
brief, *The Vessyl — website content, ready to paste* (Wunderlich Kaplan Communications, 3 October 2026), without
changing the design or the order of the blocks. The frozen `/figma/` stays exactly as it is.

## The copy

An exact copy of `/figma/` at 09c10b0 (the published Figma edition), with its own files, importing nothing from the
Figma edition's sources:

- `src/lib/edit/`: `pages/` (P01–P28), `components/` (Header, Footer, Menu, Gallery, Newsletter), `site.ts`,
  `site-data.json`, `media.json` (from `src/data/media.json`), `i18n.ts` and `content/es.json` (the Spanish dictionary),
  `interactions.js`;
- `src/lib/edit/styles/`: `shared.css` and `edit.css`, copies of `src/shared.css` and `src/figma.css` with every
  `body[data-edition="figma"]` selector written for `figma-edit` (672 selectors); `fonts/` and `patterns/` are copies
  of the files those styles load from `src/assets/`;
- `src/routes/figma-edit/`: the shell and the page route, in English and under `es/` in Spanish.

Wiring: `src/hooks.server.ts` (the edition's page list, canvas and language in the prerendered page),
`scripts/write-route-index.mjs`, `scripts/check.mjs` (route count), `scripts/spanish-strings.mjs` (its dictionary),
`scripts/build-pages.mjs` (`node scripts/build-pages.mjs figma-edit`). `src/hooks.server.ts` is on the Figma freeze
list, so its fingerprint in `scripts/figma-freeze.json` was refreshed; that change does not touch `/figma/`'s output.

Checked once against `/figma/`: the same markup on all 56 pages (both languages, edition names and build hashes aside)
and the same pixels on full-page screenshots at 1440 and 390 px.

## Corrections from the content brief (step 1)

Only what the words, links and metadata can fix: no block is added, removed or moved, no style changes. Each item is
an English change in `src/lib/edit/` and its Spanish in `content/es.json` (es-LA, the Figma edition's dictionary as
glossary: `tú`, placeholders in Spanish, the property's names in English).

**Every page**
- Title tag and meta description from the brief's table (`meta.ts`, used by `routes/figma-edit/[...slug]/+page.svelte`),
  in place of "Page — The Vessyl" and one templated description.
- The brief's addresses: `/stay/`, `/stay/villas/`, `/stay/treehouse/`, `/stay/glamping/`, `/offers/`,
  `/experiences/day-pass/`, `/experiences/couples/`, `/experiences/horseback-river-ride/`, `/vessyl-presents/`,
  `/frequency-dome/`, `/harmonic-hearth/`, `/recording-studio/`, `/dining/`, `/dining/el-rancho/`, `/dining/moloka/`,
  `/buyouts/`, `/groups/`, `/arenal/getting-here/`, `/arenal/things-to-do/`; the other nine kept their names
  (`site-data.json`, the page links and the components' routes). Spanish under `/figma-edit/es/…` the same way.
- The logo is "The Vessyl" (alt text, and "The Vessyl home" for its link).
- Newsletter: the button "Keep me posted" (Spanish "Avísenme", short enough for the phone layout).
- Footer: The Dome added to Experiences ("all six, and the Dome"); in Contact, the brief's reservations address added in
  the designer's style, "Reservations Email", beside the designer's WhatsApp Contact, Phone Contact and Address Info.

**Pages**
- Home: the Dome block's first button is "Book the Frequency Experience" and leads to that page.
- The Villas, The Treehouse, Glamping Tents: the other rooms' cards show "From [rate] a night"; "See the villa" leads
  to the villas. The treehouse's and the tents' placeholder facts follow their own text in the brief (sleeps [x]; view,
  outdoor and climate placeholders); what the designer filled in (wifi "Throughout", the rate line, minimum stay,
  children, pets) stays.
- Rates and offers: Stay longer with both offers (four and seven nights), Green season "[offer]", Couples and
  Last-minute as "[Offer]" with the brief's line under each.
- Experiences: each card with its length and price from the brief.
- The Day and the Half Day: the full day's card shows "[Price]".
- For Two: the brief's hours and days at the head of the price line ("[x] hours, starting at [time]. [Days available.]
  Dinner, the session and [inclusions] are included.", the brief's own sentence), the heading without its stray comma.
- Horses and the River: "Minimum age [x]" at the end of the closing line (there is no fact tile for it).
- The Harmonic Hearth: "The Hearth" in place of "The temazcal"; "3. Sound" and "4. The HydroChallenge".
- Sound and movement: "Private movement or breath session".
- Moloka: the other room's first button "See El Rancho", leading there.
- Retreats: the placeholder button next to the enquiry is "Download the retreat pack" (no pack yet, so no link).
- Arenal: "What is on this page" with the brief's line under it (in place of the Rates paragraph); Liberia and San José
  in hours.
- Getting here: San José by road and its transfer price; the transfer's own line "Up to [x] people. Book it with your
  room."

**Found in the review of step 1** (2026-11-11, the same rules):
- Newsletter: the email field shows a conventional example, "you@example.com" (Spanish "nombre@ejemplo.com"), in place of
  the frames' "ronnie@aave.com".
- The Day and the Half Day: the prices are a person ("Half day [price] a person – Full day [price] a person", and
  "[Price] a person" on both cards).
- The Frequency Experience: "[x] people at a time, no more" and "[x] minutes of tea, which most people use".
- El Rancho: "El Rancho takes outside reservations for dinner." in the outside reservations line.

The review compared every visible line, link and alt text of all 28 pages, in both languages, between `/figma/` and
`/figma-edit/` (every difference is one of the changes above), compared `/figma-edit/` with the brief again, and
checked each page's title, description and address against the brief's table (all 28 match).

**Canonical, not changed to the brief** (owner, 2026-11-11): the footer's line stays "© The Vessyl 2026 • La Fortuna,
Costa Rica", as in the frames. The brief describes it as "The Vessyl, Arenal, Costa Rica"; the review briefly changed it
to Arenal, and it was put back on the owner's word.

**Finished values are kept** (owner, 2026-11-11): the brief's square brackets mark facts nobody has confirmed (prices,
numbers, hours, terms); they replace what the design states as a fact, not a finished value the designer already put in.
So the email field keeps an example address rather than "[Email address]", and the Home quote stays as the designer
wrote it (Robert Patterson, Journalist), as in `/figma/`.

**Which words win** (owner, 2026-11-11): the brief's text takes priority over the designer's text, but what the designer
put in place of a placeholder takes priority over the brief's empty square brackets. So:
- the designer's fills of the brief's brackets stay: the email field's example, the bathrooms "Private, indoors" on Where
  you sleep, wifi "Throughout" on the treehouse and tents pages, For Two's "Dusk — You arrive as the light goes" and
  "Dinner is included"; facts among them (the bathrooms, the wifi, arrival at dusk) are for the property to confirm;
- the brief's text replaces the designer's where both have one: the treehouse's and the tents' rate lines ("[x] night
  minimum. Breakfast included." and "Breakfast included."), the treehouse's minimum stay "[x] nights", For Two's Dome
  fact "A private session in the Dome, just the two of you and whoever is running it.", and the replacements listed
  above (the Dome button, the Hearth's labels, the newsletter button, the logo);
- the designer's own words where the brief has none stay (labels, headings, the newsletter's "Best time to visit us",
  the footer's WhatsApp Contact, Phone Contact and Address Info, the Home quote, "and it can be tracked in" on the studio
  page, which the brief's own description supports);
- what neither filled in is the brief's placeholder: the reservations email in the footer, "[Reservations email]".

One exception, decided by the owner (2026-11-11): on Groups and offsites the brief says "Minimums as above", which on
the website points at nothing (the minimums are on the Retreats page); the designer's "Minimums as for buyouts" stays.

**Not done in this step** (they need graphics, new blocks or pages, or data): the hero video on Home; the nine missing
pages (When to come, About, Josh Stanley, The people here, Press, Gallery, FAQ, Contact, Policies) and so the links to
them; the extra booking buttons (footer, Rates and offers); "Who has worked here" on the studio page; the two missing
buyout items; links for the booking, enquiry and email buttons and for the press logos, which need addresses.

## Carried over to Figma Enhanced and Figma PR (owner, 2026-11-11)

The corrections above, with their Spanish, are in Figma Enhanced and Figma PR too (`docs/figma-enhanced-booking.md` and
`docs/figma-pr-system.md`, "Content from the agency's brief"). Those editions keep their own page addresses.

