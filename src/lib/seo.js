import { urlFor } from './sanity'
import { testimonials, TRIPADVISOR_URL } from '../data/testimonials'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://visitsaharadesert.com'
const siteName = 'Visit Sahara Desert'
const defaultDescription =
  'Visit Sahara Desert offers authentic Morocco desert tours with expert local Berber guides, sustainable travel, and unforgettable journeys through golden dunes and desert oases.'

/**
 * Generate comprehensive metadata for SEO
 */
export function generateMetadata({
  title,
  description = defaultDescription,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords = ['Sahara Desert', 'Morocco Tours', 'Desert Travel', 'Sahara Adventure', 'Berber Culture', 'Desert Tours'],
}) {
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const imageUrl = image ? urlFor(image).width(1200).height(630).url() : `${siteUrl}/og-image.jpg`

  return {
    title: fullTitle,
    description,
    authors: [{ name: author || siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type,
      url: fullUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@saharadeserttravel',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
  }
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema(contact = null) {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: defaultDescription,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
      addressRegion: 'Zagora',
      ...(contact?.address && { streetAddress: contact.address }),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'French', 'Arabic', 'Berber'],
      ...(contact?.email && { email: contact.email }),
      ...(contact?.phone && { telephone: contact.phone }),
    },
    ...(contact?.email && { email: contact.email }),
    ...(contact?.phone && { telephone: contact.phone }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '500',
      bestRating: '5',
    },
    review: generateReviewSchema(),
    knowsAbout: [
      'Sahara Desert tours',
      'Morocco desert travel',
      'Berber culture and traditions',
      'Camel trekking Morocco',
      'Desert camping Morocco',
      'Erg Chebbi dunes',
      'Erg Zgid dunes',
      'Amazigh heritage',
      'Sustainable desert tourism',
      'Merzouga tours',
      'Zagora desert tours',
    ],
    sameAs: [
      TRIPADVISOR_URL,
      process.env.NEXT_PUBLIC_FACEBOOK_URL,
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      process.env.NEXT_PUBLIC_TWITTER_URL,
    ].filter(Boolean),
  }
}

/**
 * Generate JSON-LD Review objects from the homepage testimonials
 * (src/data/testimonials.js — keep in sync with what TestimonialsSection.jsx renders)
 */
export function generateReviewSchema(items = testimonials) {
  return items.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(t.rating),
      bestRating: '5',
    },
    reviewBody: t.quote,
  }))
}

/**
 * Generate JSON-LD structured data for LocalBusiness (contact page)
 */
export function generateLocalBusinessSchema(contact = null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    description: defaultDescription,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
      addressRegion: 'Draa-Tafilalet',
      ...(contact?.address && { streetAddress: contact.address }),
    },
    ...(contact?.phone && { telephone: contact.phone }),
    ...(contact?.email && { email: contact.email }),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD, EUR, MAD',
    paymentAccepted: 'Cash, Credit Card',
    areaServed: {
      '@type': 'Place',
      name: 'Sahara Desert, Morocco',
    },
  }
}

/**
 * Generate JSON-LD structured data for Tour
 */
export function generateTourSchema(tour) {
  if (!tour) return null

  const cityNames = {
    marrakech: 'Marrakech',
    fes: 'Fes',
    agadir: 'Agadir',
    casablanca: 'Casablanca',
    errachidia: 'Errachidia',
  }
  const departureCityName = cityNames[tour.departureCity?.toLowerCase()] || tour.departureCity || 'Morocco'

  const itinerarySchema = tour.itinerary?.length > 0
    ? {
        '@type': 'ItemList',
        itemListElement: tour.itinerary.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${item.day}: ${item.title}`,
          ...(item.description && { description: item.description }),
        })),
      }
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.excerpt || tour.description,
    url: `${siteUrl}/tours/${tour.slug?.current || ''}`,
    image: tour.mainImage ? urlFor(tour.mainImage).width(1200).url() : undefined,
    duration: tour.duration,
    inLanguage: 'en',
    ...(itinerarySchema && { itinerary: itinerarySchema }),
    tripOrigin: {
      '@type': 'Place',
      name: departureCityName,
      address: { '@type': 'PostalAddress', addressCountry: 'MA' },
    },
    tripDestination: {
      '@type': 'Place',
      name: 'Sahara Desert, Morocco',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'MA',
        addressRegion: 'Draa-Tafilalet',
      },
    },
    offers: {
      '@type': 'Offer',
      ...(tour.price ? { price: tour.price, priceCurrency: 'USD' } : {}),
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/tours/${tour.slug?.current || ''}`,
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: 6,
        maxValue: 16,
        unitText: 'travelers',
      },
    },
    provider: {
      '@type': 'TravelAgency',
      name: siteName,
      url: siteUrl,
    },
    ...(tour.publishedAt && { datePublished: tour.publishedAt }),
  }
}

/**
 * Generate JSON-LD structured data for Article/Story
 */
export function generateArticleSchema(story) {
  if (!story) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.excerpt,
    image: story.coverImage ? urlFor(story.coverImage).width(1200).url() : undefined,
    datePublished: story.publishedAt,
    dateModified: story._updatedAt || story.publishedAt,
    author: story.author
      ? {
          '@type': 'Person',
          name: story.author.name,
          ...(story.author.image && {
            image: urlFor(story.author.image).width(400).url(),
          }),
        }
      : {
          '@type': 'Organization',
          name: siteName,
        },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  }
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}

/**
 * Generate JSON-LD structured data for a static blog post (local images, not Sanity)
 */
export function generateBlogPostSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.category,
    url: `${siteUrl}/blog/${post.slug}`,
  }
}

/**
 * Generate JSON-LD structured data for FAQPage
 */
export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

