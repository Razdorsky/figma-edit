<script lang="ts">
  // Figma PR's opening mark (owner, 2026-11-10; docs/figma-pr-system.md, "Opening mark"): the Vessyl symbol in black
  // builds from the bottom up, then the word appears, on the PR paper — as Figma Enhanced and Blueprint open. It plays on
  // every load of a page, a reload included, and with reduced motion too; it leaves as soon as the page is ready (fonts
  // in, first picture decoded), never before the mark has played and never later than about three seconds
  // (interactions.js, "Opening mark").
  import symbol from '#lib/pr/assets/symbol.svg?raw';
  import word from '#lib/pr/assets/word.svg?raw';
</script>

<div class="pr-intro" aria-hidden="true">
  <div class="pr-intro-mark">
    <span class="pr-intro-symbol">{@html symbol}</span>
    <span class="pr-intro-word">{@html word}</span>
  </div>
</div>
