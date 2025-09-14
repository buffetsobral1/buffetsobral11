// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

// These values will be replaced by environment variables in production
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and key are required');
}

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };