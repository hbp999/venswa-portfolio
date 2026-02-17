import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fwonfdnhbtfhfybwrcoh.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_9f3PbzlRM9_V7ykRkmpbwA_TB3JfeFO'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
