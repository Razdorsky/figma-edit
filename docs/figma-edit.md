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
