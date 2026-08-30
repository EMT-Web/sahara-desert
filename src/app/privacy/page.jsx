import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Privacy Policy | Visit Sahara Desert',
    description: 'Privacy policy for Visit Sahara Desert: how we collect, use, and protect your personal data when you use our website and book desert tours.',
    url: '/privacy',
  })
}

const sections = [
  {
    title: '1. Who We Are',
    body: 'Visit Sahara Desert is a Berber-guided desert tour company operating in Morocco. Our website is visitsaharadesert.com. You can contact us at contact@visitsaharadesert.com with any questions about this policy.',
  },
  {
    title: '2. What Data We Collect',
    body: 'When you use our contact or booking form, we collect your name, email address, phone number, and any travel details you provide (arrival dates, number of travellers, tour interest). We do not collect payment information on this website: payments are handled directly.',
  },
  {
    title: '3. How We Use Your Data',
    body: 'We use your contact details solely to respond to your inquiry, send a booking confirmation, and provide trip information. We do not sell, rent, or share your personal data with any third party other than the email service provider (Resend) used to deliver your inquiry to our team.',
  },
  {
    title: '4. Cookies',
    body: 'Our website uses cookies to improve your browsing experience and to understand how visitors use our site. We use essential cookies (required for the site to function), analytics cookies (to measure traffic anonymously), and preference cookies (to remember your consent choice). You can accept or decline cookies using the banner shown on your first visit. Declining cookies will not prevent you from using the site.',
  },
  {
    title: '5. Third-Party Services',
    body: 'We use the following third-party services: Sanity CMS (to manage website content, no personal visitor data is stored there), Resend (to deliver contact form emails, your name and email are transmitted securely), and optionally Google Analytics (to measure site traffic anonymously using aggregated data only).',
  },
  {
    title: '6. Data Retention',
    body: 'We retain contact form submissions in our email inbox for as long as needed to handle your booking or inquiry, after which they are deleted. We do not maintain a separate database of visitor records.',
  },
  {
    title: '7. Your Rights',
    body: 'Under applicable data protection laws you have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, and withdraw consent at any time. To exercise any of these rights, email us at info@visitsaharadesert.com.',
  },
  {
    title: '8. Data Security',
    body: 'We take reasonable precautions to protect your data. Our website is served over HTTPS, and contact form submissions are transmitted using industry-standard encryption. However, no method of internet transmission is 100% secure.',
  },
  {
    title: '9. Children',
    body: 'Our website is not directed at children under the age of 16. We do not knowingly collect personal data from children.',
  },
  {
    title: '10. Changes to This Policy',
    body: 'We may update this privacy policy from time to time. The date at the bottom of this page reflects the most recent revision. Continued use of the site after any update constitutes acceptance of the revised policy.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-desert-700 pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-desert-300 text-xs font-semibold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl font-serif font-bold text-white">Privacy Policy</h1>
          <p className="text-white/70 mt-3 text-sm">Last updated: May 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl py-16">
        <p className="text-gray-600 leading-relaxed mb-10 text-base border-l-4 border-desert-300 pl-5">
          Your privacy matters to us. This policy explains what personal data Visit Sahara Desert collects when you visit our website or submit a booking inquiry, and how we use and protect that data.
        </p>

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-sand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            Questions? Email us at{' '}
            <a href="mailto:info@visitsaharadesert.com" className="text-desert-600 hover:underline">
              info@visitsaharadesert.com
            </a>
          </p>
          <Link href="/" className="text-desert-600 text-sm font-medium hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
