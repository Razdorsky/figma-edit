<script lang="ts">
  // The whole property: buyout, retreats, groups, weddings, and the enquiry.
  import {photo} from '#lib/interactive/site.ts';
</script>

<div class="layer" id="L8">
  <div class="lbg"><img src={photo('03-plan-dome')} alt=""></div>
  <div class="shade v"></div><div class="shade l"></div><div class="shade b"></div>
  <div class="lc mid" style="max-width:680px">
    <div class="eyebrow">The whole property</div>
    <h2 style="font-size:40px;line-height:1.1;margin:14px 0 16px">
      Fourteen units, the Dome, the Hearth and 118 acres, and nobody else here</h2>
    <div class="sell">
      <div class="row"><span class="m ask">we reply with a quote, not a brochure</span></div>
      <div class="row"><button class="ttl go" data-p="buyout">Buyout</button>
        <span class="pr">from [x] a night, [x]-night minimum</span></div>
      <div class="row"><button class="ttl go" data-p="retreats">Retreats</button>
        <span class="pr">[x] a person a night, all meals · open retreats listed with dates</span></div>
      <div class="row"><button class="ttl go" data-p="groups">Groups and offsites</button>
        <span class="pr">the Hearth seats [x], the Dome holds [x] on the floor</span></div>
      <div class="row"><button class="ttl go" data-p="weddings">Weddings</button>
        <span class="pr">up to [x] people · one wedding at a time</span></div>
    </div>
    <div class="ask-form">
      <div class="box">dates</div><div class="box">how many people</div>
      <div class="box">the occasion</div>
      <button class="btn-line solid" data-book="ask">Send an enquiry</button>
    </div>
  </div>
</div>
