'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar({ navigation }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const defaultNav = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Tours', url: '/tours' },
    { title: 'Culture', url: '/culture' },
    { title: 'Guides', url: '/guides' },
    { title: 'Sustainability', url: '/sustainability' },
    { title: 'Contact', url: '/contact' },
  ]

  const navItems = navigation || defaultNav

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-sand-100/95 backdrop-blur-sm shadow-md'
          : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <span
              className={`text-2xl font-serif font-bold transition-colors ${
                isScrolled ? 'text-desert-600' : 'text-white text-shadow'
              }`}
            >
              Sahara Desert
            </span>
          </Link>

          <div className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className={`font-medium transition-colors smooth-transition ${
                  isScrolled
                    ? 'text-gray-700 hover:text-desert-600'
                    : 'text-white hover:text-desert-300 text-shadow'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full transition-colors ${
                  isScrolled ? 'bg-gray-900' : 'bg-sand-100'
                }`}
              />
              <span
                className={`block h-0.5 w-full transition-colors ${
                  isScrolled ? 'bg-gray-900' : 'bg-sand-100'
                }`}
              />
              <span
                className={`block h-0.5 w-full transition-colors ${
                  isScrolled ? 'bg-gray-900' : 'bg-sand-100'
                }`}
              />
            </div>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-sand-100 shadow-lg rounded-lg mb-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="block px-4 py-3 text-gray-700 hover:bg-sand-100 hover:text-desert-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
