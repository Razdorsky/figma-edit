<script lang="ts">
  // The chrome over the story: the logo, the current chapter, and language, sound and booking.
  import Wordmark from './Wordmark.svelte';
</script>

<header class="site-header">
<div class="logo" id="logo"><Wordmark/></div>
<div class="chapter" id="chapwrap"><span id="chap">01 · Threshold</span></div>
<div class="topright" id="topright">
  <button class="lang">EN&nbsp;|&nbsp;ES</button>
  <button class="sound" id="snd">SOUND</button>
  <button class="book" id="openbook">Book</button>
</div>
</header>
