'use client'

import { useState } from 'react'

export default function ContactForm({ whatsappNumber }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    departureDate: '',
    flightDetails: '',
    numberOfTravelers: '',
    tourInterest: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Format message for WhatsApp
    const whatsappMessage = `Hello! I'm interested in booking a Sahara Desert tour.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Arrival Date: ${formData.arrivalDate || 'Not specified'}
Departure Date: ${formData.departureDate || 'Not specified'}
Number of Travelers: ${formData.numberOfTravelers || 'Not specified'}
Tour Interest: ${formData.tourInterest || 'Not specified'}
Flight Details: ${formData.flightDetails || 'Not specified'}

Message:
${formData.message || 'No additional message'}`

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`

    // Open WhatsApp
    window.open(whatsappLink, '_blank')

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      arrivalDate: '',
      departureDate: '',
      flightDetails: '',
      numberOfTravelers: '',
      tourInterest: '',
      message: '',
    })

    setIsSubmitting(false)
    setSubmitStatus('success')
    setTimeout(() => setSubmitStatus(null), 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-desert-500 focus:border-transparent"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-desert-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-desert-500 focus:border-transparent"
            placeholder="+1234567890"
          />
        </div>

        <div>
          <label htmlFor="numberOfTravelers" className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Travelers
          </label>
          <select
            id="numberOfTravelers"
            name="numberOfTravelers"
            value={formData.numberOfTravelers}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-desert-500 focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3-4">3-4 people</option>
            <option value="5-8">5-8 people</option>
            <option value="9+">9+ people</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="arrivalDate" className="block text-sm font-semibold text-gray-700 mb-2">
            Arrival Date
          </label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-desert-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="departureDate" className="block text-sm font-semibold text-gray-700 mb-2">
            Departure Date
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-desert-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="flightDetails" className="block text-sm font-semibold text-gray-700 mb-2">
          Flight Details
        </label>
        <textarea
          id="flightDetails"
          name="flightDetails"
          rows="3"
          value={formData.flightDetails}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-desert-500 focus:border-transparent"
          placeholder="Flight number, arrival time, airport, etc."
        />
      </div>

      <div>
        <label htmlFor="tourInterest" className="block text-sm font-semibold text-gray-700 mb-2">
          Tour Interest
        </label>
        <select
          id="tourInterest"
          name="tourInterest"
          value={formData.tourInterest}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-desert-500 focus:border-transparent"
        >
          <option value="">Select a tour type...</option>
          <option value="1-night">1 Night Desert Experience</option>
          <option value="2-nights">2 Nights Desert Adventure</option>
          <option value="3-nights">3 Nights Cultural Journey</option>
          <option value="4-nights">4 Nights Complete Experience</option>
          <option value="5-nights">5 Nights Extended Adventure</option>
          <option value="custom">Custom Tour</option>
          <option value="not-sure">Not Sure Yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-desert-500 focus:border-transparent"
          placeholder="Tell us about your interests, special requests, or any questions..."
        />
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          Form submitted! WhatsApp should open with your message.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-desert-600 hover:bg-desert-700 text-white font-semibold rounded-lg shadow-lg smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Submit & Open WhatsApp
          </>
        )}
      </button>
    </form>
  )
}

