import { Inter, Lora } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { client } from '@/lib/sanity'
import { siteSettingsQuery, contactQuery } from '@/lib/queries'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const lora = Lora({ subsets: ['latin'], variable: '--font-serif' })

export const metadata = {
  title: 'Sahara Desert Travel | Authentic Desert Experiences',
  description: 'Discover the magic of the Sahara Desert with expert guides, sustainable tourism, and unforgettable adventures through golden dunes and ancient traditions.',
}

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

  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="antialiased">
        <Navbar navigation={settings?.navigation} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer contactInfo={contact} />
      </body>
    </html>
  )
}
