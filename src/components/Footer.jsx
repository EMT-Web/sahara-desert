import Link from 'next/link'
import Image from 'next/image'
import NewsletterFooterRow from '@/components/NewsletterFooterRow'

export default function Footer({ contactInfo }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sand-900 text-sand-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <NewsletterFooterRow />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/logo.png" alt="Visit Sahara Desert" width={96} height={95} className="h-12 w-auto" />
            <p className="text-sand-300 leading-relaxed text-sm mt-4">
              Discover the magic of the Sahara with authentic Berber-guided experiences,
              sustainable travel, and memories that last a lifetime.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold text-desert-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link href="/tours" className="text-sand-200 hover:text-desert-100 transition-colors">Tours</Link></li>
              <li><Link href="/about" className="text-sand-200 hover:text-desert-100 transition-colors">About Us</Link></li>
              <li><Link href="/guides" className="text-sand-200 hover:text-desert-100 transition-colors">Our Guides</Link></li>
              <li><Link href="/gallery" className="text-sand-200 hover:text-desert-100 transition-colors">Gallery</Link></li>
              <li><Link href="/blog" className="text-sand-200 hover:text-desert-100 transition-colors">Blog</Link></li>
              <li><Link href="/stories" className="text-sand-200 hover:text-desert-100 transition-colors">Stories</Link></li>
              <li><Link href="/culture" className="text-sand-200 hover:text-desert-100 transition-colors">Berber Culture</Link></li>
              <li><Link href="/sustainability" className="text-sand-200 hover:text-desert-100 transition-colors">Sustainability</Link></li>
              <li><Link href="/contact" className="text-sand-200 hover:text-desert-100 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold text-desert-200 mb-4">
              Contact Us
            </h4>
            {contactInfo ? (
              <div className="text-sand-200 space-y-2 text-sm">
                {(contactInfo.email || true) && (
                  <p>
                    <span className="text-sand-400">Email: </span>
                    <a href={`mailto:${contactInfo.email || 'info@visitsaharadesert.com'}`} className="hover:text-desert-100 transition-colors">{contactInfo.email || 'info@visitsaharadesert.com'}</a>
                  </p>
                )}
                {contactInfo.phone && (
                  <p>
                    <span className="text-sand-400">Phone: </span>
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-desert-100 transition-colors">{contactInfo.phone}</a>
                  </p>
                )}
                {contactInfo.whatsapp && (
                  <p>
                    <span className="text-sand-400">WhatsApp: </span>
                    <a href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-desert-100 transition-colors">{contactInfo.whatsapp}</a>
                  </p>
                )}
                {contactInfo.address && (
                  <p><span className="text-sand-400">Address: </span>{contactInfo.address}</p>
                )}
              </div>
            ) : (
              <p className="text-sand-200 text-sm">
                Connect with us to plan your desert adventure.<br />
                <Link href="/contact" className="text-desert-200 hover:text-desert-100 transition-colors mt-1 inline-block">Get in touch →</Link>
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-sand-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sand-400 text-sm">
          <p>&copy; {currentYear} Visit Sahara Desert. All rights reserved.</p>
          <a
            href="https://www.tripadvisor.com/Attraction_Review-g293734-d34078524-Reviews-Visit_Sahara_Desert-Marrakech_Marrakech_Safi.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-sand-800 hover:bg-sand-700 text-white px-4 py-2 rounded-lg transition-colors text-xs font-semibold"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#00AA6C] flex-shrink-0" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM7.5 8a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm9 0a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM12 8.5c1.93 0 3.68.78 4.95 2.04l-.95.95A5.47 5.47 0 0012 10a5.47 5.47 0 00-3.54 1.46l-.93-.93A6.96 6.96 0 0112 8.5zm0 3c.96 0 1.83.39 2.46 1.02l-.71.71A2.48 2.48 0 0012 12.5c-.69 0-1.32.28-1.77.73l-.71-.71A3.47 3.47 0 0112 11.5zm0 1.5a1 1 0 100 2 1 1 0 000-2z"/>
            </svg>
            <span className="text-[#00AA6C] font-bold">Tripadvisor</span>
            <span className="text-sand-300">· Rated Excellent</span>
            <span className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-[#00AA6C]">
                  <path d="M6 0l1.545 3.13 3.455.502-2.5 2.437.59 3.44L6 7.88 2.91 9.51l.59-3.44L1 3.632l3.455-.502z"/>
                </svg>
              ))}
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
