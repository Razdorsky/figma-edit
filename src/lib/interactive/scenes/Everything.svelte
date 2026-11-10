<script lang="ts">
  // What you can book: the closing scene and the way into the full list.
  import {photo} from '#lib/interactive/site.ts';
</script>

<div class="layer" id="L10">
  <div class="lbg"><img src={photo('09-finale-table')} alt=""></div>
  <div class="shade v"></div><div class="shade b"></div><div class="shade l"></div>
  <div class="lc mid" style="max-width:720px">
    <div class="eyebrow">You do not have to stay here to come here</div>
    <h2 style="font-size:44px;line-height:1.1;margin:16px 0 18px">
      Everything you can book here</h2>
    <p class="lede">Three kinds of room, six experiences, the sessions, two tables, the studio,
      the transfers and the whole property. Booking here directly is always the cheapest way to
      stay, and it is the only way to add an experience or a table to the same reservation.</p>
    <button id="allbtn2" data-all="1" style="margin-top:18px">Open the full list</button>
    <div class="cta" style="margin-top:24px">
      <button class="btn-line" data-book="stay">Stay the night</button>
      <button class="btn-line" data-book="exp">Come for a few hours</button>
    </div>
  </div>
</div>
