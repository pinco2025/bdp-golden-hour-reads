import type { VercelRequest, VercelResponse } from '@vercel/node'
import { subscriberService } from './_supabase'
import { emailService } from './_email'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { email, name, subscription_source = 'website' } = req.body || {}

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' })
    }

    const existing = await subscriberService.getByEmail(email)
    if (existing.data && !existing.error) {
      return res.status(409).json({ error: 'Email already subscribed', message: 'This email is already in our system. Thank you!' })
    }

    const { data: subscriber, error } = await subscriberService.create({ email, name, subscription_source })
    if (error || !subscriber) {
      console.error('[serverless] DB create error', error)
      return res.status(500).json({ error: 'Failed to subscribe. Please try again.' })
    }

    const profileUrlBase = process.env.FRONTEND_URL || 'http://localhost:8080'
    const profileCompleteUrl = `${profileUrlBase}/profile/${subscriber.profile_token}`
    await emailService.sendWelcomeEmail({ name: subscriber.name, email: subscriber.email, profileCompleteUrl })

    return res.status(201).json({
      message: 'Successfully subscribed! Check your email for next steps.',
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        name: subscriber.name,
        profile_completed: subscriber.profile_completed
      }
    })
  } catch (e) {
    console.error('[serverless] subscribe error', e)
    return res.status(500).json({ error: 'Internal server error' })
  }
}


