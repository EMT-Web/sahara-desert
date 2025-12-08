import Link from 'next/link'

export default function Footer({ contactInfo }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sand-900 text-sand-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-desert-200 mb-4">
              Sahara Desert Travel
            </h3>
            <p className="text-sand-200 leading-relaxed">
              Discover the magic of the Sahara Desert with authentic experiences,
              expert guides, and sustainable tourism practices.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold text-desert-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tours"
                  className="text-sand-200 hover:text-desert-100 transition-colors"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sand-200 hover:text-desert-100 transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  className="text-sand-200 hover:text-desert-100 transition-colors"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sand-200 hover:text-desert-100 transition-colors"
                >
                  Our Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-sand-200 hover:text-desert-100 transition-colors"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold text-desert-200 mb-4">
              Contact Us
            </h4>
            {contactInfo ? (
              <div className="text-sand-200 space-y-2">
                {contactInfo.email && (
                  <p>Email: {contactInfo.email}</p>
                )}
                {contactInfo.phone && (
                  <p>Phone: {contactInfo.phone}</p>
                )}
                {contactInfo.whatsapp && (
                  <p>WhatsApp: {contactInfo.whatsapp}</p>
                )}
              </div>
            ) : (
              <p className="text-sand-200">
                Connect with us to plan your desert adventure.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-sand-800 mt-8 pt-8 text-center text-sand-400">
          <p>
            &copy; {currentYear} Sahara Desert Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
