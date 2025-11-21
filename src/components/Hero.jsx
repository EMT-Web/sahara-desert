'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export default function Hero({ heroTitle, heroSubtitle, heroImage, heroVideo }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : heroImage ? (
        <Image
          src={urlFor(heroImage).width(1920).url()}
          alt={heroTitle || 'Sahara Desert'}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-desert-500 to-sand-700" />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-shadow animate-fade-in">
            {heroTitle || 'Experience the Magic of the Sahara'}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 text-shadow">
            {heroSubtitle || 'Journey through golden dunes and timeless traditions'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tours"
              className="px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition transform hover:scale-105"
            >
              Explore Tours
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-lg shadow-lg smooth-transition border border-white/40"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  )
}
