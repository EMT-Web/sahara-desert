// Picks card photos so that no two tours in the same list show the same
// picture. A tour keeps its Sanity mainImage unless an earlier card in the list
// already used that exact asset (or it has none); then it gets an unused local
// photo, preferring ones that fit its departure city.

const CITY_POOLS = {
  marrakech: ['/images/desert3.jpeg', '/images/fort.jpg', '/images/image00032.jpeg', '/images/image00042.jpeg', '/images/desert4.jpeg'],
  fes: ['/images/image00016.jpeg', '/images/image00008.jpeg', '/images/desert2.jpeg', '/images/image00019.jpeg', '/images/image00021.jpeg'],
  agadir: ['/images/desert8.jpeg', '/images/image00011.jpeg', '/images/image00026.jpeg', '/images/image00044.jpeg', '/images/image00009.jpeg'],
  casablanca: ['/images/image00012.jpeg', '/images/image00027.jpeg', '/images/image00002.jpeg', '/images/fort2.jpg', '/images/houses_in_desert.jpeg'],
  errachidia: ['/images/image00059.jpeg', '/images/camels2.jpeg', '/images/image00065.jpeg', '/images/desert_midday.jpeg', '/images/image00055.jpeg'],
}

// Every other landscape / experience photo that crops well to a 4:3 card.
const GENERAL_POOL = [
  '/images/camels.jpeg', '/images/camels_farview.jpeg', '/images/desert1.jpeg', '/images/desert5.jpg',
  '/images/desert7.jpeg', '/images/image00003.jpeg', '/images/image00007.jpeg', '/images/image00010.jpeg',
  '/images/image00018.jpeg', '/images/image00020.jpeg', '/images/image00023.jpeg', '/images/image00028.jpeg',
  '/images/image00029.jpeg', '/images/image00030.jpeg', '/images/image00031.jpeg', '/images/image00035.jpeg',
  '/images/image00040.jpeg', '/images/image00043.jpeg', '/images/image00045.jpeg', '/images/image00048.jpeg',
  '/images/image00050.jpeg', '/images/image00051.jpeg', '/images/image00053.jpeg', '/images/image00056.jpeg',
  '/images/image00057.jpeg', '/images/image00058.jpeg', '/images/image00068.jpeg', '/images/car_in_desert.jpeg',
  '/images/desert6.jpg', '/images/image00013.jpeg', '/images/image00014.jpeg', '/images/image00005.jpeg',
]

const ALL = [...new Set([...Object.values(CITY_POOLS).flat(), ...GENERAL_POOL])]

function hash(str = '') {
  return str.split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 7)
}

export function imageRef(image) {
  return image?.asset?._ref || image?._ref || image?.asset?._id || null
}

// Stable single fallback, used when a card is rendered on its own.
export function fallbackImageFor(tour) {
  const pool = CITY_POOLS[tour?.departureCity?.toLowerCase()] || GENERAL_POOL
  return pool[hash(tour?._id || tour?.slug?.current || tour?.title) % pool.length]
}

// Returns the tours with a `cardImage` string set on those that need a local
// photo. `exclude` lets a page reserve images it already shows elsewhere.
export function withUniqueCardImages(tours = [], { exclude = [] } = {}) {
  const used = new Set(exclude.filter(Boolean))
  return tours.map((tour) => {
    const ref = imageRef(tour.mainImage)
    if (ref && !used.has(ref)) {
      used.add(ref)
      return tour
    }
    const cityPool = CITY_POOLS[tour.departureCity?.toLowerCase()] || []
    const start = hash(tour._id || tour.slug?.current || tour.title)
    const candidates = [...cityPool, ...GENERAL_POOL.slice(start % GENERAL_POOL.length), ...GENERAL_POOL]
    let pick = candidates.find((src) => !used.has(src))
    // More tours needing photos than photos available: reuse, spread by id.
    if (!pick) pick = ALL[start % ALL.length]
    used.add(pick)
    return { ...tour, cardImage: pick }
  })
}
