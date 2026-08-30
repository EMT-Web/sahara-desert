export const homepageQuery = `
  *[_type == "homepage" && !(_id in path("drafts.**"))][0]{
    heroTitle,
    heroSubtitle,
    heroImage,
    heroVideo,
    ambientSound,
    featuredTours[]->{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      duration,
      price,
      priceDouble,
      departureCity
    }
  }
`

export const toursListQuery = `
  *[_type == "tour" && !(_id in path("drafts.**"))] | order(length(duration) asc, duration asc){
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    duration,
    price,
    priceDouble,
    departureCity,
    publishedAt
  }
`

export const toursByCityQuery = `
  *[_type == "tour" && departureCity == $city && !(_id in path("drafts.**"))] | order(length(duration) asc, duration asc){
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    duration,
    price,
    priceDouble,
    departureCity,
    publishedAt
  }
`

export const tourDetailQuery = `
  *[_type == "tour" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    slug,
    mainImage,
    gallery,
    excerpt,
    body,
    duration,
    price,
    priceSingle,
    priceDouble,
    priceTriple,
    priceQuad,
    departureCity,
    highlights,
    included,
    notIncluded,
    itinerary,
    focusAreas,
    seoKeywords,
    publishedAt
  }
`

export const galleryQuery = `
  *[_type == "galleryItem" && !(_id in path("drafts.**"))] | order(order asc){
    _id,
    title,
    image,
    video,
    type,
    caption,
    order
  }
`

export const storiesListQuery = `
  *[_type == "story" && !(_id in path("drafts.**"))] | order(publishedAt desc){
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    author->{
      name,
      image
    },
    publishedAt
  }
`

export const storyDetailQuery = `
  *[_type == "story" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    body,
    author->{
      name,
      image,
      bio
    },
    publishedAt
  }
`

export const musicQuery = `
  *[_type == "musicEntry" && !(_id in path("drafts.**"))] | order(order asc){
    _id,
    title,
    portraitImage,
    audioClip,
    videoLink,
    description,
    order
  }
`

export const cultureQuery = `
  *[_type == "culture" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0]{
    title,
    introduction,
    berberTraditions,
    campfireStorytelling,
    sections[]{
      heading,
      content,
      images
    }
  }
`

export const guidesQuery = `
  *[_type == "guide" && !(_id in path("drafts.**"))] | order(coalesce(order, 999) asc){
    _id,
    name,
    role,
    profileImage,
    bio,
    languages,
    experience,
    order
  }
`

export const sustainabilityQuery = `
  *[_type == "sustainability" && !(_id in path("drafts.**"))][0]{
    title,
    introduction,
    initiatives[]{
      title,
      description,
      image
    }
  }
`

export const contactQuery = `
  *[_type == "contact" && !(_id in path("drafts.**"))][0]{
    email,
    phone,
    whatsapp,
    address,
    socialMedia
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
    title,
    description,
    navigation[]{
      title,
      url
    },
    footer
  }
`

export const aboutQuery = `
  *[_type == "about" && !(_id in path("drafts.**"))][0]{
    title,
    subtitle,
    foundersStory,
    foundersImages,
    localExpertise,
    sustainabilityCommitment,
    teamMembers
  }
`

export const experiencesQuery = `
  *[_type == "experience" && !(_id in path("drafts.**"))] | order(coalesce(order, 999) asc){
    _id,
    title,
    slug,
    category,
    image,
    description,
    highlights,
    seoKeywords,
    order
  }
`

export const experienceDetailQuery = `
  *[_type == "experience" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    slug,
    category,
    image,
    description,
    highlights,
    seoKeywords
  }
`

export const destinationsQuery = `
  *[_type == "destination" && !(_id in path("drafts.**"))] | order(coalesce(order, 999) asc){
    _id,
    title,
    slug,
    image,
    description,
    highlights,
    activities,
    seoKeywords,
    order
  }
`

export const relatedToursQuery = `
  *[_type == "tour" && departureCity == $city && slug.current != $slug && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...3]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    duration,
    price,
    priceDouble,
    departureCity
  }
`

export const destinationDetailQuery = `
  *[_type == "destination" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    slug,
    image,
    gallery,
    description,
    highlights,
    activities,
    seoKeywords
  }
`
