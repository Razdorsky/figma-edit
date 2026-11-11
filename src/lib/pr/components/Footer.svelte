<script lang="ts">
  // Figma PR footer (docs/figma-pr-system.md, "Footer"): Rosewood's footer — the frame's five columns, centred, capital
  // headings over serif links, the Vessyl symbol in the middle, a small capital legal line and the green band at the
  // foot. Owner, 2026-11-10: no wordmark, language switch or CHECK AVAILABILITY here — the symbol below is the footer's
  // one mark, and the header (on phones the reserve bar) always offers the other two.
  import { pages, route } from '#lib/pr/site.ts';
  import { tr, msg, type Locale } from '#lib/pr/i18n.ts';
  import symbol from '#lib/pr/assets/symbol.svg?raw';

  type Props = {
    edition: 'figma-pr';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
    locale?: Locale;
  };

  let { edition, base = '', locale = 'en' }: Props = $props();

  // Footer labels from the frames; the designer's pages 14–18 supply five of the six destinations.
  const propertyLinks: [string, string | null][] = [
    [msg('The Dome'), 'the-frequency-dome'],
    [msg('The Hearth'), 'the-harmonic-hearth'],
    [msg('Sound and movement'), 'sound-and-movement'],
    [msg('Horses and land'), 'horses-and-the-land'],
    [msg('The studio'), 'the-recording-studio'],
    [msg('The gallery'), null]
  ];
  // The frames' footer writes one page name differently from the page itself.
  const footerNames: Record<string, string> = { 'rates-and-offers': msg('Rates and Offers') };
  // The designer's pages 27–28 supply the first two destinations.
  const visitLinks: [string, string | null][] = [
    [msg('Getting here'), 'getting-here'],
    [msg('Things to do in Arenal'), 'things-to-do-around-here'],
    [msg('When to visit'), null],
    [msg('FAQ'), null],
    [msg('Policies'), null]
  ];
  // The designer's contact lines, and the brief's reservations address, which the designer did not fill in, as the brief's
  // placeholder (docs/figma-edit.md).
  const contactLinks = [msg('WhatsApp Contact'), msg('Phone Contact'), msg('[Reservations email]'), msg('Address Info')];
</script>

{#snippet pending(label: string)}
  <button type="button" data-pending-link={label}>{tr(locale, label)}</button>
{/snippet}

<footer class="site-footer pr-footer">
  <div class="footer-inner">
    <div class="footer-columns">
      <section class="footer-group">
        <h2><a href={route(edition, 'where-you-sleep', base, locale)}>{tr(locale, 'Stay')}</a></h2>
        {#each pages.slice(2, 6) as item (item.index)}
          <a href={route(edition, item.slug, base, locale)}>{tr(locale, footerNames[item.slug] ?? item.name)}</a>
        {/each}
      </section>
      <section class="footer-group">
        <h2><a href={route(edition, 'experiences', base, locale)}>{tr(locale, 'Experiences')}</a></h2>
        {#each pages.slice(7, 13) as item (item.index)}
          <a href={route(edition, item.slug, base, locale)}>{tr(locale, item.name)}</a>
        {/each}
        <a href={route(edition, 'the-frequency-dome', base, locale)}>{tr(locale, 'The Dome')}</a>
      </section>
      <section class="footer-group">
        <h2>{tr(locale, 'The Property')}</h2>
        {#each propertyLinks as [label, slug] (label)}{#if slug}<a href={route(edition, slug, base, locale)}>{tr(locale, label)}</a>{:else}{@render pending(label)}{/if}{/each}
      </section>
      <section class="footer-group">
        <h2><a href={route(edition, 'arenal', base, locale)}>{tr(locale, 'Plan your visit')}</a></h2>
        {#each visitLinks as [label, slug] (label)}{#if slug}<a href={route(edition, slug, base, locale)}>{tr(locale, label)}</a>{:else}{@render pending(label)}{/if}{/each}
      </section>
      <section class="footer-group">
        <h2>{tr(locale, 'Contact')}</h2>
        {#each contactLinks as label (label)}{@render pending(label)}{/each}
      </section>
    </div>
    <div class="footer-bottom">
      <span class="pr-symbol" aria-hidden="true">{@html symbol}</span>
      <p>©The Vessyl 2026 • La Fortuna, Costa Rica</p>
      <p>{@render pending(msg('Privacy'))} • {@render pending(msg('Terms & Conditions'))}</p>
    </div>
  </div>
  <div class="pr-footer-band" aria-hidden="true"></div>
</footer>
