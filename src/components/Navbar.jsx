'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar({ navigation }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toursSubmenu = [
    { title: 'Visit Sahara Desert Tours from Marrakech', url: '/tours/marrakech' },
    { title: 'Visit Sahara Desert from Fes', url: '/tours/fes' },
    { title: 'Visit Sahara Desert from Casablanca', url: '/tours/casablanca' },
    { title: 'Visit Sahara Desert from Agadir', url: '/tours/agadir' },
    { title: 'Visit Sahara Desert from Errachidia', url: '/tours/errachidia' },
  ]

  const defaultNav = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Culture', url: '/culture' },
    { title: 'Guides', url: '/guides' },
    { title: 'Sustainability', url: '/sustainability' },
    { title: 'Contact', url: '/contact' },
  ]

  const navItems = navigation || defaultNav

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isToursDropdownOpen && !event.target.closest('.tours-dropdown')) {
        setIsToursDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isToursDropdownOpen])

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
              Visit Sahara Desert
            </span>
          </Link>

          <div className="hidden lg:flex space-x-8 items-center">
            {/* Home */}
            <Link
              href="/"
              className={`font-medium transition-colors smooth-transition ${
                isScrolled
                  ? 'text-gray-700 hover:text-desert-600'
                  : 'text-white hover:text-desert-300 text-shadow'
              }`}
            >
              Home
            </Link>
            
            {/* About */}
            <Link
              href="/about"
              className={`font-medium transition-colors smooth-transition ${
                isScrolled
                  ? 'text-gray-700 hover:text-desert-600'
                  : 'text-white hover:text-desert-300 text-shadow'
              }`}
            >
              About
            </Link>
            
            {/* Tours Dropdown */}
            <div className="relative tours-dropdown">
              <button
                onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                className={`font-medium transition-colors smooth-transition flex items-center ${
                  isScrolled
                    ? 'text-gray-700 hover:text-desert-600'
                    : 'text-white hover:text-desert-300 text-shadow'
                }`}
              >
                Tours
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    isToursDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isToursDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {toursSubmenu.map((item) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      onClick={() => setIsToursDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-desert-50 hover:text-desert-600 transition-colors smooth-transition text-sm"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Other nav items */}
            {navItems
              .filter((item) => item.title !== 'Home' && item.title !== 'About' && item.title !== 'Contact')
              .map((item) => (
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
            
            {/* Contact - Always last */}
            <Link
              href="/contact"
              className={`font-medium transition-colors smooth-transition ${
                isScrolled
                  ? 'text-gray-700 hover:text-desert-600'
                  : 'text-white hover:text-desert-300 text-shadow'
              }`}
            >
              Contact
            </Link>
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
            {/* Home */}
            <Link
              href="/"
              className="block px-4 py-3 text-gray-700 hover:bg-sand-200 hover:text-desert-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* About */}
            <Link
              href="/about"
              className="block px-4 py-3 text-gray-700 hover:bg-sand-200 hover:text-desert-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            
            {/* Mobile Tours Dropdown */}
            <div className="border-t border-gray-200 mt-2 pt-2 tours-dropdown">
              <button
                onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-sand-200 hover:text-desert-600 transition-colors"
              >
                <span className="font-medium">Tours</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isToursDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isToursDropdownOpen && (
                <div className="pl-4 pb-2">
                  {toursSubmenu.map((item) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-sand-200 hover:text-desert-600 transition-colors rounded"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setIsToursDropdownOpen(false)
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Other nav items */}
            {navItems
              .filter((item) => item.title !== 'Home' && item.title !== 'About' && item.title !== 'Contact')
              .map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="block px-4 py-3 text-gray-700 hover:bg-sand-200 hover:text-desert-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            
            {/* Contact - Always last */}
            <Link
              href="/contact"
              className="block px-4 py-3 text-gray-700 hover:bg-sand-200 hover:text-desert-600 transition-colors border-t border-gray-200 mt-2 pt-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
