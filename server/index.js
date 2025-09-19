import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { subscriberService } from './services/supabase.js'
import { emailService } from './services/sendgrid.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:8080',
    'http://localhost:8081',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8081'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'BDP CRM API is running' })
})

// Subscribe to newsletter
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, name, subscription_source = 'website' } = req.body

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ 
        error: 'Valid email is required' 
      })
    }

    // Check if email already exists
    console.log('🔍 Checking if email exists:', email)
    const existingUser = await subscriberService.getByEmail(email)
    console.log('📧 Existing user check result:', existingUser)
    
    if (existingUser.data && !existingUser.error) {
      return res.status(409).json({ 
        error: 'Email already subscribed',
        message: 'This email is already in our system. Thank you!'
      })
    }

    // Create new subscriber
    console.log('👤 Creating new subscriber:', { email, name, subscription_source })
    const { data: subscriber, error } = await subscriberService.create({
      email,
      name,
      subscription_source
    })
    console.log('💾 Create subscriber result:', { subscriber, error })

    if (error) {
      console.error('❌ Database error:', error)
      return res.status(500).json({ 
        error: 'Failed to subscribe. Please try again.' 
      })
    }

    // Send welcome email
    const profileCompleteUrl = `${process.env.FRONTEND_URL || 'http://localhost:8080'}/profile/${subscriber.profile_token}`
    
    const emailResult = await emailService.sendWelcomeEmail({
      name: subscriber.name,
      email: subscriber.email,
      profileCompleteUrl
    })

    if (!emailResult.success) {
      console.error('Welcome email failed:', emailResult.error)
      // Still return success since subscription worked
    }

    res.status(201).json({
      message: 'Successfully subscribed! Check your email for next steps.',
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        name: subscriber.name,
        profile_completed: subscriber.profile_completed
      }
    })

  } catch (error) {
    console.error('Subscription error:', error)
    res.status(500).json({ 
      error: 'Internal server error. Please try again.' 
    })
  }
})

// Get profile by token (for email-based profile completion)
app.get('/api/profile/:token', async (req, res) => {
  try {
    const { token } = req.params

    if (!token) {
      return res.status(400).json({ 
        error: 'Profile token is required' 
      })
    }

    const { data: subscriber, error } = await subscriberService.getByToken(token)

    if (error || !subscriber) {
      return res.status(404).json({ 
        error: 'Profile not found or invalid token' 
      })
    }

    res.json({
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        name: subscriber.name,
        age: subscriber.age,
        gender: subscriber.gender,
        interests: subscriber.interests || [],
        profile_completed: subscriber.profile_completed
      }
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({ 
      error: 'Internal server error' 
    })
  }
})

// Update profile by token
app.put('/api/profile/:token', async (req, res) => {
  try {
    const { token } = req.params
    const { name, age, gender, interests } = req.body

    if (!token) {
      return res.status(400).json({ 
        error: 'Profile token is required' 
      })
    }

    // Validate age if provided
    if (age !== undefined && (age < 13 || age > 120)) {
      return res.status(400).json({ 
        error: 'Age must be between 13 and 120' 
      })
    }

    // Validate gender if provided
    if (gender && !['male', 'female', 'rather_not_say'].includes(gender)) {
      return res.status(400).json({ 
        error: 'Invalid gender option' 
      })
    }

    // Get current subscriber
    const { data: currentSubscriber, error: fetchError } = await subscriberService.getByToken(token)
    
    if (fetchError || !currentSubscriber) {
      return res.status(404).json({ 
        error: 'Profile not found or invalid token' 
      })
    }

    // Update profile
    const updateData = {
      profile_completed: true
    }

    if (name !== undefined) updateData.name = name
    if (age !== undefined) updateData.age = age
    if (gender !== undefined) updateData.gender = gender
    if (interests !== undefined) updateData.interests = interests

    const { data: updatedSubscriber, error: updateError } = await subscriberService.updateByToken(token, updateData)

    if (updateError) {
      console.error('Profile update error:', updateError)
      return res.status(500).json({ 
        error: 'Failed to update profile' 
      })
    }

    // Send thank you email
    const emailResult = await emailService.sendThankYouEmail({
      name: updatedSubscriber.name,
      email: updatedSubscriber.email,
      interests: updatedSubscriber.interests || []
    })

    if (!emailResult.success) {
      console.error('Thank you email failed:', emailResult.error)
      // Still return success since profile update worked
    }

    res.json({
      message: 'Profile updated successfully!',
      subscriber: {
        id: updatedSubscriber.id,
        email: updatedSubscriber.email,
        name: updatedSubscriber.name,
        age: updatedSubscriber.age,
        gender: updatedSubscriber.gender,
        interests: updatedSubscriber.interests || [],
        profile_completed: updatedSubscriber.profile_completed
      }
    })

  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({ 
      error: 'Internal server error' 
    })
  }
})

// Send profile completion reminder (admin endpoint)
app.post('/api/admin/send-reminders', async (req, res) => {
  try {
    const { days = 3 } = req.body

    // Get incomplete profiles
    const { data: incompleteProfiles, error } = await subscriberService.getIncompleteProfiles(days)

    if (error) {
      return res.status(500).json({ 
        error: 'Failed to fetch incomplete profiles' 
      })
    }

    if (!incompleteProfiles || incompleteProfiles.length === 0) {
      return res.json({ 
        message: 'No incomplete profiles found',
        count: 0 
      })
    }

    // Send reminder emails
    const emailPromises = incompleteProfiles.map(async (subscriber) => {
      const profileCompleteUrl = `${process.env.FRONTEND_URL || 'http://localhost:8080'}/profile/${subscriber.profile_token}`
      
      return emailService.sendProfileReminder({
        name: subscriber.name,
        email: subscriber.email,
        profileCompleteUrl,
        daysWaiting: days
      })
    })

    const results = await Promise.all(emailPromises)
    const successCount = results.filter(result => result.success).length

    res.json({
      message: `Sent ${successCount} reminder emails`,
      total: incompleteProfiles.length,
      success: successCount,
      failed: incompleteProfiles.length - successCount
    })

  } catch (error) {
    console.error('Reminder sending error:', error)
    res.status(500).json({ 
      error: 'Internal server error' 
    })
  }
})

// Get analytics (admin endpoint)
app.get('/api/admin/analytics', async (req, res) => {
  try {
    const { data: analytics, error } = await subscriberService.getAnalytics()

    if (error) {
      return res.status(500).json({ 
        error: 'Failed to fetch analytics' 
      })
    }

    res.json({ analytics: analytics || [] })

  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ 
      error: 'Internal server error' 
    })
  }
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({ 
    error: 'Something went wrong!' 
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found' 
  })
})

const server = app.listen(PORT, () => {
  console.log(`🚀 BDP CRM API Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`)
  console.log(`🛠️  Server running with mock services (no database/email)`)
})

// Keep process alive
const keepAlive = setInterval(() => {
  // This keeps the event loop active
}, 30000) // Check every 30 seconds

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM signal received: closing HTTP server')
  clearInterval(keepAlive)
  server.close(() => {
    console.log('🛑 HTTP server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('📴 SIGINT signal received: closing HTTP server')
  clearInterval(keepAlive)
  server.close(() => {
    console.log('🛑 HTTP server closed')
    process.exit(0)
  })
})
