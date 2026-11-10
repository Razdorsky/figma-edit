<script lang="ts">
  // Figma PR header (docs/figma-pr-system.md, "Header"): Rosewood's tiers on paper — a utility row with the wordmark in
  // the middle and EN | ES on the right, then the navigation row that sticks, ending in the green reserve button. The
  // utility row leaves when the page scrolls down and comes back as soon as it scrolls up (interactions.js); while it is
  // away, the small wordmark opens the navigation row and MENU moves aside for it. The words are the frame's header and
  // menu words. The booking panel is Four Seasons' booking bar: dates and guests open Orbe's results.
  import { pages, photo, route } from '#lib/pr/site.ts';
  import Booking from '#lib/pr/components/Booking.svelte';
  import { tr, msg, other, type Locale } from '#lib/pr/i18n.ts';

  type Props = {
    edition: 'figma-pr';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
    locale?: Locale;
  };

  let { edition, page, base = '', locale = 'en' }: Props = $props();

  function asset(path: string) {
    if (/^(?:https?:)?\/\//.test(path)) return path;
    return `${base.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;
  }
  // The booking bar (Booking.svelte) unrolls under the header; the green reserve button opens and closes it.
  let bookingOpen = $state(false);
  let reserve: HTMLButtonElement | undefined = $state();
  // The frame's two menus: Stay (pages 2–6) and Experiences (pages 7–13).
  const groups = [
    { id: 'stay', title: msg('Stay'), list: pages.slice(1, 6) },
    { id: 'experiences', title: msg('Experiences'), list: [pages[6], ...pages.slice(7, 13)] }
  ];
</script>

<header class="site-header pr-header" data-pr-header>
  <div class="pr-utility">
    <a class="pr-brand" href={route(edition, '', base, locale)} aria-label={tr(locale, 'Vessyl home')}>
      <img src={asset('/brand/logo-dark.svg')} width="210" height="39" alt="VESSYL" />
    </a>
    <!-- The designer's EN | ES, on the right as in the frame's header: a link to this page in the other language; the
         current one is underlined (docs/figma-spanish.md). -->
    <a class="pr-utility-link pr-utility-lang language-trigger" data-language-trigger data-sveltekit-reload href={route(edition, page.slug, base, other(locale))} hreflang={other(locale)} aria-label={tr(locale, 'Language: English. Switch to Spanish')}><span><span data-lang-current={locale === 'en' || undefined}>EN</span> | <span data-lang-current={locale === 'es' || undefined}>ES</span></span></a>
  </div>
  <div class="pr-nav-row">
    <a class="pr-brand pr-brand-compact" href={route(edition, '', base, locale)} aria-label={tr(locale, 'Vessyl home')}>
      <img src={asset('/brand/logo-dark.svg')} width="150" height="28" alt="VESSYL" />
    </a>
    <button type="button" class="pr-menu-toggle menu-toggle" data-menu-open aria-expanded="false" aria-haspopup="dialog" aria-controls="site-menu">
      <span class="menu-lines" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="pr-menu-label">{tr(locale, 'MENU')}</span>
    </button>
    <nav class="pr-nav" aria-label={tr(locale, 'Main navigation')}>
      {#each groups as group (group.id)}
        <details class="nav-group pr-nav-group" ontoggle={event => { if ((event.currentTarget as HTMLDetailsElement).open) bookingOpen = false; }}>
          <summary class="nav-trigger">{tr(locale, group.title)}</summary>
          <div class="mega-menu pr-mega">
            <a class="mega-overview" href={route(edition, group.list[0].slug, base, locale)}><span>{tr(locale, 'Overview ↗')}</span></a>
            <div class="pr-mega-cards">
              {#each group.list.slice(1) as item (item.index)}
                <a class="pr-mega-card" href={route(edition, item.slug, base, locale)}>
                  <span class="pr-mega-image"><img data-src={asset(photo(item.index))} alt={tr(locale, item.name)} decoding="async" /></span>
                  <span class="pr-mega-name">{tr(locale, item.name)}</span>
                </a>
              {/each}
            </div>
          </div>
        </details>
      {/each}
      <a class="pr-nav-link" href={route(edition, 'rates-and-offers', base, locale)}>{tr(locale, 'Rates & offers')}</a>
    </nav>
    <button type="button" class="pr-reserve" data-booking-open bind:this={reserve} aria-expanded={bookingOpen} aria-controls="pr-booking" onclick={() => (bookingOpen = !bookingOpen)}>{tr(locale, 'CHECK AVAILABILITY')}</button>
  </div>
  <Booking bind:open={bookingOpen} {locale} onclose={() => reserve?.focus()} />
</header>
