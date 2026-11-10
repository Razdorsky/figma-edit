<script lang="ts">
  // Figma Enhanced edition shell. Started as a copy of the frozen Figma edition (2026-11-07).
  import {onMount, type Snippet} from 'svelte';
  import {afterNavigate, beforeNavigate, onNavigate} from '$app/navigation';
  import {page} from '$app/state';
  import {canvas, pages, base, parseSlug} from '#lib/enhanced/site.ts';
  import heroes from '#lib/enhanced/heroes.json';
  import heroPhotos from '#lib/enhanced/hero-photos.json';
  import {installInteractions, enhancePage, closeOverlays, smooth} from '#lib/enhanced/interactions.js';
  import 'lenis/dist/lenis.css';
  import '#lib/enhanced/styles/shell.css';
  import '#lib/enhanced/styles/shell-edition.css';
  import '#lib/enhanced/styles/tokens.css';
  import '#lib/enhanced/styles/system.css';
  import '#lib/enhanced/styles/closing.css';
  import '#lib/enhanced/styles/focus.css';
  import '#lib/enhanced/styles/header.css';
  import '#lib/enhanced/styles/booking.css';
  import '#lib/enhanced/styles/motion.css';
  import '#lib/enhanced/styles/films.css';
  import '#lib/enhanced/styles/drift.css';
  import '#lib/enhanced/styles/rise.css';
  import '#lib/enhanced/styles/next.css';
  import '#lib/enhanced/styles/rail.css';
  import '#lib/enhanced/styles/change.css';
  import '#lib/enhanced/styles/portal.css';
  import '#lib/enhanced/styles/intro.css';
  import Intro from '#lib/enhanced/components/Intro.svelte';
  // Speed, stage 2 (docs/figma-enhanced-speed.md): clips first, inlined so it acts while the page is being read.
  import clipsFirst from '#lib/enhanced/clips-first.js?raw';
  const clipsFirstScript = '<script>' + clipsFirst.replace(/^\s*\/\/.*$/gm, '').replace(/\n\s*\n/g, '\n') + '</' + 'script>';
  // Moderate prewarming: the fonts of the first screen load with the page (the same files the stylesheets name).
  import garamond from '../../assets/fonts/eb-garamond-latin-wght-normal.woff2?url';
  import roboto400 from '#lib/enhanced/fonts/roboto-400.woff2?url';
  import roboto500 from '#lib/enhanced/fonts/roboto-500.woff2?url';

  let {children}: {children:Snippet} = $props();
  // Moderate prewarming: the page's own first picture (the poster of its opening film, or its opening photograph) is
  // asked for at once, before the stylesheets and scripts reveal it.
  const hero = $derived((heroes as Record<string, string[]>)[parseSlug(page.params.slug).slug]?.[0]);
  // Speed, stage 4: an opening photograph in sizes for the screen is preloaded the way the page will pick it, so the
  // browser never fetches two sizes of it.
  const heroSet = $derived((heroPhotos as unknown as Record<string, {sizes: string; set: [string, number][]}>)[parseSlug(page.params.slug).slug]);
  onMount(installInteractions);
  // Language (owner, 2026-11-10): EN | ES changes the words in place, with no reload and no opening mark. The block at
  // the top of the screen keeps its place, an open menu or booking bar stays open, and the page crossfades into the other
  // language (onNavigate below; motion.css, data-vt="lang"). The page's own words are rebuilt ([...slug]/+page.svelte).
  const languageSwitch = (navigation: {from: {params: Record<string, string> | null} | null; to: {params: Record<string, string> | null} | null}) => {
    if (!navigation.from?.params || !navigation.to?.params) return false;
    const from = parseSlug(navigation.from.params.slug ?? ''), to = parseSlug(navigation.to.params.slug ?? '');
    return from.slug === to.slug && from.locale !== to.locale;
  };
  let place: {index: number; top: number} | null = null;
  const blocks = () => [...document.querySelectorAll<HTMLElement>('.current-page > *')];
  function keepPlace() {
    const under = Math.max(0, document.querySelector('[data-header]')?.getBoundingClientRect().bottom ?? 0);
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
  // Step 2.2: any glide still running stops when a navigation starts (Back right after a wheel included).
  beforeNavigate(navigation => {
    if (languageSwitch(navigation)) {
      keepPlace();
      document.documentElement.dataset.switching = 'language';
      smooth()?.stop();
      return;
    }
    closeOverlays();
    smooth()?.stop();
  });
  afterNavigate(() => {
    // Moderate prewarming: SvelteKit fetches a page's data while its link is pointed at.
    document.body.setAttribute('data-sveltekit-preload-data', 'hover');
    const edition = 'figma-enhanced';
    const {locale, slug} = parseSlug(page.params.slug);
    const item = pages.find(item => item.slug === slug);
    // Spanish pages (docs/figma-enhanced-spanish.md): the document language follows the page.
    document.documentElement.lang = locale;
    document.body.dataset.edition = edition;
    document.body.dataset.page = item?.slug || 'home';
    document.body.dataset.heroTheme = item?.photo ? 'photo' : 'paper';
    document.documentElement.style.setProperty('--canvas', canvas(edition, item?.index || 0));
    if (place) returnToPlace();
    // Step 2.2: Lenis follows the position SvelteKit chose, so it never scrolls the new page back.
    const lenis = smooth();
    if (lenis && !document.querySelector('dialog[open]')) lenis.start();
    lenis?.resize();
    lenis?.scrollTo(window.scrollY, {immediate: true, force: true});
    enhancePage();
    delete document.documentElement.dataset.switching;
  });

  // Step 2.2 (docs/figma-enhanced-step2.md): the Legacy Blueprint page transition. The page dissolves; when the
  // departing opening is on screen, the openings travel together and the new photograph settles from 110%.
  const opening = () => document.querySelector<HTMLElement>('.current-page > section:first-child, .current-page > [data-rise]:first-child > section:first-child');
  const onScreen = (element: Element | null, share: number) => {
    const box = element?.getBoundingClientRect();
    return !!box && box.top > -innerHeight * 0.25 && box.bottom > innerHeight * share;
  };
  async function photoReady() {
    const image = document.querySelector<HTMLImageElement>('.current-page > [data-role="photo-hero"]:first-child [data-part="hero-image"] img, .current-page > [data-rise]:first-child > [data-role="photo-hero"]:first-child [data-part="hero-image"] img');
    if (!image) return null;
    await Promise.race([image.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 400))]);
    return image.complete && image.naturalWidth ? image : null;
  }
  // Step 2.6: a navigation to the page the next-page block leads to, while its picture is on screen, carries the
  // picture into that page's opening (motion.css, vt-next); a page that opens on text receives it as a dissolve.
  const door = () => document.querySelector<HTMLElement>('.current-page [data-next-media]');
  const throughDoor = (to: URL | undefined) => {
    const media = door();
    const link = media?.closest('a');
    if (!media || !link || !to || to.pathname !== new URL(link.href).pathname) return false;
    const box = media.getBoundingClientRect();
    return Math.min(box.bottom, innerHeight) - Math.max(box.top, 0) > box.height * 0.3;
  };
  const arrivingPicture = () => document.querySelector('.current-page > [data-rise]:first-child > [data-role="photo-hero"]:first-child > [data-part="hero-image"], .current-page > [data-hero="arch"]:first-child [data-part="arch-media"]');
  let activeTransition: ViewTransition | undefined;
  onNavigate(navigation => {
    activeTransition?.skipTransition();
    const root = document.documentElement;
    if (languageSwitch(navigation)) {
      delete root.dataset.vtHeader;
      if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {delete root.dataset.vt;return;}
      root.dataset.vt = 'lang';
      return new Promise<void>(resolveNavigation => {
        const transition = document.startViewTransition(async () => {
          resolveNavigation();
          await navigation.complete;
          await pictureSettled();
        });
        activeTransition = transition;
        transition.ready.catch(() => {});
        transition.finished.finally(() => {
          if (activeTransition !== transition) return;
          activeTransition = undefined;
          delete root.dataset.vt;
        }).catch(() => {});
      });
    }
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches || navigation.shallow
      || navigation.from?.url.pathname === navigation.to?.url.pathname) {
      delete root.dataset.vt;
      return;
    }
    const header = document.querySelector('[data-header]');
    const viaDoor = throughDoor(navigation.to?.url);
    root.dataset.vt = viaDoor ? 'next' : onScreen(opening(), 0.4) ? 'hero' : 'dissolve';
    root.dataset.vtHeader = header && !header.classList.contains('is-away') ? 'shared' : 'none';
    let arriving: HTMLImageElement | null = null;
    return new Promise<void>(resolveNavigation => {
      const transition = document.startViewTransition(async () => {
        resolveNavigation();
        await navigation.complete;
        if (viaDoor) {
          const grows = scrollY < 2 && !!arrivingPicture();
          if (grows) await photoReady();
          root.dataset.vt = grows ? 'next-in' : 'dissolve';
          return;
        }
        // The new page is in: its opening joins the transition when the page starts at the top.
        arriving = scrollY < 2 ? await photoReady() : null;
        root.dataset.vt = scrollY < 2 ? 'hero' : 'dissolve';
      });
      activeTransition = transition;
      transition.ready.then(() => {
        if (!arriving) return;
        // The build may write the token in seconds (".8s"), so read its unit.
        const token = getComputedStyle(root).getPropertyValue('--vt-scene').trim();
        const time = (parseFloat(token) * (token.endsWith('ms') ? 1 : 1000)) || 800;
        arriving.animate([{scale: 1.1}, {scale: 1}], {duration: time, easing: 'cubic-bezier(0.4, 0, 0.2, 1)'});
      }).catch(() => {});
      transition.finished.finally(() => {
        if (activeTransition !== transition) return;
        activeTransition = undefined;
        delete root.dataset.vt;
        delete root.dataset.vtHeader;
      }).catch(() => {});
    });
  });
