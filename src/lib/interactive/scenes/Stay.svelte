<script lang="ts">
  // Stay: three kinds of unit chosen with the cursor, each with its photograph.
  import {photo} from '#lib/interactive/site.ts';
</script>

<div class="layer" id="L4">
  <div class="lbg">
    <div class="swap" data-i="0"><img src={photo('unit-villas')} alt=""></div>
    <div class="swap" data-i="1"><img src={photo('unit-treehouse')} alt=""></div>
    <div class="swap" data-i="2"><img src={photo('unit-tents')} alt=""></div>
  </div>
  <div class="shade v"></div><div class="shade l"></div><div class="shade b"></div>
  <div class="lc mid">
    <div class="eyebrow" style="margin-bottom:14px">Stay · fourteen units, no two the same</div>
    <ul class="units" id="units">
      <li data-p="villas"><div class="hd"><button class="t">The Villas</button>
        <span class="pr">from [rate] a night</span></div>
        <div class="d">Walls, a door that shuts, the most space and the most shelter when it rains.</div></li>
      <li data-p="treehouse"><div class="hd"><button class="t">The Treehouse</button>
        <span class="pr">from [rate] a night</span></div>
        <div class="d">One unit, built up into the canopy. It books out first, every season.</div></li>
      <li data-p="tents"><div class="hd"><button class="t">Glamping Tents</button>
        <span class="pr">from [rate] a night</span></div>
        <div class="d">Seven tents. Canvas, a real bed, a private bathroom, forest on three sides.</div></li>
    </ul>
    <div class="sell">
      <div class="row"><span class="m inc">included in every rate</span>
        <span class="pr">breakfast · wifi · the pool, the river and the trails</span></div>
      <div class="row"><span class="m buy">five offers</span>
        <button class="ttl go" data-p="rates">Rates and offers</button>
        <span class="pr">four nights or more · green season · couples · last-minute</span></div>
    </div>
    <div class="cta"><button class="btn-line solid" data-book="stay">Check availability</button></div>
  </div>
</div>
