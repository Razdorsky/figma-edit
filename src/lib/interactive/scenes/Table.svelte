<script lang="ts">
  // The table: two rooms to eat in.
  import {photo} from '#lib/interactive/site.ts';
</script>

<div class="layer" id="L7">
  <div class="lbg"><img src={photo('long-table')} alt=""></div>
  <div class="shade l"></div><div class="shade b"></div>
  <div class="lc mid" style="max-width:660px">
    <div class="eyebrow">The Property · eating here</div>
    <h2 style="font-size:40px;line-height:1.1;margin:14px 0 16px">
      You find out what is for dinner when you sit down</h2>
    <p class="lede">Two rooms, and they are not the same thing. Most dinners happen in one of them.</p>
    <div class="sell">
      <div class="row"><span class="m buy">reserve a table</span>
        <button class="ttl go" data-p="table">El Rancho</button>
        <span class="pr">the main room · one sitting · [x] seats · [price] a person</span></div>
      <div class="row"><span class="m buy">reserve a table</span>
        <button class="ttl go" data-p="moloka">Moloka</button>
        <span class="pr">the smaller room · [x] seats · [x] nights a week · it fills up</span></div>
      <div class="row"><span class="m inc">included on [x] rates</span>
        <span class="pr">dinner for guests · [price] on room-only rates and for day visitors</span></div>
    </div>
    <div class="cta"><button class="btn-line solid" data-book="table">Reserve a table</button></div>
  </div>
</div>
