import { NextResponse } from 'next/server'
import { Resend } from 'resend'

let resend = null
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY)
}

const clean = (v, max = 2000) => (v == null ? '' : String(v).slice(0, max).trim())

export async function POST(request) {
  try {
    const body = (await request.json()) || {}

    // Honeypot field filled => bot. Pretend success, send nothing.
    if (body.company) return NextResponse.json({ success: true })

    const name = clean(body.name, 200)
    const email = clean(body.email, 200)
    const phone = clean(body.phone, 60)

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Missing required fields: name and a valid email' },
        { status: 400 }
      )
    }

    const interests = Array.isArray(body.interests) ? body.interests.map((i) => clean(i, 60)).join(', ') : clean(body.interests)
    // Older form versions sent numberOfTravelers / flightDetails; keep accepting them.
    const travellers = body.adults
      ? `${clean(body.adults, 5)} adult(s), ${clean(body.children, 5) || '0'} child(ren)`
      : clean(body.numberOfTravelers, 20)

    const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@visitsaharadesert.com'
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || 'Visit Sahara Desert <no-reply@visitsaharadesert.com>'

    const tour = clean(body.tourInterest, 200)
    const emailSubject = `New trip request from ${name}${tour ? `: ${tour}` : ''}`

    const line = (label, value) => `${label}: ${value || 'Not specified'}`
    const textContent = [
      'New trip request from the website:',
      '',
      line('Name', name),
      line('Email', email),
      line('Phone / WhatsApp', phone),
      line('Preferred reply', clean(body.preferredContact, 20)),
      '',
      line('Tour of interest', tour),
      line('Arrival date', clean(body.arrivalDate, 20)),
      line('Departure date', clean(body.departureDate, 20)),
      line('Flexible dates', body.flexibleDates ? 'Yes' : 'No'),
      line('Travellers', travellers),
      line('Starting city', clean(body.startCity, 60)),
      line('Ending city', clean(body.endCity, 60)),
      line('Travel style', clean(body.travelStyle, 30)),
      line('Accommodation', clean(body.accommodation, 30)),
      line('Interests', interests),
      '',
      body.flightDetails ? `Flight details:\n${clean(body.flightDetails)}\n` : '',
      `Message:\n${clean(body.message, 5000) || 'No additional message'}`,
    ].join('\n').trim()

    if (!resend) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
    }

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: emailSubject,
      text: textContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending contact email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
