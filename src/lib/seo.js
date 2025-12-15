import { urlFor } from './sanity'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahara-desert-travel.com'
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
    keywords: keywords.join(', '),
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
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: defaultDescription,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
      addressRegion: 'Zagora',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'French', 'Arabic', 'Berber'],
    },
    sameAs: [
      process.env.NEXT_PUBLIC_FACEBOOK_URL,
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      process.env.NEXT_PUBLIC_TWITTER_URL,
    ].filter(Boolean),
  }
}

/**
 * Generate JSON-LD structured data for Tour
 */
export function generateTourSchema(tour) {
  if (!tour) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.excerpt || tour.description,
    url: `${siteUrl}/tours/${tour.slug?.current || ''}`,
    image: tour.mainImage ? urlFor(tour.mainImage).width(1200).url() : undefined,
    duration: tour.duration,
    offers: tour.price
      ? {
          '@type': 'Offer',
          price: tour.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        }
      : undefined,
    provider: {
      '@type': 'TravelAgency',
      name: siteName,
      url: siteUrl,
    },
    ...(tour.publishedAt && {
      datePublished: tour.publishedAt,
    }),
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
    image: story.mainImage ? urlFor(story.mainImage).width(1200).url() : undefined,
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

