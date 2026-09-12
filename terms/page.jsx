import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Terms & Conditions',
    description: 'Terms and conditions for Visit Sahara Desert: booking process, deposits and payment, our cancellation and refund policy, itinerary changes, and traveller responsibilities.',
    url: '/terms',
  })
}

const sections = [
  {
    title: '1. About These Terms',
    body: 'These Terms & Conditions govern every tour booking made with Visit Sahara Desert, a Berber-guided desert tour operator based in Morocco, through visitsaharadesert.com, WhatsApp, email, or any other direct channel. By submitting a booking inquiry or paying a deposit, you agree to the terms on this page.',
  },
  {
    title: '2. Booking Process',
    body: 'A booking request submitted through our contact form, WhatsApp, or email is an inquiry, not a confirmed reservation. We will confirm availability, final pricing, and itinerary details with you directly before a booking is considered confirmed. A tour is only guaranteed once you have received written confirmation from our team and, where required, paid the deposit described below.',
  },
  {
    title: '3. Deposits and Payment',
    body: 'Most tours require a deposit to confirm your reservation, with the balance due before or at the start of the tour, as agreed with our team when you book. We do not collect payment details through this website: all payment arrangements are confirmed directly with you by our team, and accepted methods (cash, bank transfer, or card) are set out at that time.',
  },
  {
    title: '4. Cancellation Policy',
    body: 'If you need to cancel a confirmed booking: cancellations made 14 or more days before the tour departure date receive a full refund of amounts paid. Cancellations made 7–14 days before departure receive a 50% refund. Cancellations made less than 7 days before departure are not refundable. In every case, we will always try to offer a free date change instead of a cancellation wherever possible — contact us directly and we will do our best to help.',
  },
  {
    title: '5. Changes Made by Us',
    body: 'Our itineraries describe the intended route, stops, and activities for each tour. Occasionally we may need to adjust an itinerary because of weather, road conditions, safety concerns, local events, or circumstances beyond our control. Where this happens, we will substitute an equivalent experience wherever possible and will always prioritise your safety over sticking rigidly to a published itinerary.',
  },
  {
    title: '6. Force Majeure',
    body: 'We are not liable for delay, change, or cancellation of a tour caused by events beyond our reasonable control, including extreme weather, natural disasters, civil unrest, government action, strikes, or other circumstances of a similar nature. Where such an event prevents a tour from going ahead, we will work with you on rescheduling or a partial refund where costs allow.',
  },
  {
    title: '7. Traveller Responsibilities and Health',
    body: 'You are responsible for making sure you (and anyone travelling with you) are fit to take part in the physical activities involved in a desert tour, including camel riding, walking on sand dunes, and multi-day travel over long distances. Please tell us in advance about any medical conditions, mobility limitations, or dietary requirements so we can advise whether a tour is suitable and make reasonable arrangements. We strongly recommend that all travellers hold valid travel insurance covering trip cancellation, medical emergencies, and activities included in the tour.',
  },
  {
    title: '8. Travel Documents and Local Laws',
    body: 'You are responsible for holding a valid passport and any visa required to enter Morocco, and for complying with local laws and customs during your trip. We are not responsible for losses arising from your failure to hold the correct travel documents.',
  },
  {
    title: '9. Liability',
    body: 'We take reasonable care in selecting drivers, guides, camps, and accommodation partners, and in planning safe itineraries. To the extent permitted by law, we are not liable for injury, loss, or damage arising from circumstances outside our reasonable control, or from a traveller’s own actions or pre-existing medical conditions. Nothing in these terms excludes liability that cannot be excluded under applicable law.',
  },
  {
    title: '10. Photos and Reviews',
    body: 'We may ask permission to use photos or videos taken during your tour, and reviews you leave with us, in our marketing (including on this website and social media). You are free to decline, and we will only use content you have agreed to share.',
  },
  {
    title: '11. Governing Law',
    body: 'These terms are governed by the laws of Morocco, where Visit Sahara Desert operates. If any part of these terms is found unenforceable, the remaining terms continue to apply.',
  },
  {
    title: '12. Changes to These Terms',
    body: 'We may update these Terms & Conditions from time to time. The date below reflects the most recent revision. The terms that applied at the time of your booking will govern that booking.',
  },
  {
    title: '13. Contact Us',
    body: 'Questions about a booking or these terms? Email us at info@visitsaharadesert.com or reach us through the contact page — we’re happy to clarify anything before you book.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-desert-700 pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-desert-300 text-xs font-semibold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl font-serif font-bold text-white">Terms &amp; Conditions</h1>
          <p className="text-white/70 mt-3 text-sm">Last updated: September 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl py-16">
        <p className="text-gray-600 leading-relaxed mb-10 text-base border-l-4 border-desert-300 pl-5">
          These terms cover how bookings, payments, cancellations, and itinerary changes work when you book a tour with Visit Sahara Desert. For how we handle your personal data, see our{' '}
          <Link href="/privacy" className="text-desert-600 hover:underline">Privacy Policy</Link>.
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
