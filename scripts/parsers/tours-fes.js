/**
 * Tours from Fes Parser
 * Parses all tours starting from Fes
 */

export function parseFesTours() {
  return [
    {
      title: '2 Days Fes to Merzouga Desert Express Tour',
      slug: { current: '2-days-fes-merzouga-express' },
      departureCity: 'fes',
      duration: '2 Days',
      excerpt: 'Quick 2-day express tour from Fes to Merzouga. Experience the Sahara Desert with camel trekking and desert camping.',
      body: `Day 1: Fes → Middle Atlas → Ziz Valley → Merzouga
Depart from Fes in an air-conditioned 4x4 or minivan, driving through the scenic Middle Atlas Mountains with cedar forests, Berber villages, and panoramic landscapes. Pass through the stunning Ziz Valley, known for its lush palm groves and kasbahs, before arriving in Merzouga. Experience a sunset camel trek across the golden Erg Chebbi dunes.
Overnight in Merzouga desert at Tiziri Camp or Sahara Eden Camp

Day 2: Merzouga → Ziz Valley → Fes
Optional sunrise camel ride in the dunes for breathtaking photography. Return via Ziz Valley and Midelt, stopping at kasbahs and markets. Arrive in Fes in the evening, concluding your express Sahara adventure.`,
      included: [
        'Transport in an air-conditioned 4x4 or minivan for 2 days',
        'Experienced, knowledgeable driver/guide',
        '1 night accommodation in desert camp',
        'Camel ride in Erg Chebbi dunes at sunset',
        'Sandboarding in the dunes',
        'Optional desert activities',
      ],
      notIncluded: [
        'Lunches',
        'Beverages',
        'Tips',
        'Entry fees',
        'Personal expenses',
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Fes → Middle Atlas → Ziz Valley → Merzouga',
          description: 'Depart from Fes in an air-conditioned 4x4 or minivan, driving through the scenic Middle Atlas Mountains with cedar forests, Berber villages, and panoramic landscapes. Pass through the stunning Ziz Valley, known for its lush palm groves and kasbahs, before arriving in Merzouga. Experience a sunset camel trek across the golden Erg Chebbi dunes.',
          overnight: 'Merzouga desert at Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 2',
          title: 'Merzouga → Ziz Valley → Fes',
          description: 'Optional sunrise camel ride in the dunes for breathtaking photography. Return via Ziz Valley and Midelt, stopping at kasbahs and markets. Arrive in Fes in the evening, concluding your express Sahara adventure.',
          overnight: 'Fes accommodation',
        },
      ],
      focusAreas: ['adventure', 'sunsets'],
      seoKeywords: 'Fes Sahara tours, Merzouga camel trek, Erg Chebbi dunes, desert camp Morocco, Ziz Valley tour, Morocco desert adventure.',
      publishedAt: new Date().toISOString(),
    },
    {
      title: '3 Days Sahara Desert Tour from Fes to Merzouga',
      slug: { current: '3-days-fes-merzouga' },
      departureCity: 'fes',
      duration: '3 Days',
      excerpt: 'Explore the Sahara Desert on this 3-day tour from Fes. Experience camel trekking, desert camping, and Berber culture.',
      body: `Day 1: Fes → Ifrane → Midelt → Ziz Valley → Merzouga
Travel through Middle Atlas cedar forests and Berber villages. Stop at Midelt and the scenic Ziz Valley. Arrive in Merzouga and enjoy a sunset camel trek.
Overnight in desert camp – Tiziri Camp or Sahara Eden Camp

Day 2: Merzouga Desert Exploration
Wake up for a sunrise camel trek across Erg Chebbi dunes. Explore the desert with optional 4x4 excursions to remote trails. Visit Khamlia village for Gnawa music and enjoy tea with nomadic Berber families.
Overnight in desert camp – Tiziri Camp or Sahara Eden Camp
Optional activities: Trek to a desert oasis, learn to make Berber pizza in the sand, desert photography.

Day 3: Merzouga → Ziz Valley → Fes
Return via Ziz Valley and Midelt, stopping at kasbahs and markets. Optional sunrise camel ride before departure. Arrive in Fes in the evening.`,
      included: [
        'Transport in air-conditioned 4x4/minivan',
        '2 nights accommodation',
        'Camel rides at sunrise and sunset',
        'Sandboarding',
        'Experienced driver/guide',
        'Optional desert activities',
      ],
      notIncluded: [
        'Lunches',
        'Beverages',
        'Tips',
        'Entry fees',
        'Personal expenses',
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
          description: 'Travel through Middle Atlas cedar forests and Berber villages. Stop at Midelt and the scenic Ziz Valley. Arrive in Merzouga and enjoy a sunset camel trek.',
          overnight: 'Desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 2',
          title: 'Merzouga Desert Exploration',
          description: 'Wake up for a sunrise camel trek across Erg Chebbi dunes. Explore the desert with optional 4x4 excursions to remote trails. Visit Khamlia village for Gnawa music and enjoy tea with nomadic Berber families. Optional activities: Trek to a desert oasis, learn to make Berber pizza in the sand, desert photography.',
          overnight: 'Desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 3',
          title: 'Merzouga → Ziz Valley → Fes',
          description: 'Return via Ziz Valley and Midelt, stopping at kasbahs and markets. Optional sunrise camel ride before departure. Arrive in Fes in the evening.',
          overnight: 'Fes accommodation',
        },
      ],
      focusAreas: ['culture', 'music', 'adventure'],
      seoKeywords: '3-day Fes Sahara tour, Merzouga camel trekking, Erg Chebbi dunes, Ziz Valley Morocco, Sahara desert adventure.',
      publishedAt: new Date().toISOString(),
    },
    {
      title: '4 Days Fes to Sahara via Ziz Valley Tour',
      slug: { current: '4-days-fes-sahara-ziz-valley' },
      departureCity: 'fes',
      duration: '4 Days',
      excerpt: 'Immerse yourself in the Sahara Desert on this 4-day tour from Fes. Experience multiple nights in the desert with camel trekking and cultural experiences.',
      body: `Day 1: Fes → Ifrane → Midelt → Ziz Valley → Merzouga
Depart Fes in an air-conditioned 4x4 or minivan, traveling through the scenic Middle Atlas Mountains with cedar forests and traditional Berber villages. Stop in Midelt and pass through the Ziz Valley, famous for its lush palm groves and kasbahs. Arrive in Merzouga and enjoy a sunset camel trek into the golden Erg Chebbi dunes.
Overnight in Merzouga desert camp – Tiziri Camp or Sahara Eden Camp
Optional activities: Trek to a nearby desert oasis or learn to make Berber pizza in the sand.

Day 2: Sahara Desert Full Day
Wake up for a sunrise camel trek across the dunes for stunning desert photography. Spend the day exploring Erg Chebbi with optional 4x4 desert excursions to remote trails. Visit nomadic Berber families for tea and cultural insight. Enjoy sandboarding or simply relax in the tranquility of the Sahara.
Overnight in Merzouga desert camp – Tiziri Camp or Sahara Eden Camp
Optional activities: Desert oasis trekking, making Berber pizza, or stargazing with Berber music.

Day 3: Merzouga → Rissani → Ziz Valley → Desert Camp
Depart Merzouga for a scenic drive through Rissani and the Ziz Valley, stopping to photograph palm oases and kasbahs. Continue back to the desert for a second night under the dunes.
Overnight in Merzouga desert camp – Tiziri Camp or Sahara Eden Camp
Optional activities: Evening camel ride at sunset, sandboarding, or Berber cultural experiences.

Day 4: Merzouga → Ziz Valley → Fes
Optional sunrise camel ride in the dunes. Return through Ziz Valley and Midelt, stopping at kasbahs and local markets. Arrive in Fes in the evening, concluding your immersive 4-day Sahara adventure.`,
      included: [
        'Transport in air-conditioned 4x4/minivan for all 4 days',
        '3 nights accommodation (all in desert camp)',
        'Camel rides at sunrise and sunset',
        'Sandboarding in the dunes',
        'Experienced, knowledgeable driver/guide',
        'Optional desert activities',
      ],
      notIncluded: [
        'Lunches',
        'Beverages',
        'Tips',
        'Entry fees',
        'Personal expenses',
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
          description: 'Depart Fes in an air-conditioned 4x4 or minivan, traveling through the scenic Middle Atlas Mountains with cedar forests and traditional Berber villages. Stop in Midelt and pass through the Ziz Valley, famous for its lush palm groves and kasbahs. Arrive in Merzouga and enjoy a sunset camel trek into the golden Erg Chebbi dunes. Optional activities: Trek to a nearby desert oasis or learn to make Berber pizza in the sand.',
          overnight: 'Merzouga desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 2',
          title: 'Sahara Desert Full Day',
          description: 'Wake up for a sunrise camel trek across the dunes for stunning desert photography. Spend the day exploring Erg Chebbi with optional 4x4 desert excursions to remote trails. Visit nomadic Berber families for tea and cultural insight. Enjoy sandboarding or simply relax in the tranquility of the Sahara. Optional activities: Desert oasis trekking, making Berber pizza, or stargazing with Berber music.',
          overnight: 'Merzouga desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 3',
          title: 'Merzouga → Rissani → Ziz Valley → Desert Camp',
          description: 'Depart Merzouga for a scenic drive through Rissani and the Ziz Valley, stopping to photograph palm oases and kasbahs. Continue back to the desert for a second night under the dunes. Optional activities: Evening camel ride at sunset, sandboarding, or Berber cultural experiences.',
          overnight: 'Merzouga desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 4',
          title: 'Merzouga → Ziz Valley → Fes',
          description: 'Optional sunrise camel ride in the dunes. Return through Ziz Valley and Midelt, stopping at kasbahs and local markets. Arrive in Fes in the evening, concluding your immersive 4-day Sahara adventure.',
          overnight: 'Fes accommodation',
        },
      ],
      focusAreas: ['culture', 'sunsets', 'music', 'adventure'],
      seoKeywords: '4-day Fes desert tour, Merzouga camel trekking, Erg Chebbi dunes, Ziz Valley Morocco, Sahara adventure Morocco.',
      publishedAt: new Date().toISOString(),
    },
    {
      title: '6 Days Middle Atlas & Sahara Desert Tour from Fes',
      slug: { current: '6-days-middle-atlas-sahara-fes' },
      departureCity: 'fes',
      duration: '6 Days',
      excerpt: 'Experience the breathtaking landscapes of Morocco on this 6-day Middle Atlas and Sahara Desert adventure from Fes. Journey through cedar forests, traditional Berber villages, scenic Ziz Valley, and the golden Erg Chebbi dunes.',
      body: `Day 1: Fes → Ifrane → Azrou → Midelt → Ziz Valley
Depart from Fes in an air-conditioned 4x4 or minivan and traverse the Middle Atlas Mountains, home to lush cedar forests and roaming Barbary monkeys. Visit the picturesque Berber villages of Ifrane and Azrou, known for their charming architecture and local markets. Continue through Midelt, famous for its stunning mountain scenery, and drive into the Ziz Valley, one of Morocco's most scenic palm-lined oases.
Overnight in Midelt at Villa Midelt Or Pomme D'or

Day 2: Ziz Valley → Erfoud → Merzouga
Drive through the dramatic landscapes of Erfoud, a gateway town to the Sahara Desert, known for its fossil quarries and desert scenery. Arrive in Merzouga, where you embark on a sunset camel trek across the golden Erg Chebbi dunes, capturing stunning desert photographs as the sun sets over the Sahara.
Overnight in Merzouga luxury desert camp – Tiziri Camp or Sahara Eden Camp
Optional activity: Evening desert stroll and stargazing under the Sahara sky.

Day 3-4: Erg Chebbi Desert Exploration
Wake up early for a sunrise camel ride over the dunes, and spend two full days exploring the vast Erg Chebbi desert. Enjoy sandboarding on the golden dunes, photography sessions, and 4x4 desert excursions to remote trails and Berber villages. Visit nomadic Berber families for tea and cultural insight, and immerse yourself in local desert traditions.
Optional activities:
• Trekking to a nearby desert oasis to discover hidden palms and natural springs
• Learning to make traditional Berber pizza in the sand with guidance from local Berber cooks
Overnight in desert camp – Tiziri Camp or Sahara Eden Camp

Day 5: Merzouga → Rissani → Erfoud → Tinghir → Todra Gorge
Depart Merzouga and visit the historic town of Rissani, exploring its bustling souks with spices, dates, and handmade crafts. Continue to Erfoud, a desert gateway famous for its fossils and Sahara landscapes. Travel through Tinghir, a scenic town at the entrance of the Todra region, with palm-lined valleys and traditional Berber villages. Arrive at the majestic Todra Gorge, a dramatic canyon with towering cliffs ideal for photography and short walks.
Overnight in Todra Gorge – Kasbah Riad Le Festival
Optional activity: Evening stroll or photography at Todra Gorge cliffs.

Day 6: Todra Gorge → Middle Atlas Mountains → Fes
Leave Todra Gorge and drive through the Middle Atlas Mountains, passing cedar forests, authentic Berber villages, and scenic viewpoints. Enjoy stops for photos and local culture insights along the route. Continue your journey back to Fes, arriving in the evening, concluding your 6-day Middle Atlas and Sahara Desert tour from Fes.`,
      included: [
        'Air-conditioned 4x4 or minivan for all 6 days',
        '5 nights accommodation',
        'Dinner and breakfast daily',
        'Camel rides at sunrise and sunset in Erg Chebbi',
        'Sandboarding on Sahara dunes',
        'Experienced, knowledgeable driver and local guide',
        'Optional desert activities: trekking to oasis, Berber pizza, stargazing, 4x4 excursions',
      ],
      notIncluded: [
        'Lunches during the tour',
        'Beverages (tea, soft drinks, bottled water, alcohol)',
        'Tips for driver/guide',
        'Entrance fees to attractions',
        'Personal expenses',
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Fes → Ifrane → Azrou → Midelt → Ziz Valley',
          description: 'Depart from Fes in an air-conditioned 4x4 or minivan and traverse the Middle Atlas Mountains, home to lush cedar forests and roaming Barbary monkeys. Visit the picturesque Berber villages of Ifrane and Azrou, known for their charming architecture and local markets. Continue through Midelt, famous for its stunning mountain scenery, and drive into the Ziz Valley, one of Morocco\'s most scenic palm-lined oases.',
          overnight: 'Midelt at Villa Midelt Or Pomme D\'or',
        },
        {
          day: 'Day 2',
          title: 'Ziz Valley → Erfoud → Merzouga',
          description: 'Drive through the dramatic landscapes of Erfoud, a gateway town to the Sahara Desert, known for its fossil quarries and desert scenery. Arrive in Merzouga, where you embark on a sunset camel trek across the golden Erg Chebbi dunes, capturing stunning desert photographs as the sun sets over the Sahara. Optional activity: Evening desert stroll and stargazing under the Sahara sky.',
          overnight: 'Merzouga luxury desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 3-4',
          title: 'Erg Chebbi Desert Exploration',
          description: 'Wake up early for a sunrise camel ride over the dunes, and spend two full days exploring the vast Erg Chebbi desert. Enjoy sandboarding on the golden dunes, photography sessions, and 4x4 desert excursions to remote trails and Berber villages. Visit nomadic Berber families for tea and cultural insight, and immerse yourself in local desert traditions. Optional activities: Trekking to a nearby desert oasis or learning to make traditional Berber pizza in the sand.',
          overnight: 'Desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 5',
          title: 'Merzouga → Rissani → Erfoud → Tinghir → Todra Gorge',
          description: 'Depart Merzouga and visit the historic town of Rissani, exploring its bustling souks with spices, dates, and handmade crafts. Continue to Erfoud, a desert gateway famous for its fossils and Sahara landscapes. Travel through Tinghir, a scenic town at the entrance of the Todra region, with palm-lined valleys and traditional Berber villages. Arrive at the majestic Todra Gorge, a dramatic canyon with towering cliffs ideal for photography and short walks.',
          overnight: 'Todra Gorge – Kasbah Riad Le Festival',
        },
        {
          day: 'Day 6',
          title: 'Todra Gorge → Middle Atlas Mountains → Fes',
          description: 'Leave Todra Gorge and drive through the Middle Atlas Mountains, passing cedar forests, authentic Berber villages, and scenic viewpoints. Enjoy stops for photos and local culture insights along the route. Continue your journey back to Fes, arriving in the evening, concluding your 6-day Middle Atlas and Sahara Desert tour from Fes.',
          overnight: 'Fes accommodation',
        },
      ],
      focusAreas: ['culture', 'adventure', 'photography'],
      seoKeywords: '6-day Fes Sahara tour, Erg Chebbi camel trekking, Morocco desert adventure, Ziz Valley Morocco, Middle Atlas mountains tour, Merzouga desert camp, Berber cultural experience, sandboarding in Erg Chebbi, Draa Valley tour, Ouarzazate sightseeing, Sahara desert photography, nomadic Berber families Morocco.',
      publishedAt: new Date().toISOString(),
    },
    {
      title: '8 Days Desert & Imperial Cities Tour from Fes',
      slug: { current: '8-days-desert-imperial-cities-fes' },
      departureCity: 'fes',
      duration: '8 Days',
      excerpt: 'Embark on an unforgettable 8-day Morocco desert and imperial cities adventure from Fes. Experience the stunning Middle Atlas Mountains, Ziz Valley, golden Erg Chebbi dunes, Draa Valley palm oases, and the vibrant imperial cities of Marrakech.',
      body: `Day 1: Fes → Ifrane → Midelt → Ziz Valley → Merzouga
Depart Fes in an air-conditioned 4x4 or minivan and drive through the scenic Middle Atlas Mountains, stopping in Ifrane, often called the "Switzerland of Morocco," and the charming Berber town of Midelt. Pass through the palm-lined Ziz Valley, with dramatic landscapes and traditional Berber villages. Arrive in Merzouga in the late afternoon and witness the magic of the Sahara Desert at sunset.
Overnight in Merzouga desert camp – Tiziri Camp or Sahara Eden Camp
Optional activity: Evening stargazing and traditional Berber music around the campfire.

Day 2: Erg Chebbi Desert – Camel Trek & Sunset
Wake up to the mesmerizing dunes of Erg Chebbi. Enjoy a sunrise camel trek across the golden sands, perfect for desert photography. Spend the day exploring the dunes and surrounding desert landscapes. In the evening, take a sunset camel ride, capturing the Sahara's breathtaking colors.
Overnight in Merzouga desert camp – Tiziri Camp or Sahara Eden Camp
Optional activities: Sandboarding on the dunes, trekking to a desert oasis, or learning to make Berber pizza in the sand.

Day 3-4: Full Sahara Desert Exploration
Spend two full days immersing yourself in the Sahara Desert experience:
• Sunrise and sunset camel rides in Erg Chebbi dunes
• Sandboarding, photography, and desert exploration
• Visit nomadic Berber families, enjoy traditional tea, and learn about desert culture
• Optional 4x4 excursions through remote desert trails and panoramic viewpoints
Overnight in Merzouga desert camp – Tiziri Camp or Sahara Eden Camp

Day 5: Merzouga → Rissani → Erfoud → Todra Gorge / Dades Gorges
Depart Merzouga and stop in Rissani, exploring its vibrant souks filled with spices, dates, and handmade crafts. Continue through Erfoud, known for its fossil quarries and desert landscapes, and then drive to Tinghir at the entrance of Todra Gorge. Explore the dramatic Todra Gorge cliffs, ideal for photography and short walks at the end of the day arrival at the Dades Valley where you will spend the night.
Overnight in Dades Gorge – Dar Blues Or Dades Paradise
Optional activity: Evening stroll or sunset photography at the gorge.

Day 6: Todra Gorge → High Atlas Mountains → Marrakech
Travel through the scenic High Atlas Mountains, passing traditional Berber villages and dramatic gorges. Stop for photos and optional visits to local kasbahs, including Kasbah Taourirt. Arrive in Marrakech in the evening for overnight stay.
Overnight in Marrakech – Riad Nessma or Dar Anika

Day 7: Marrakech City Tour
Explore the vibrant Marrakech Medina, bustling souks, colorful Moroccan markets, and historical landmarks. Optional activities include a traditional Moroccan cooking class or a relaxing hammam spa experience.
Overnight in Marrakech – Riad Nessma or Dar Anika

Day 8: Departure / Optional Extension
Enjoy your last morning in Marrakech before a convenient airport transfer or continue your journey with an optional excursion to:
• Essaouira – Explore the coastal Medina, UNESCO-listed port, and seafood markets
• Casablanca – Visit the Hassan II Mosque, Corniche, and other Moroccan highlights`,
      included: [
        'Air-conditioned 4x4 or minivan for all 8 days',
        '7 nights accommodation',
        '5 Dinner meals',
        'Breakfast daily',
        'Camel rides at sunrise and sunset in Erg Chebbi',
        'Sandboarding on the desert dunes',
        'Experienced, knowledgeable driver and local guide',
        'Optional desert activities: trekking to oasis, Berber pizza, 4x4 excursions',
      ],
      notIncluded: [
        'Lunches during the tour',
        'Beverages (tea, soft drinks, bottled water, alcohol)',
        'Tips for driver/guide',
        'Entrance fees to attractions',
        'Personal expenses',
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
          description: 'Depart Fes in an air-conditioned 4x4 or minivan and drive through the scenic Middle Atlas Mountains, stopping in Ifrane, often called the "Switzerland of Morocco," and the charming Berber town of Midelt. Pass through the palm-lined Ziz Valley, with dramatic landscapes and traditional Berber villages. Arrive in Merzouga in the late afternoon and witness the magic of the Sahara Desert at sunset. Optional activity: Evening stargazing and traditional Berber music around the campfire.',
          overnight: 'Merzouga desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 2',
          title: 'Erg Chebbi Desert – Camel Trek & Sunset',
          description: 'Wake up to the mesmerizing dunes of Erg Chebbi. Enjoy a sunrise camel trek across the golden sands, perfect for desert photography. Spend the day exploring the dunes and surrounding desert landscapes. In the evening, take a sunset camel ride, capturing the Sahara\'s breathtaking colors. Optional activities: Sandboarding on the dunes, trekking to a desert oasis, or learning to make Berber pizza in the sand.',
          overnight: 'Merzouga desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 3-4',
          title: 'Full Sahara Desert Exploration',
          description: 'Spend two full days immersing yourself in the Sahara Desert experience: Sunrise and sunset camel rides in Erg Chebbi dunes, sandboarding, photography, and desert exploration, visit nomadic Berber families, enjoy traditional tea, and learn about desert culture. Optional 4x4 excursions through remote desert trails and panoramic viewpoints.',
          overnight: 'Merzouga desert camp – Tiziri Camp or Sahara Eden Camp',
        },
        {
          day: 'Day 5',
          title: 'Merzouga → Rissani → Erfoud → Todra Gorge / Dades Gorges',
          description: 'Depart Merzouga and stop in Rissani, exploring its vibrant souks filled with spices, dates, and handmade crafts. Continue through Erfoud, known for its fossil quarries and desert landscapes, and then drive to Tinghir at the entrance of Todra Gorge. Explore the dramatic Todra Gorge cliffs, ideal for photography and short walks at the end of the day arrival at the Dades Valley where you will spend the night.',
          overnight: 'Dades Gorge – Dar Blues Or Dades Paradise',
        },
        {
          day: 'Day 6',
          title: 'Todra Gorge → High Atlas Mountains → Marrakech',
          description: 'Travel through the scenic High Atlas Mountains, passing traditional Berber villages and dramatic gorges. Stop for photos and optional visits to local kasbahs, including Kasbah Taourirt. Arrive in Marrakech in the evening for overnight stay.',
          overnight: 'Marrakech – Riad Nessma or Dar Anika',
        },
        {
          day: 'Day 7',
          title: 'Marrakech City Tour',
          description: 'Explore the vibrant Marrakech Medina, bustling souks, colorful Moroccan markets, and historical landmarks. Optional activities include a traditional Moroccan cooking class or a relaxing hammam spa experience.',
          overnight: 'Marrakech – Riad Nessma or Dar Anika',
        },
        {
          day: 'Day 8',
          title: 'Departure / Optional Extension',
          description: 'Enjoy your last morning in Marrakech before a convenient airport transfer or continue your journey with an optional excursion to Essaouira (coastal Medina, UNESCO-listed port, and seafood markets) or Casablanca (Hassan II Mosque, Corniche, and other Moroccan highlights).',
          overnight: 'Airport drop-off or extension',
        },
      ],
      focusAreas: ['culture', 'sunsets', 'music', 'adventure', 'photography'],
      seoKeywords: '8-day Fes desert tour, Morocco desert and imperial cities, Erg Chebbi camel trek, Middle Atlas Mountains, Ziz Valley Morocco, Marrakech city tour, Berber cultural experience, Sahara adventure Morocco.',
      publishedAt: new Date().toISOString(),
    },
  ]
}

