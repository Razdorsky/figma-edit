// Each page's title tag and meta description, as the content brief writes them (part one, "Every page, with its words,
// its title and its description"; docs/figma-edit.md, ported from Figma Edit).
import { msg } from './i18n.ts';

export const meta: Record<number, { title: string; description: string }> = {
  1: { title: msg("The Vessyl | Hotel and Retreat, Arenal Costa Rica"), description: msg("Fourteen places to sleep on 118 acres outside La Fortuna, built around a geodesic dome made for sound. Book direct.") },
  2: { title: msg("Where You Sleep | The Vessyl, Arenal Costa Rica"), description: msg("Six villas, a treehouse and seven glamping tents spread across 118 acres above the river. Compare them and book direct.") },
  3: { title: msg("The Villas | The Vessyl, Arenal Costa Rica"), description: msg("Six private villas above the river in Arenal, no two the same. Rates, layouts, and what you can see from each deck.") },
  4: { title: msg("The Treehouse | The Vessyl, Arenal Costa Rica"), description: msg("One treehouse, built up into the canopy above La Fortuna. It books out first every season. Rates and availability.") },
  5: { title: msg("Glamping Tents | The Vessyl, Arenal Costa Rica"), description: msg("Seven canvas tents on platforms across the property, with real beds and a different view out of every one.") },
  6: { title: msg("Rates and Offers | The Vessyl, Arenal Costa Rica"), description: msg("What a night costs, what is included in it, and the offers running now. The direct rate is the best rate.") },
  7: { title: msg("Experiences | The Vessyl, Arenal Costa Rica"), description: msg("Everything you can book here: sound in the dome, horses, the river, the thermal room, and dinner at one long table.") },
  8: { title: msg("Day Passes | The Vessyl, Arenal Costa Rica"), description: msg("Spend a day on the property without staying the night. What the half day and the full day include, and what they cost.") },
  9: { title: msg("The Frequency Experience | The Vessyl, Arenal"), description: msg("A sound session in the geodesic dome, where the low end arrives through the floor. What happens, how long it runs, how to book.") },
  10: { title: msg("Arenal After Dark | The Vessyl, Costa Rica"), description: msg("The property after sunset: dinner, fire, sound in the dome, and the sky over the volcano. Open to guests and to bookings.") },
  11: { title: msg("For Two | The Vessyl, Arenal Costa Rica"), description: msg("What to book when there are two of you. The treehouse, a private sound session, horses at first light, dinner after.") },
  12: { title: msg("Horses and the River | The Vessyl, Arenal"), description: msg("Ride out across 118 acres of private trail and down to the river, then swim. Times, skill levels and what it costs.") },
  13: { title: msg("The Vessyl Presents | The Vessyl, Costa Rica"), description: msg("Live music and performance inside the geodesic dome. What is coming up, how the room sounds, and how to get in.") },
  14: { title: msg("The Frequency Dome | The Vessyl, Arenal Costa Rica"), description: msg("A geodesic dome with acoustics by George Augspurger and a vibro-tactile floor. What it is used for and how to book it.") },
  15: { title: msg("The Harmonic Hearth | The Vessyl, Arenal Costa Rica"), description: msg("Heated stone, a sauna, a cold plunge, and sound through the benches. What a session is, and who should ask a doctor first.") },
  16: { title: msg("Sound and Movement | The Vessyl, Arenal Costa Rica"), description: msg("Every session on the property: morning movement, sound in the dome, Yoga Nidra, breath work. What runs daily and what you book.") },
  17: { title: msg("Horses and the Land | The Vessyl, Arenal Costa Rica"), description: msg("118 acres, miles of private trail, a river with a swimming hole, and guides who have worked this land for years.") },
  18: { title: msg("The Recording Studio | The Vessyl, Costa Rica"), description: msg("A working studio on the property and a dome you can track in. What is in the room, who it suits, how to book time.") },
  19: { title: msg("Eating Here | The Vessyl, Arenal Costa Rica"), description: msg("Two kitchens. El Rancho by the pool and Moloka inside, with one dinner a night at a long table. Walk-ins by reservation.") },
  20: { title: msg("El Rancho | The Vessyl, Arenal Costa Rica"), description: msg("Chef Devli Saul Mendoza cooks gallo pinto, pejibaye, achiote and cacao by the pool. Hours, the food, and how to reserve.") },
  21: { title: msg("Moloka | The Vessyl, Arenal Costa Rica"), description: msg("The indoor dining room at The Vessyl. One sitting a night, everybody at the same table. Book ahead, it is a small room.") },
  22: { title: msg("Property Buyouts | The Vessyl, Arenal Costa Rica"), description: msg("Take all fourteen units, the dome and 118 acres with nobody else on site. What a buyout includes and what it costs.") },
  23: { title: msg("Retreats | The Vessyl, Arenal Costa Rica"), description: msg("Bring your group and run your own programme in a dome built for sound. Capacity, the kitchen, the facilitators, the dates.") },
  24: { title: msg("Groups and Offsites | The Vessyl, Costa Rica"), description: msg("A whole property for a team of up to 33, with rooms to work in and a dome to end the day in. Capacity, rates, transfers.") },
  25: { title: msg("Weddings | The Vessyl, Arenal Costa Rica"), description: msg("A small wedding on 118 acres above the river, with one long table and a dome for afterwards. Capacity and what is included.") },
  26: { title: msg("The Arenal Area | The Vessyl, Costa Rica"), description: msg("Where we are, what is around us, and what the volcano, the lake and the hot springs are actually like, from people who live here.") },
  27: { title: msg("Getting Here | The Vessyl, Arenal Costa Rica"), description: msg("Three hours by car from San José, two and a half from Liberia, or fly Sansa into La Fortuna. Directions and transfers.") },
  28: { title: msg("Things to Do in Arenal | The Vessyl, Costa Rica"), description: msg("What is worth your time near La Fortuna, what is a tourist trap, and how long each one takes from the property.") }
};
