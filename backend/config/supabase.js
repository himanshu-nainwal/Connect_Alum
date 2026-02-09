import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    // Warn but don't crash immediately, as env might not be set yet
    console.warn('Missing Supabase URL or Key. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
