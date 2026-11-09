import { resolveSiteUrl } from '@/lib/seo'

const siteUrl = resolveSiteUrl()

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
