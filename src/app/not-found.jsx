import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: '404: Page Not Found | Visit Sahara Desert',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Image
        src="/images/image00001.jpeg"
        alt="Sahara Desert dunes"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      <div className="relative text-center text-white px-6 max-w-lg mx-auto">
        <p className="text-desert-300 text-xs font-semibold tracking-widest uppercase mb-6">
          Lost in the Dunes
        </p>
        <h1 className="text-8xl md:text-9xl font-serif font-bold text-white/20 leading-none mb-2">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
          This Page Has Wandered Off
        </h2>
        <p className="text-white/70 text-sm leading-relaxed mb-10">
          Even the most experienced guides lose their way sometimes. Let us help you find what you&apos;re looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 bg-desert-600 hover:bg-desert-500 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/tours"
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors backdrop-blur-sm"
          >
            Browse Tours
          </Link>
        </div>
      </div>
    </div>
  )
}
