<!-- The booking panel, "Two ways in": Stay, Experiences and Table. Its fields are drawn, not live. -->
<!-- svelte-ignore a11y_label_has_associated_control -->
<aside id="panel">
  <button class="close" id="closep">&times;</button>
  <h3>Two ways in</h3>
  <div class="small">You do not have to stay here to come here.</div>
  <div class="tabs">
    <button class="on" data-t="stay">Stay</button>
    <button data-t="exp">Experiences</button>
    <button data-t="table">Table</button>
  </div>
  <div id="tabstay">
    <div class="field"><label>Dates</label><div class="box">Add dates</div></div>
    <div class="field"><label>Guests</label><div class="box">2 adults</div></div>
    <div class="opt"><div class="n">The Villas</div><div class="m">Walls, a door that shuts, the most space and the most shelter when it rains.</div><div class="p">From [rate] a night</div></div>
    <div class="opt"><div class="n">The Treehouse</div><div class="m">One unit, built up into the canopy. It books out first, every season.</div><div class="p">From [rate] a night</div></div>
    <div class="opt"><div class="n">Glamping Tents</div><div class="m">Canvas, a real bed, a private bathroom, forest on three sides.</div><div class="p">From [rate] a night</div></div>
    <button class="go">Check availability</button>
    <div class="note">Every rate includes breakfast, wifi and the run of the property. Booking here
      directly is always the cheapest way to stay, and it is the only way to add an experience or a
      table at dinner to the same reservation.</div>
  </div>
  <div id="tabtable" hidden>
    <div class="field"><label>Date</label><div class="box">Pick an evening</div></div>
    <div class="field"><label>People</label><div class="box">2</div></div>
    <div class="opt"><div class="n">El Rancho</div><div class="m">The main room, under a high open roof by the pool. One sitting, [x] seats.</div><div class="p">[price] a person</div></div>
    <div class="opt"><div class="n">Moloka</div><div class="m">The smaller room. [x] seats, [x] nights a week. It fills up.</div><div class="p">[price] a person</div></div>
    <button class="go">Reserve a table</button>
    <div class="note">One sitting, limited seats, so book ahead. Dinner is already included for guests on [x] rates.</div>
  </div>
  <div id="tabexp" hidden>
    <div class="field"><label>Date</label><div class="box">Pick a day</div></div>
    <div class="opt"><div class="n">The Day and the Half Day</div><div class="m">The property, the pool, the river and lunch.</div><div class="p">Half [price] · Full [price]</div></div>
    <div class="opt"><div class="n">The Frequency Experience</div><div class="m">[x] minutes in the Dome.</div><div class="p">[price] a person</div></div>
    <div class="opt"><div class="n">Arenal After Dark</div><div class="m">The volcano, the land and the Dome at night, with dinner.</div><div class="p">[price] a person</div></div>
    <div class="opt"><div class="n">For Two</div><div class="m">A private session, dinner and [inclusion].</div><div class="p">[price] for two</div></div>
    <div class="opt"><div class="n">Horses and the River</div><div class="m">[x] hours on the land, at first light or late afternoon.</div><div class="p">[price] a person</div></div>
    <div class="opt"><div class="n">The Vessyl Presents</div><div class="m">Whoever is playing, in the Dome.</div><div class="p">[price], or free to guests</div></div>
    <button class="go">Book an experience</button>
    <div class="note">Everything runs on a set schedule with a real number of places. When a time
      says it is full, it is full.</div>
  </div>
</aside>
