import { subscriberService } from '../_supabase.js'
import { emailService } from '../_email.js'

export default async function handler(req: any, res: any) {
  const { token } = req.query as { token?: string }
  if (!token) return res.status(400).json({ error: 'Profile token is required' })

  if (req.method === 'GET') {
    try {
      const { data: subscriber, error } = await subscriberService.getByToken(token)
      if (error || !subscriber) return res.status(404).json({ error: 'Profile not found or invalid token' })
      return res.json({ subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        name: subscriber.name,
        age: subscriber.age,
        gender: subscriber.gender,
        interests: subscriber.interests || [],
        profile_completed: subscriber.profile_completed
      } })
    } catch (e) {
      console.error('[serverless] profile GET error', e)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, age, gender, interests } = req.body || {}
      if (age !== undefined && (age < 13 || age > 120)) return res.status(400).json({ error: 'Age must be between 13 and 120' })
      if (gender && !['male', 'female', 'rather_not_say'].includes(gender)) return res.status(400).json({ error: 'Invalid gender option' })

      const { data: current, error: fetchError } = await subscriberService.getByToken(token)
      if (fetchError || !current) return res.status(404).json({ error: 'Profile not found or invalid token' })

      const updateData: any = { profile_completed: true }
      if (name !== undefined) updateData.name = name
      if (age !== undefined) updateData.age = age
      if (gender !== undefined) updateData.gender = gender
      if (interests !== undefined) updateData.interests = interests

      const { data: updated, error: updateError } = await subscriberService.updateByToken(token, updateData)
      if (updateError || !updated) return res.status(500).json({ error: 'Failed to update profile' })

      await emailService.sendThankYouEmail({ name: updated.name, email: updated.email, interests: updated.interests || [] })

      return res.json({ message: 'Profile updated successfully!', subscriber: {
        id: updated.id,
        email: updated.email,
        name: updated.name,
        age: updated.age,
        gender: updated.gender,
        interests: updated.interests || [],
        profile_completed: updated.profile_completed
      } })
    } catch (e) {
      console.error('[serverless] profile PUT error', e)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  res.setHeader('Allow', 'GET, PUT')
  return res.status(405).json({ error: 'Method Not Allowed' })
}


