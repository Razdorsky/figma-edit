<script lang="ts">
  // The recording studio: booked by email.
  import {photo} from '#lib/interactive/site.ts';
</script>

<div class="layer" id="L11">
  <div class="lbg"><img src={photo('studio-dome')} alt=""></div>
  <div class="shade v"></div><div class="shade l"></div><div class="shade b"></div>
  <div class="lc mid" style="max-width:690px">
    <div class="eyebrow">The Property · the recording studio</div>
    <h2 style="font-size:40px;line-height:1.1;margin:14px 0 16px">
      A working room, not an amenity</h2>
    <p class="lede" style="max-width:52ch">There is a studio on the property. It is not a prop.
      Musicians come here to make records and some of them have.</p>
    <div class="sell">
      <div class="row"><span class="m ask">booked by email, not by form</span>
        <button class="ttl go" data-p="studio">By the day or the week</button>
        <span class="pr">with or without an engineer</span></div>
      <div class="row"><span class="m inc">for whoever you bring</span>
        <span class="ttl">Rooms alongside it</span>
        <span class="pr">the studio is usually booked together with beds</span></div>
      <div class="row"><span class="m buy">the room next door is a dome</span>
        <button class="ttl go" data-p="dome">The Dome as a live room</button>
        <span class="pr">[x] metres across · one sitting at a time</span></div>
    </div>
    <div class="cta" style="margin-top:26px">
      <button class="btn-line solid" data-book="ask">Write about the studio</button></div>
  </div>
</div>
