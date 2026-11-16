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
      image: '/images/image00036.jpeg',
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

// Legal operator. Visit Sahara Desert is a brand of Escorted Morocco Tours
// (EMT): every contract, invoice, receipt and payment is issued in EMT's name.
// Used by the About page, footer, Terms and the Organization JSON-LD.
// Links to OPERATOR.url are rel="nofollow" on purpose: the sitewide link
// between the two owned domains must not pass ranking signals.
export const OPERATOR = {
  name: 'Escorted Morocco Tours',
  shortName: 'EMT',
  url: 'https://www.escortedmoroccotours.com',
  country: 'Morocco',
  // Official company details, as used on EMT invoices.
  legalName: 'Escorted Morocco Tours SARLAU',
  ice: '003967997000096',
  streetAddress: 'Dr Taftchna, Commune Taftchna',
  locality: 'Zagora',
  // Tour-operator licence number: not yet provided. Add it here as
  // `licenceNumber` and it should be shown next to the ICE on /about.
}

export const OPERATOR_FAQS = [
  {
    question: 'Who operates Visit Sahara Desert?',
    answer: 'Visit Sahara Desert is a brand operated by Escorted Morocco Tours (EMT), a licensed Moroccan tour operator. EMT is the legal company behind every Visit Sahara Desert tour: it holds the operating licence, contracts the drivers, guides, camps and hotels, and is responsible for your trip from the first quote to the final transfer.',
  },
  {
    question: 'Who do I pay, and whose name appears on my booking documents?',
    answer: 'All payments are made to Escorted Morocco Tours (EMT). Your booking confirmation, invoice, receipts and any bank-transfer or card-payment details are issued in the name of Escorted Morocco Tours. If you are ever asked to pay a private individual or a company other than EMT for a Visit Sahara Desert tour, please contact us before sending any money.',
  },
  {
    question: 'Is Visit Sahara Desert a licensed tour operator?',
    answer: 'Yes. Tours are run under the licence of Escorted Morocco Tours (EMT), a registered and licensed Moroccan tour operator. Our vehicles are authorised for tourist transport, our drivers and guides are professionally licensed, and every booking is backed by an official EMT contract and invoice.',
  },
]
