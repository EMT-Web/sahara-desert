// One-off: adds the 7 day Marrakech Dakar trails tour (Tafraoute Sidi Ali, Remlia, Ouzina, Merzouga).
// Usage: SANITY_API_TOKEN=... node scripts/add-dakar-trails-tour.mjs   (createOrReplace, safe to rerun)
// Without a token it only prints the document (dry run).
import { createClient } from '@sanity/client'

const tour = {
  _id: 'tour-7-days-marrakech-dakar-trails-ouzina-remlia-tafraoute-sidi-ali',
  _type: 'tour',
  title: '7 Day Sahara Expedition on the Dakar Rally Trails: Tafraoute Sidi Ali, Remlia, Ouzina and Merzouga',
  slug: { _type: 'slug', current: '7-days-marrakech-dakar-trails-ouzina-remlia-tafraoute-sidi-ali' },
  departureCity: 'marrakech',
  duration: '7 Days / 6 Nights',
  excerpt:
    'A private 4x4 expedition from Marrakech along the old Paris Dakar Rally trails of southeastern Morocco: the hidden oasis of Tafraoute Sidi Ali, the wild dunes of Remlia, a night at Erg Ouzina, then camels and two nights in the Erg Chebbi dunes of Merzouga before returning to Marrakech through the Todra and Dades gorges.',
  body:
    'This is the Sahara most travelers never see. Beyond Zagora and south of Merzouga, the desert opens into vast stony plains (the hamada), dry riverbeds and quiet dune seas that the Paris Dakar Rally once crossed. We follow those trails in a private 4x4 with an experienced desert driver, linking Tafraoute Sidi Ali, the Remlia dunes and Erg Ouzina, places with almost no tourism and an extraordinary silence.\n\n' +
    'The route then reaches Merzouga, where you ride camels into Erg Chebbi, the highest dunes in Morocco, and spend two nights in a comfortable desert camp. The return to Marrakech crosses the Todra Gorge, the Dades Valley and the High Atlas, so in one week you see kasbahs, oases, gorges, mountains and three very different deserts.\n\n' +
    'The tour is fully private and can be shortened to 6 days, extended, or finished in Fes instead of Marrakech. Off road sections depend on weather and track conditions, and your driver always chooses the safest line.',
  highlights: [
    'Follow the legendary Paris Dakar Rally trails in a private 4x4',
    'Tafraoute Sidi Ali, a remote oasis village on the edge of the hamada',
    'The wild golden dunes of Remlia (Ramlia), far from the crowds',
    'A night in the desert at Erg Ouzina, south of Merzouga',
    'Camel trek into Erg Chebbi at sunset and two nights in a desert camp',
    'Taouz rock engravings, Khamlia Gnawa music and nomad families',
    'Ait Ben Haddou, the Draa Valley, Todra Gorge and Dades Valley',
  ],
  included: [
    'Private air conditioned 4x4 (Toyota Land Cruiser or similar) with fuel',
    'Professional English speaking driver guide experienced on desert trails',
    'Pickup and drop off at your Riad, hotel or Marrakech airport',
    '6 nights accommodation: kasbah and guesthouse stays, a desert night in Ouzina and 2 nights in an Erg Chebbi camp',
    'Daily breakfast and dinner (half board) throughout',
    'Camel trek into the Erg Chebbi dunes at sunset',
    'Visits to Khamlia village (Gnawa music) and a nomad family',
    'Bottled water in the vehicle',
  ],
  notIncluded: [
    'Lunches and drinks',
    'Entrance fees to kasbahs and monuments',
    'Local guides where hired (for example in Ait Ben Haddou)',
    'Optional activities such as sandboarding or quad biking',
    'Travel insurance',
    'Tips and personal expenses',
  ],
  itinerary: [
    {
      _key: 'd1', _type: 'object', day: 'Day 1',
      title: 'Marrakech, Tizi n Tichka, Ait Ben Haddou, Ouarzazate, Agdz',
      description:
        'Pickup in Marrakech in the morning and cross the High Atlas over the Tizi n Tichka pass, the highest road pass in North Africa, with photo stops above Berber villages. Visit the UNESCO listed fortified village of Ait Ben Haddou, then continue through Ouarzazate and over the Anti Atlas to Agdz, at the head of the Draa Valley, for the night in a kasbah among the palm groves.',
      overnight: 'Kasbah guesthouse in Agdz (Draa Valley)',
    },
    {
      _key: 'd2', _type: 'object', day: 'Day 2',
      title: 'Draa Valley, Zagora, Dakar trails to Tafraoute Sidi Ali',
      description:
        'Follow the Draa Valley, the longest river valley in Morocco, past mud brick ksour and endless date palms to Zagora. Here the tarmac gives way to the desert: we switch to the old Dakar Rally trails across the hamada, dry riverbeds and black rock plateaus, heading east to Tafraoute Sidi Ali, a small and very remote oasis near the Mharech area. Sunset over the stony desert and dinner in a family run guesthouse.',
      overnight: 'Guesthouse in Tafraoute Sidi Ali',
    },
    {
      _key: 'd3', _type: 'object', day: 'Day 3',
      title: 'Tafraoute Sidi Ali, Remlia dunes, Erg Ouzina',
      description:
        'A full day of desert driving on the rally pistes. Cross wide sandy plains and acacia dotted wadis to the dunes of Remlia (Ramlia), a beautiful and little visited sand sea where you can walk the crests and enjoy total silence. Continue to Erg Ouzina, an isolated dune field south of Merzouga, in time for sunset. Dinner under the stars and a night far from any town.',
      overnight: 'Desert camp at Erg Ouzina',
    },
    {
      _key: 'd4', _type: 'object', day: 'Day 4',
      title: 'Ouzina, Taouz, Khamlia, camel trek into Erg Chebbi',
      description:
        'Sunrise over Ouzina, then drive north along the Algerian border trail to Taouz to see ancient rock engravings on the black hills. Visit Khamlia, a village of Gnawa musicians whose rhythms came with the old trans Saharan caravans. In the late afternoon, meet your camels at the edge of Erg Chebbi and ride into the highest dunes in Morocco for sunset, arriving at camp for dinner, music around the fire and a sky full of stars.',
      overnight: 'Desert camp in Erg Chebbi, Merzouga',
    },
    {
      _key: 'd5', _type: 'object', day: 'Day 5',
      title: 'A full day in Merzouga and Erg Chebbi',
      description:
        'Watch the sunrise from the top of a dune, then enjoy a relaxed day around Erg Chebbi: visit a nomad family for tea, see the seasonal lake Dayet Srji when it holds water, explore the old caravan town of Rissani and its market, or try sandboarding and quad biking (optional). Back to camp for a second evening in the dunes.',
      overnight: 'Desert camp in Erg Chebbi, Merzouga',
    },
    {
      _key: 'd6', _type: 'object', day: 'Day 6',
      title: 'Merzouga, Erfoud, Todra Gorge, Dades Valley',
      description:
        'Leave the desert via Erfoud, known for its fossils, and the Tinjdad oasis. Walk between the towering red walls of the Todra Gorge, then continue along the Road of a Thousand Kasbahs to the Dades Valley, with its strange rock formations and winding road. Night in a Riad or hotel with views over the valley.',
      overnight: 'Riad or hotel in the Dades Valley',
    },
    {
      _key: 'd7', _type: 'object', day: 'Day 7',
      title: 'Dades Valley, Valley of Roses, Skoura, Marrakech',
      description:
        'Drive through Kelaat Mgouna, the Valley of Roses, and the palm groves of Skoura with their old kasbahs, then cross the High Atlas once more over the Tizi n Tichka pass. Arrival in Marrakech in the late afternoon and drop off at your Riad, hotel or the airport.',
      overnight: 'End of tour in Marrakech',
    },
  ],
  focusAreas: ['adventure', 'photography', 'sunsets', 'culture'],
  seoKeywords:
    'Dakar rally trails Morocco, Ouzina, Erg Ouzina, Remlia dunes, Ramlia, Tafraoute Sidi Ali, 4x4 Sahara tour from Marrakech, Merzouga off road tour, 7 day Morocco desert tour, Taouz, Erg Chebbi',
  publishedAt: new Date().toISOString(),
}

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.log(JSON.stringify(tour, null, 2))
  console.log('\nDry run only (no SANITY_API_TOKEN).')
  process.exit(0)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2nicu1vl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Reuse the main photo of an existing Merzouga camel tour so the card and hero match the site's style.
const donor = await client.fetch(
  `*[_type=="tour" && defined(mainImage) && slug.current match "*merzouga*"][0]{mainImage, gallery}`
)
if (donor?.mainImage) tour.mainImage = donor.mainImage
if (donor?.gallery?.length) tour.gallery = donor.gallery.slice(0, 6)

const res = await client.createOrReplace(tour)
console.log('Published', res._id, 'image:', !!tour.mainImage)
