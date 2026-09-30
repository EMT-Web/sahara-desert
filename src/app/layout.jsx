import { Inter, Fraunces } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'
import dynamic from 'next/dynamic'
import { Analytics } from '@vercel/analytics/next'

const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false })
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false })
import { client } from '@/lib/sanity'
import { siteSettingsQuery, contactQuery } from '@/lib/queries'
import { generateMetadata as generateSEOMetadata, generateOrganizationSchema } from '@/lib/seo'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
// Display serif for headings. Variable font, so one file covers all weights.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  axes: ['opsz'],
})

export const viewport = {
  themeColor: '#faf7f2',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = generateSEOMetadata({
  title: 'Authentic Sahara Desert Experiences',
  description:
    'Visit Sahara Desert offers authentic Morocco desert tours with expert Berber guides, sustainable travel, camel trekking, and unforgettable journeys through golden dunes and desert oases.',
  keywords: [
    'Visit Sahara Desert',
    'Sahara Desert',
    'Morocco Desert Tours',
    'Desert Travel',
    'Sahara Adventure',
    'Berber Culture',
    'Desert Tours',
    'Erg Chebbi',
    'Merzouga',
    'Zagora',
    'Camel Trekking',
    'Desert Camping',
  ],
})

async function getLayoutData() {
  try {
    const [settings, contact] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(contactQuery),
    ])
    return { settings, contact }
  } catch (error) {
    return { settings: null, contact: null }
  }
}

export default async function RootLayout({ children }) {
  const { settings, contact } = await getLayoutData()
  const organizationSchema = generateOrganizationSchema(contact)

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        {/* Flags JS support before first paint so scroll-reveal hidden states never flash or hide content without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PPVZW7BWLB" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-PPVZW7BWLB');" }} />
      </head>
      <body className="antialiased">
        <Navbar navigation={settings?.navigation} whatsapp={contact?.whatsapp} />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer contactInfo={contact} />
        <RevealObserver />
        <WhatsAppButton number={contact?.whatsapp} />
        <BackToTop />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
