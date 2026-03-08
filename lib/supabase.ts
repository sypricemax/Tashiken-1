import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Belt {
  id: string;
  name: string;
  order: number;
  color_hex: string;
  youtube_url?: string | null;
  created_at: string;
}

export interface Syllabus {
  id: string;
  belt_id: string;
  kata: string;
  combination: string;
  kick: string;
  stance: string;
  punch: string;
  blocking: string;
  notes: string;
  created_at: string;
}

export interface Video {
  id: string;
  belt_id: string | null;
  title: string;
  youtube_url: string;
  description: string;
  order: number;
  created_at: string;
}

export interface ClubInfo {
  id: string;
  training_times: string;
  venue: string;
  instructor_details: string;
  contact_info: string;
  general_guidance: string;
  club_name: string;
  updated_at: string;
}
