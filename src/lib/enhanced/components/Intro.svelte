<script lang="ts">
  // The first visit opens with the Vessyl mark, in black since 2026-11-10 as on Blueprint (owner; before, the designer's
  // copper; 2026-11-09, from /blueprint/ 452c7d0):
  // the symbol builds from the bottom up, as it is drawn (the dome, then the volcano, then the light), then the word
  // appears. It leaves as soon as the page is ready (fonts loaded and the first picture decoded), never before the mark
  // has played and never later than about three seconds from the start; on every load of a page, with reduced motion too
  // (interactions.js, the "intro" step).
  import symbol from '#lib/blueprint/assets/symbol.svg?raw';
  import word from '#lib/blueprint/assets/word.svg?raw';
</script>

<div class="site-intro" aria-hidden="true">
  <div class="site-intro-mark">
    <span class="site-intro-symbol">{@html symbol}</span>
    <span class="site-intro-word">{@html word}</span>
  </div>
</div>
