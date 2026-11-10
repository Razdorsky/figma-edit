<script lang="ts">
  // The gate: a black screen with the logo and two ways in, a hold with light and sound, or a silent scroll.
  import Mark from './Mark.svelte';
</script>

<div id="gate">
  <div class="g-in">
    <div class="g-logo" id="glogo"><Mark/></div>
    <div class="g-line" id="gline"></div>
    <div class="g-body" id="gbody">
      <button class="g-ring" id="gring" aria-label="Press and hold to enter">
        <svg width="96" height="96" viewBox="0 0 96 96"><circle class="tr" cx="48" cy="48" r="43"></circle>
        <circle class="fr" id="garc" cx="48" cy="48" r="43"></circle></svg>
        <span class="g-dot" id="gdot">hold</span>
      </button>
      <div class="g-cap">Press and hold</div>
      <div class="g-sub">the light comes up, the sound comes on</div>
      <div class="g-or">or</div>
      <button class="g-alt" id="galt">scroll to enter without sound</button>
    </div>
  </div>
</div>
