import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

console.log(URL, KEY);
export const supabase = createClient(URL, KEY);
