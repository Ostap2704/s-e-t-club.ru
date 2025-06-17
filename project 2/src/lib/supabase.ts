import { createClient } from '@supabase/supabase-js'
import { config } from './config'

const supabaseUrl = config.supabase.url
const supabaseAnonKey = config.supabase.anonKey

// Enhanced error handling for production with fallback
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://demo.supabase.co') {
  console.warn('⚠️ Using demo Supabase configuration');
  console.warn('🔧 To use real Supabase:');
  console.warn('1. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  console.warn('2. Rebuild the project');
}

// Create Supabase client with fallback for missing credentials
export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'X-Client-Info': 'social-elite-tennis@1.0.9'
      },
      fetch: (url, options = {}) => {
        // Add timeout and better error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        return fetch(url, {
          ...options,
          signal: controller.signal,
        }).finally(() => {
          clearTimeout(timeoutId);
        }).catch(error => {
          if (error.name === 'AbortError') {
            throw new Error('Request timeout - please check your internet connection');
          }
          throw error;
        });
      }
    }
  }
)

// Test connection only if not using demo config
if (config.isProduction && supabaseUrl !== 'https://demo.supabase.co') {
  supabase.from('profiles').select('count').limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.error('❌ Supabase connection failed:', error.message);
        console.warn('🔄 Site will work with limited functionality');
      } else {
        console.log('✅ Supabase connected successfully');
      }
    })
    .catch(error => {
      console.error('❌ Supabase connection error:', error);
      console.warn('🔄 Site will work with limited functionality');
    });
}

// Types for our database tables
export interface Profile {
  id: string
  name: string
  email: string
  location?: string
  bio?: string
  phone?: string
  level?: string
  favorite_shot?: string
  play_style?: string
  profile_image?: string
  created_at: string
  updated_at: string
}

export interface PlayerStats {
  id: string
  user_id: string
  matches_played: number
  wins: number
  losses: number
  ranking: number
  points: number
  created_at: string
  updated_at: string
}

export interface Tournament {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  location: string
  registration_deadline: string
  status: string
  format: string
  entry_fee: string
  prize_pool: string
  skill_levels: string[]
  max_participants: number
  image_url?: string
  created_at: string
}

export interface TournamentRegistration {
  id: string
  tournament_id: string
  user_id: string
  registration_date: string
  status: string
}

export interface Match {
  id: string
  tournament_id?: string
  player1_id: string
  player2_id: string
  winner_id?: string
  score?: string
  match_date: string
  status: string
  created_at: string
}