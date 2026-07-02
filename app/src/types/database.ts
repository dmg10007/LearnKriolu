// Auto-generated Supabase types — regenerate with:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          xp_total: number
          streak_count: number
          last_active_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      lessons: {
        Row: {
          id: string
          title: string
          description: string | null
          category: 'vocabulary' | 'grammar' | 'phrasebook'
          level: 'beginner' | 'intermediate' | 'advanced'
          order_index: number
          is_published: boolean
          cover_emoji: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>
      }
      lesson_items: {
        Row: {
          id: string
          lesson_id: string
          kriolu_text: string
          english_text: string
          pronunciation_hint: string | null
          audio_url: string | null
          example_sentence_kriolu: string | null
          example_sentence_english: string | null
          item_type: 'word' | 'phrase' | 'sentence'
          order_index: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lesson_items']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['lesson_items']['Insert']>
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_item_id: string
          due_date: string
          stability: number
          difficulty: number
          elapsed_days: number
          scheduled_days: number
          reps: number
          lapses: number
          state: number
          last_review: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_progress']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>
      }
      user_lesson_completion: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          score: number
          xp_earned: number
          completed_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_lesson_completion']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['user_lesson_completion']['Insert']>
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          type: string
          earned_at: string
        }
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
