<script lang="ts">
  // Sound and movement: what is included for guests and what is booked.
  import {photo} from '#lib/interactive/site.ts';
</script>

<div class="layer" id="L6">
  <div class="lbg"><img src={photo('hearth')} alt=""></div>
  <div class="shade v"></div><div class="shade l"></div><div class="shade b"></div>
  <div class="lc mid" style="max-width:700px">
    <div class="eyebrow">The Property · sound and movement</div>
    <h2 style="font-size:40px;line-height:1.1;margin:14px 0 16px">
      Everything we run that is not a meal or a horse</h2>
    <div class="sell">
      <div class="row"><span class="m inc">included for guests</span>
        <span class="ttl">Morning movement</span><span class="pr">daily · [x] for day visitors</span></div>
      <div class="row"><span class="m inc">included for guests</span>
        <span class="ttl">Evening sound</span><span class="pr">[x] nights a week · [x] for day visitors</span></div>
      <div class="row"><span class="m inc">included for guests</span>
        <span class="ttl">Breathwork</span><span class="pr">[x] mornings a week</span></div>
      <div class="row"><span class="m buy">booked one to one</span>
        <button class="ttl go" data-p="sound">Massage · private sound · private breath</button>
        <span class="pr">[price] · one day of notice</span></div>
      <div class="row"><span class="m buy">booked, not dropped in on</span>
        <button class="ttl go" data-p="hearth">The Harmonic Hearth</button>
        <span class="pr">heat, cold and sound through the bench · [price]</span></div>
    </div>
    <div class="small" style="margin-top:16px">The current week's schedule is posted at the
      Hearth and sent to your room the night you arrive.</div>
  </div>
</div>
