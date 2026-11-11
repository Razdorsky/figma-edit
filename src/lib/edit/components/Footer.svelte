<script lang="ts">
  import { bookingFor, pages, route } from '#lib/edit/site.ts';
  import { tr, msg, other, type Locale } from '#lib/edit/i18n.ts';

  type Props = {
    edition: 'figma-edit';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
    locale?: Locale;
  };

  let { edition, page, base = '', locale = 'en' }: Props = $props();

  // Footer labels from the frames; the designer's pages 14–18 supply five of the six destinations.
  const propertyLinks: [string, string | null][] = [
    [msg('The Dome'), 'frequency-dome'],
    [msg('The Hearth'), 'harmonic-hearth'],
    [msg('Sound and movement'), 'sound-and-movement'],
    [msg('Horses and land'), 'horses-and-the-land'],
    [msg('The studio'), 'recording-studio'],
    [msg('The gallery'), null]
  ];
  // The frames' footer writes one page name differently from the page itself.
  const footerNames: Record<string, string> = { 'offers': msg('Rates and Offers') };
  // The designer's pages 27–28 supply the first two destinations.
  const visitLinks: [string, string | null][] = [
    [msg('Getting here'), 'arenal/getting-here'],
    [msg('Things to do in Arenal'), 'arenal/things-to-do'],
    [msg('When to visit'), null],
    [msg('FAQ'), null],
    [msg('Policies'), null]
  ];
  // The designer's contact lines, and the brief's reservations address, which the designer did not fill in, as the
  // brief's placeholder.
  const contactLinks = [msg('WhatsApp Contact'), msg('Phone Contact'), msg('[Reservations email]'), msg('Address Info')];
</script>

{#snippet languageButton()}
  <!-- The designer's EN | ES: a link to this page in the other language (docs/figma-spanish.md). -->
  <a class="language-trigger" data-language-trigger data-sveltekit-reload href={route(edition, page.slug, base, other(locale))} hreflang={other(locale)} aria-label={tr(locale, 'Language: English. Switch to Spanish')}>
    {#if edition === 'figma-edit'}
      <span><span data-lang-current={locale === 'en' || undefined}>EN</span> | <span data-lang-current={locale === 'es' || undefined}>ES</span></span>
    {:else}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 7h14M5 17h14" />
      </svg>
      <span>{locale === 'es' ? 'ES' : 'EN'}</span>
    {/if}
  </a>
{/snippet}

{#snippet pending(label: string)}
  <button type="button" data-pending-link={label}>{tr(locale, label)}</button>
{/snippet}

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <a class="brand" href={route(edition, '', base, locale)}>
        <img src={`${base.replace(/\/$/, '')}/brand/logo-white.svg`} width="200" height="38" alt="The Vessyl" />
      </a>
      <div class="header-actions">
        {@render languageButton()}
      </div>
    </div>
    <div class="footer-columns">
      <section class="footer-group">
        <h2><a href={route(edition, 'stay', base, locale)}>{tr(locale, 'Stay')}</a></h2>
        {#each pages.slice(2, 6) as item (item.index)}
          <a href={route(edition, item.slug, base, locale)}>{tr(locale, footerNames[item.slug] ?? item.name)}</a>
        {/each}
      </section>
      <section class="footer-group">
        <h2><a href={route(edition, 'experiences', base, locale)}>{tr(locale, 'Experiences')}</a></h2>
        {#each pages.slice(7, 13) as item (item.index)}
          <a href={route(edition, item.slug, base, locale)}>{tr(locale, item.name)}</a>
        {/each}
        <a href={route(edition, 'frequency-dome', base, locale)}>{tr(locale, 'The Dome')}</a>
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
      <!-- Canonical footer line (owner, 2026-11-11): La Fortuna, as in the frames, not the brief's "Arenal". -->
      <p>© The Vessyl 2026 • La Fortuna, Costa Rica</p>
      <p>{@render pending(msg('Privacy'))} • {@render pending(msg('Terms & Conditions'))}</p>
    </div>
  </div>
</footer>
