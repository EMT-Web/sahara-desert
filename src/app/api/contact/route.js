import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      arrivalDate,
      departureDate,
      flightDetails,
      numberOfTravelers,
      tourInterest,
      message,
    } = body || {}

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone' },
        { status: 400 }
      )
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || 'Visitsaharaadesert@gmail.com'
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || 'Visit Sahara Desert <no-reply@visitsaharadesert.com>'

    const emailSubject = `New Booking / Inquiry from ${name}`

    const textContent = `
New booking / inquiry submitted from the website contact form:

Name: ${name}
Email: ${email}
Phone: ${phone}

Arrival Date: ${arrivalDate || 'Not specified'}
Departure Date: ${departureDate || 'Not specified'}
Number of Travelers: ${numberOfTravelers || 'Not specified'}
Tour Interest: ${tourInterest || 'Not specified'}

Flight Details:
${flightDetails || 'Not specified'}

Additional Message:
${message || 'No additional message'}
`.trim()

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


