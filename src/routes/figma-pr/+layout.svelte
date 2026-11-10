<script lang="ts">
  // Figma PR edition shell (owner, 2026-11-10): a copy of the frozen Figma edition in the design system of the PR
  // team's references. docs/figma-pr-system.md describes the system and every mechanic.
  import {onMount, type Snippet} from 'svelte';
  import {afterNavigate, beforeNavigate, onNavigate} from '$app/navigation';
  import {page} from '$app/state';
  import {canvas, pages, parseSlug} from '#lib/pr/site.ts';
  import {installInteractions, enhancePage, closeOverlays} from '#lib/pr/interactions.js';
  import Intro from '#lib/pr/components/Intro.svelte';
  import '#lib/pr/styles/base.css';
  import '#lib/pr/styles/shell.css';
  import '#lib/pr/styles/sections.css';
  import '#lib/pr/styles/motion.css';
  import caps from '#lib/pr/fonts/archivo-normal.woff2?url';
  import display from '#lib/pr/fonts/libre-caslon-display-normal.woff2?url';
  import text from '#lib/pr/fonts/newsreader-normal.woff2?url';

  let {children}: {children:Snippet} = $props();
  onMount(installInteractions);
  // Language (owner, 2026-11-10; docs/figma-pr-system.md, "Language"): EN | ES changes the words in place, with no
  // reload and no opening mark. The block at the top of the screen keeps its place, an open menu stays open, and the
  // page crossfades into the other language (motion.css, data-vt="lang"). The page's own words are rebuilt
  // ([...slug]/+page.svelte).
  const languageSwitch = (navigation: {from: {params: Record<string, string> | null} | null; to: {params: Record<string, string> | null} | null}) => {
    if (!navigation.from?.params || !navigation.to?.params) return false;
    const from = parseSlug(navigation.from.params.slug ?? ''), to = parseSlug(navigation.to.params.slug ?? '');
    return from.slug === to.slug && from.locale !== to.locale;
  };
  let place: {index: number; top: number} | null = null;
  const blocks = () => [...document.querySelectorAll<HTMLElement>('.current-page > *')];
  function keepPlace() {
    const under = Math.max(0, document.querySelector('.pr-header')?.getBoundingClientRect().bottom ?? 0);
    const list = blocks();
    const index = list.findIndex(block => block.getBoundingClientRect().bottom > under);
    place = index < 0 ? null : {index, top: list[index].getBoundingClientRect().top};
  }
  function returnToPlace() {
    const block = place && blocks()[place.index];
    if (block && place) window.scrollTo({top: scrollY + block.getBoundingClientRect().top - place.top, behavior: 'instant'});
    place = null;
  }
  // The rebuilt page's pictures on screen are decoded before the crossfade shows it (at most 350ms).
  async function pictureSettled() {
    const shown = [...document.querySelectorAll<HTMLImageElement>('.current-page img')].filter(image => {
      const box = image.getBoundingClientRect();
      return box.width > 0 && box.bottom > 0 && box.top < innerHeight;
    });
    await Promise.race([Promise.all(shown.map(image => image.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 350))]);
  }
  beforeNavigate(navigation => {
    if (languageSwitch(navigation)) keepPlace(); else closeOverlays();
  });
  afterNavigate(() => {
    const edition = 'figma-pr';
    const {locale, slug} = parseSlug(page.params.slug);
    const item = pages.find(item => item.slug === slug);
    // Spanish pages (docs/figma-spanish.md): the document language follows the page.
    document.documentElement.lang = locale;
    document.body.dataset.edition = edition;
    document.body.dataset.page = item?.slug || 'home';
    document.body.dataset.heroTheme = item?.photo ? 'photo' : 'paper';
    document.documentElement.style.setProperty('--canvas', canvas(edition, item?.index || 0));
    if (place) returnToPlace();
    enhancePage();
  });
  let activeTransition: ViewTransition | undefined;
  onNavigate(navigation => {
    activeTransition?.skipTransition();
    const root = document.documentElement;
    const language = languageSwitch(navigation);
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches || navigation.shallow) return;
    if (language) root.dataset.vt = 'lang'; else delete root.dataset.vt;
    return new Promise<void>(resolve => {
      const transition = document.startViewTransition(async () => {resolve();await navigation.complete;if (language) await pictureSettled();});
      activeTransition = transition;
      void transition.ready.catch(() => {});
      void transition.finished.finally(() => {if(activeTransition === transition){activeTransition = undefined;delete root.dataset.vt;}}).catch(() => {});
    });
  });
</script>

<svelte:head>
  <link rel="preload" href={caps} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={display} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={text} as="font" type="font/woff2" crossorigin="anonymous" />
  <!-- The opening mark plays on every load of a page, a reload included, and with reduced motion too (owner, 2026-11-10).
       The page script leads it (interactions.js, leaveIntro); this lifts it at 3.6s only if that script never came. -->
  {@html `<script>try{var d=document.documentElement;d.dataset.intro='on';setTimeout(function(){if(d.dataset.intro==='on'&&!('introLead' in d.dataset)){d.dataset.intro='leaving';setTimeout(function(){d.dataset.intro='done'},1200)}},3600)}catch(e){}</script>`}
</svelte:head>

<Intro />

{@render children()}
<div class="preview-toast" role="status" hidden></div>
