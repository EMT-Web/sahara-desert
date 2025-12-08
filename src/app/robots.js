const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahara-desert-travel.com'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/studio/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

