export const homepageQuery = `
  *[_type == "homepage"][0]{
    heroTitle,
    heroSubtitle,
    heroImage,
    heroVideo,
    featuredTours[]->{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      duration,
      price
    }
  }
`

export const toursListQuery = `
  *[_type == "tour"] | order(publishedAt desc){
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    duration,
    price,
    publishedAt
  }
`

export const tourDetailQuery = `
  *[_type == "tour" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    gallery,
    excerpt,
    body,
    duration,
    price,
    included,
    notIncluded,
    itinerary,
    publishedAt
  }
`

export const galleryQuery = `
  *[_type == "galleryItem"] | order(order asc){
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
  *[_type == "story"] | order(publishedAt desc){
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
  *[_type == "story" && slug.current == $slug][0]{
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
  *[_type == "musicEntry"] | order(order asc){
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
  *[_type == "culture"][0]{
    title,
    introduction,
    sections[]{
      heading,
      content,
      images
    }
  }
`

export const guidesQuery = `
  *[_type == "guide"] | order(order asc){
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
  *[_type == "sustainability"][0]{
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
  *[_type == "contact"][0]{
    email,
    phone,
    whatsapp,
    address,
    socialMedia
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0]{
    title,
    description,
    navigation[]{
      title,
      url
    },
    footer
  }
`
