<script lang="ts">
  // The story: one world that stays on screen while eleven scenes pass through it, with the chrome, the rail and the
  // layers of booking around it. The engine drives all of it by the prototype's own ids (docs/interactive-prototype.md).
  import {onMount} from 'svelte';
  import {canvas,photo} from '#lib/interactive/site.ts';
  import {installStory} from '#lib/interactive/interactions.js';
  import {innerPages} from '#lib/interactive/content/pages.ts';
  import Header from '#lib/interactive/components/Header.svelte';
  import Rail from '#lib/interactive/components/Rail.svelte';
  import Footer from '#lib/interactive/components/Footer.svelte';
  import BookList from '#lib/interactive/components/BookList.svelte';
  import BookingPanel from '#lib/interactive/components/BookingPanel.svelte';
  import InnerPage from '#lib/interactive/components/InnerPage.svelte';
  import Gate from '#lib/interactive/components/Gate.svelte';
  import Threshold from '#lib/interactive/scenes/Threshold.svelte';
  import Place from '#lib/interactive/scenes/Place.svelte';
  import Dome from '#lib/interactive/scenes/Dome.svelte';
  import Stay from '#lib/interactive/scenes/Stay.svelte';
  import Experiences from '#lib/interactive/scenes/Experiences.svelte';
  import Sound from '#lib/interactive/scenes/Sound.svelte';
  import Studio from '#lib/interactive/scenes/Studio.svelte';
  import Table from '#lib/interactive/scenes/Table.svelte';
  import WholeProperty from '#lib/interactive/scenes/WholeProperty.svelte';
  import PlanVisit from '#lib/interactive/scenes/PlanVisit.svelte';
  import Everything from '#lib/interactive/scenes/Everything.svelte';
  import type {PageData} from './$types';
  let {data}: {data:PageData}=$props();
  onMount(() => installStory({photo, pages: innerPages}));
</script>
<svelte:head><title>The Vessyl</title><meta name="description" content="The Vessyl in Arenal, Costa Rica"/><meta name="theme-color" content={canvas(data.edition,data.page.index)}/></svelte:head>
<Header/>
<Rail/>
<div class="ticks" id="ticks"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
<div id="flash"></div>
<!-- The scenes in the order of the engine's timeline (BEATS in interactions.js). -->
<main id="content" data-page={data.page.slug||'home'}>
<div id="story">
<div id="world">
  <div id="thread"></div>
  <Threshold/>
  <Place/>
  <Dome/>
  <Stay/>
  <Experiences/>
  <Sound/>
  <Studio/>
  <Table/>
  <WholeProperty/>
  <PlanVisit/>
  <Everything/>
  <div id="topveil"></div>
</div>
</div>
</main>
<Footer/>
<BookList/>
<div id="veil"></div>
<BookingPanel/>
<InnerPage/>
<Gate/>
