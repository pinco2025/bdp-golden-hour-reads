import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for public operations (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// TypeScript types for our database
export interface Subscriber {
  id: string
  email: string
  name?: string
  age?: number
  gender?: 'male' | 'female' | 'rather_not_say'
  interests?: string[]
  profile_completed: boolean
  profile_token: string
  email_verified: boolean
  subscription_source?: string
  created_at: string
  updated_at: string
}

export interface SubscriberInsert {
  email: string
  name?: string
  age?: number
  gender?: 'male' | 'female' | 'rather_not_say'
  interests?: string[]
  subscription_source?: string
}

export interface SubscriberUpdate {
  name?: string
  age?: number
  gender?: 'male' | 'female' | 'rather_not_say'
  interests?: string[]
  profile_completed?: boolean
  email_verified?: boolean
}

// Helper functions for common database operations
export const subscriberService = {
  // Create new subscriber
  async create(data: SubscriberInsert): Promise<{ data: Subscriber | null; error: any }> {
    return await supabase
      .from('subscribers')
      .insert(data)
      .select()
      .single()
  },

  // Get subscriber by email
  async getByEmail(email: string): Promise<{ data: Subscriber | null; error: any }> {
    return await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('email', email)
      .single()
  },

  // Get subscriber by profile token
  async getByToken(token: string): Promise<{ data: Subscriber | null; error: any }> {
    return await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('profile_token', token)
      .single()
  },

  // Update subscriber profile
  async update(id: string, data: SubscriberUpdate): Promise<{ data: Subscriber | null; error: any }> {
    return await supabaseAdmin
      .from('subscribers')
      .update(data)
      .eq('id', id)
      .select()
      .single()
  },

  // Update subscriber by token (for email-based profile completion)
  async updateByToken(token: string, data: SubscriberUpdate): Promise<{ data: Subscriber | null; error: any }> {
    return await supabaseAdmin
      .from('subscribers')
      .update(data)
      .eq('profile_token', token)
      .select()
      .single()
  },

  // Check if email exists
  async emailExists(email: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .single()
    
    return !error && !!data
  },

  // Get subscriber analytics
  async getAnalytics(): Promise<{ data: any[] | null; error: any }> {
    return await supabaseAdmin
      .from('subscriber_analytics')
      .select('*')
      .limit(30) // Last 30 days
  },

  // Get incomplete profiles (for follow-up emails)
  async getIncompleteProfiles(daysOld: number = 3): Promise<{ data: Subscriber[] | null; error: any }> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)

    return await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('profile_completed', false)
      .lt('created_at', cutoffDate.toISOString())
  }
}

// Common interest options for the frontend
export const INTEREST_OPTIONS = [
  'Finance',
  'Wellness',
  'Cryptocurrency',
  'Retirement Planning',
  'Sleep Optimization',
  'Productivity',
  'Investing',
  'Health & Fitness',
  'Digital Detox',
  'Entrepreneurship',
  'Personal Development',
  'Technology'
] as const

export type InterestOption = typeof INTEREST_OPTIONS[number]