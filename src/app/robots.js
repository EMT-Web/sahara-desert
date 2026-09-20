import { resolveSiteUrl } from '@/lib/seo'

const siteUrl = resolveSiteUrl()

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/studio/', '/_next/static/media/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
