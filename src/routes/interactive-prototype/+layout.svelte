<script lang="ts">
  // Interactive Prototype edition shell (owner, 2026-11-10): the one-scene concept of the site, developed step by step
  // at its own address. docs/interactive-prototype.md describes the edition and every mechanic.
  // The style files are the prototype's one stylesheet cut at its own section marks: keep their order.
  import type {Snippet} from 'svelte';
  import {afterNavigate} from '$app/navigation';
  import {page} from '$app/state';
  import {canvas, pages} from '#lib/interactive/site.ts';
  import '#lib/interactive/styles/base.css';
  import '#lib/interactive/styles/story.css';
  import '#lib/interactive/styles/shell.css';
  import '#lib/interactive/styles/scenes.css';
  import '#lib/interactive/styles/gate.css';
  import '#lib/interactive/styles/booking.css';
  import '#lib/interactive/styles/page.css';
  import '#lib/interactive/styles/footer.css';

  let {children}: {children:Snippet} = $props();
  afterNavigate(() => {
    const edition = 'interactive-prototype';
    const item = pages.find(item => item.slug === (page.params.slug || ''));
    document.documentElement.lang = 'en';
    document.body.dataset.edition = edition;
    document.body.dataset.page = item?.slug || 'home';
    document.body.dataset.heroTheme = item?.photo ? 'photo' : 'paper';
    document.documentElement.style.setProperty('--canvas', canvas(edition, item?.index || 0));
  });
</script>

{@render children()}
