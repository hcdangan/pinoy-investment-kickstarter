import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          age_range: string | null
          income_range: string | null
          risk_tolerance: string | null
          experience_level: string | null
          goals: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string
          age_range?: string
          income_range?: string
          risk_tolerance?: string
          experience_level?: string
          goals?: string[]
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          title?: string
        }
        Update: {
          title?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          role: 'user' | 'assistant'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id?: string
          role: 'user' | 'assistant'
          content: string
        }
        Update: {
          content?: string
        }
      }
      investment_goals: {
        Row: {
          id: string
          user_id: string
          title: string
          target_amount: number
          current_amount: number
          timeline: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          title: string
          target_amount?: number
          current_amount?: number
          timeline?: string
          status?: string
        }
        Update: Partial<Database['public']['Tables']['investment_goals']['Insert']>
      }
      watchlists: {
        Row: {
          id: string
          user_id: string
          symbol: string
          name: string
          instrument_type: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          symbol: string
          name: string
          instrument_type?: string
          notes?: string
        }
        Update: Partial<Database['public']['Tables']['watchlists']['Insert']>
      }
      learning_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          module_title: string | null
          status: string
          score: number
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          module_id: string
          module_title?: string
          status?: string
          score?: number
          completed_at?: string
        }
        Update: Partial<Database['public']['Tables']['learning_progress']['Insert']>
      }
    }
  }
}
