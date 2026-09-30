import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Newsletter signups are emailed to the team (same Resend setup as the contact
// form). There is no mailing-list provider yet; add contacts to one from
// these emails, or swap this for a Resend Audience / Mailchimp call later.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request) {
  try {
    const { email, company } = (await request.json()) || {}

    // Honeypot: bots fill the hidden field. Pretend success.
    if (company) return NextResponse.json({ success: true })

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!resend) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Visit Sahara Desert <no-reply@visitsaharadesert.com>',
      to: [process.env.CONTACT_TO_EMAIL || 'contact@visitsaharadesert.com'],
      reply_to: email,
      subject: `Newsletter signup: ${email}`,
      text: `New newsletter signup from the website footer:\n\n${email}\n`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter signup failed:', error)
    return NextResponse.json({ error: 'Signup failed. Please try again later.' }, { status: 500 })
  }
}
