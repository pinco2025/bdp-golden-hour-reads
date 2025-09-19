import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  console.warn('[serverless] Missing Supabase env vars')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export const subscriberService = {
  async create(data: any) {
    const profileToken = data?.profile_token || (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : Math.random().toString(36).slice(2))
    const insertData = { ...data, profile_token: profileToken }
    return await supabaseAdmin
      .from('subscribers')
      .insert(insertData)
      .select()
      .single()
  },

  async getByEmail(email: string) {
    return await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('email', email)
      .single()
  },

  async getByToken(token: string) {
    return await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('profile_token', token)
      .single()
  },

  async updateByToken(token: string, data: any) {
    return await supabaseAdmin
      .from('subscribers')
      .update(data)
      .eq('profile_token', token)
      .select()
      .single()
  },

  async getIncompleteProfiles(daysOld = 3) {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)
    return await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('profile_completed', false)
      .lt('created_at', cutoffDate.toISOString())
  },

  async getAnalytics() {
    return await supabaseAdmin
      .from('subscriber_analytics')
      .select('*')
      .limit(30)
  }
}