</script>

<svelte:head>
  <link rel="preload" href={garamond} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={roboto400} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={roboto500} as="font" type="font/woff2" crossorigin="anonymous" />
  {#if hero && heroSet && hero.startsWith('/media/')}<link rel="preload" href={`${base.replace(/\/$/, '')}${hero}`} imagesrcset={heroSet.set.map(([path, width]) => `${base.replace(/\/$/, '')}${path} ${width}w`).join(', ')} imagesizes={heroSet.sizes} as="image" fetchpriority="high" />
  {:else if hero}<link rel="preload" href={`${base.replace(/\/$/, '')}${hero}`} as="image" fetchpriority="high" />{/if}
  {@html clipsFirstScript}
  <!-- The opening mark plays on every load of a page, a reload included, and with reduced motion too (owner, 2026-11-10;
       before, once per visit and never with reduced motion); a change of language does not reload the page, so it never
       shows the mark. The page script leads the mark (interactions.js, leaveIntro); this lifts it at 3.6s only if that
       script never came. -->
  {@html `<script>try{var d=document.documentElement;d.dataset.intro='on';setTimeout(function(){if(d.dataset.intro==='on'&&!('introLead' in d.dataset)){d.dataset.intro='leaving';setTimeout(function(){d.dataset.intro='done'},1200)}},3600)}catch(e){}</script>`}
</svelte:head>

<Intro />
{@render children()}
<div class="preview-toast" role="status" hidden></div>
