<script lang="ts">
  // The inner page that rises over the story. The engine fills it from its table of pages.
  import {photo} from '#lib/interactive/site.ts';
</script>

<div id="page">
  <button class="back" id="backbtn">&larr; Back</button>
  <div class="phero"><img id="pimg" src={photo('08-night-session')} alt=""><div class="shade"></div></div>
  <div class="pbody">
    <h2 id="ptitle">The Frequency Dome</h2>
    <p class="lede" id="plede"></p>
    <div class="facts" id="pfacts"></div>
    <div style="margin-top:50px"><button class="btn-line solid" data-book="exp">Book a Dome session</button></div>
  </div>
</div>
