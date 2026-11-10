<script lang="ts">
  // Experiences: six things to book without a room, chosen with the cursor.
  import {photo} from '#lib/interactive/site.ts';
</script>

<div class="layer" id="L5">
  <div class="lbg">
    <div class="swap" data-i="0"><img src={photo('06-day-pool')} alt=""></div>
    <div class="swap" data-i="1"><img src={photo('01-hero-dome-night')} alt=""></div>
    <div class="swap" data-i="2"><img src={photo('07-evening-table')} alt=""></div>
    <div class="swap" data-i="3"><img src={photo('09-finale-table')} alt=""></div>
    <div class="swap" data-i="4"><img src={photo('horses-river')} alt=""></div>
    <div class="swap" data-i="5"><img src={photo('08-night-session')} alt=""></div>
  </div>
  <div class="shade v"></div><div class="shade l"></div><div class="shade b"></div>
  <div class="lc mid">
    <div class="eyebrow" style="margin-bottom:12px">Experiences · you do not have to stay here to come here</div>
    <ul class="units tight" id="exps">
      <li data-p="day"><div class="hd"><button class="t">The Day and the Half Day</button>
        <span class="pr">[price] / [price]</span></div>
        <div class="d">The pool, the river, the trails and lunch. A Dome session if you add one.</div></li>
      <li data-p="freq"><div class="hd"><button class="t">The Frequency Experience</button>
        <span class="pr">[price] · [price] for guests</span></div>
        <div class="d">[x] minutes on the floor of the Dome, run live. Tea afterwards.</div></li>
      <li data-p="dark"><div class="hd"><button class="t">Arenal After Dark</button>
        <span class="pr">[price] a person</span></div>
        <div class="d">Dusk on the land, dinner at the long table, then the Dome lit from inside.</div></li>
      <li data-p="two"><div class="hd"><button class="t">For Two</button>
        <span class="pr">[price] for two</span></div>
        <div class="d">A private session in the Dome, then dinner. No rose petals.</div></li>
      <li data-p="horses"><div class="hd"><button class="t">Horses and the River</button>
        <span class="pr">[price] · [price] for guests</span></div>
        <div class="d">[x] hours to the river and back, at first light or late afternoon.</div></li>
      <li data-p="presents"><div class="hd"><button class="t">The Vessyl Presents</button>
        <span class="pr">[price] · free to guests</span></div>
        <div class="d">Whoever is playing, in the Dome. The audience sits on the floor.</div></li>
    </ul>
    <div class="cta"><button class="btn-line solid" data-book="exp">Book an experience</button></div>
  </div>
</div>
