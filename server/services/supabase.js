import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Helper functions for common database operations
export const subscriberService = {
  // Create new subscriber
  async create(data) {
    return await supabaseAdmin
      .from('subscribers')
      .insert(data)
      .select()
      .single()
  },

  // Get subscriber by email
  async getByEmail(email) {
    return await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('email', email)
      .single()
  },

  // Get subscriber by profile token
  async getByToken(token) {
    return await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('profile_token', token)
      .single()
  },

  // Update subscriber profile
  async update(id, data) {
    return await supabaseAdmin
      .from('subscribers')
      .update(data)
      .eq('id', id)
      .select()
      .single()
  },

  // Update subscriber by token (for email-based profile completion)
  async updateByToken(token, data) {
    return await supabaseAdmin
      .from('subscribers')
      .update(data)
      .eq('profile_token', token)
      .select()
      .single()
  },

  // Check if email exists
  async emailExists(email) {
    const { data, error } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .single()
    
    return !error && !!data
  },

  // Get subscriber analytics
  async getAnalytics() {
    return await supabaseAdmin
      .from('subscriber_analytics')
      .select('*')
      .limit(30) // Last 30 days
  },

  // Get incomplete profiles (for follow-up emails)
  async getIncompleteProfiles(daysOld = 3) {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)

    return await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('profile_completed', false)
      .lt('created_at', cutoffDate.toISOString())
  }
}