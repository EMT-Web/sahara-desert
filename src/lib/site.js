// Shared site constants used by the header, footer, WhatsApp links and the
// homepage. Content that editors change often (tours, contact details) still
// lives in Sanity. This file only holds structure and fallbacks.

// Real number, used only when the Sanity contact document has no whatsapp field.
export const FALLBACK_WHATSAPP = '212670707151'

export function whatsappHref(number, message) {
  const digits = String(number || FALLBACK_WHATSAPP).replace(/\D/g, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${text}`
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello! I'm planning a trip to Morocco and would love help with a Sahara Desert tour."

// Departure-city hubs. Each has a static route under /tours/<slug>.
export const DEPARTURE_CITIES = [
  {
    slug: 'marrakech',
    name: 'Marrakech',
    tagline: 'Over the High Atlas to the dunes',
    image: '/images/image00032.jpeg',
    imageAlt: 'Kasbah village and mountains on the road south from Marrakech',
  },
  {
    slug: 'fes',
    name: 'Fes',
    tagline: 'Cedar forests, Middle Atlas and Merzouga',
    image: '/images/image00017.jpeg',
    imageAlt: 'Travellers on a camel trek in the Erg Chebbi dunes',
  },
  {
    slug: 'casablanca',
    name: 'Casablanca',
    tagline: 'Grand circuits from the Atlantic coast',
    image: '/images/fort2.jpg',
    imageAlt: 'Taourirt kasbah in Ouarzazate under a blue sky',
  },
  {
    slug: 'agadir',
    name: 'Agadir',
    tagline: 'From the ocean to the Sahara',
    image: '/images/image00025.jpeg',
    imageAlt: 'Soft golden dunes of the Sahara at first light',
  },
  {
    slug: 'errachidia',
    name: 'Errachidia',
    tagline: 'The shortest road to Erg Chebbi',
    image: '/images/image00060.jpeg',
    imageAlt: 'Seasonal lake among the Merzouga dunes',
  },
]

// Primary navigation. Every link is rendered in the HTML (dropdowns are only
// hidden with CSS) so crawlers can discover the hubs from every page.
export const NAV_GROUPS = [
  {
    title: 'Tours',
    href: '/tours',
    intro: 'Private and small-group journeys from every major Moroccan city.',
    columns: [
      {
        heading: 'By departure city',
        links: DEPARTURE_CITIES.map((c) => ({ title: `From ${c.name}`, url: `/tours/${c.slug}` })),
      },
      {
        heading: 'By travel style',
        links: [
          { title: 'All Sahara & Morocco Tours', url: '/tours' },
          { title: 'Luxury Desert Camps', url: '/luxury-desert-camps' },
          { title: 'Honeymoon Tours', url: '/honeymoon-morocco-tours' },
          { title: 'Family Tours', url: '/family-morocco-tours' },
          { title: 'Tailor-Made Private Trip', url: '/contact' },
        ],
      },
    ],
    feature: {
      title: 'Plan a private journey',
      text: 'Tell us your dates. We design the route.',
      url: '/contact',
      image: '/images/desert9.jpeg',
    },
  },
  {
    title: 'Sahara Desert',
    href: '/merzouga-erg-chebbi',
    columns: [
      {
        heading: 'The desert',
        links: [
          { title: 'Merzouga & Erg Chebbi Guide', url: '/merzouga-erg-chebbi' },
          { title: 'Luxury Desert Camps', url: '/luxury-desert-camps' },
          { title: 'Photo Gallery', url: '/gallery' },
        ],
      },
    ],
  },
  {
    title: 'Experiences',
    href: '/culture',
    columns: [
      {
        heading: 'Culture & people',
        links: [
          { title: 'Berber Culture', url: '/culture' },
          { title: 'Music of the Sahara', url: '/music' },
          { title: 'Meet Our Guides', url: '/guides' },
          { title: 'Responsible Travel', url: '/sustainability' },
        ],
      },
    ],
  },
  {
    title: 'Travel Guide',
    href: '/blog',
    columns: [
      {
        heading: 'Plan & read',
        links: [
          { title: 'Travel Blog', url: '/blog' },
          { title: 'Stories from the Desert', url: '/stories' },
        ],
      },
    ],
  },
  {
    title: 'About',
    href: '/about',
    columns: [
      {
        heading: 'Visit Sahara Desert',
        links: [
          { title: 'About Us', url: '/about' },
          { title: 'Our Guides', url: '/guides' },
          { title: 'Contact', url: '/contact' },
        ],
      },
    ],
  },
]
