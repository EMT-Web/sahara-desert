import { Inter, Lora } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
  preload: true,
})
const lora = Lora({ 
  subsets: ['latin'], 
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

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
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        <Navbar navigation={settings?.navigation} />
        <main className="min-h-screen bg-transparent">
          {children}
        </main>
        <Footer contactInfo={contact} />
        <WhatsAppButton number={contact?.whatsapp} />
        <BackToTop />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
