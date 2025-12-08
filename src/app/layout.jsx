import { Inter, Lora } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
  title: 'Sahara Desert Travel | Authentic Desert Experiences',
  description: 'Discover the magic of the Sahara Desert with expert guides, sustainable tourism, and unforgettable adventures through golden dunes and ancient traditions.',
  keywords: ['Sahara Desert', 'Morocco Tours', 'Desert Travel', 'Sahara Adventure', 'Berber Culture', 'Desert Tours', 'Erg Chebbi', 'Merzouga', 'Zagora', 'Camel Trekking', 'Desert Camping'],
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
  const organizationSchema = generateOrganizationSchema()

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
      </body>
    </html>
  )
}
