import { createClient } from "@supabase/supabase-js"

export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error("Supabase env vars missing. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY.")
  }
  return createClient(url, anon, {
    auth: { persistSession: false },
  })
}
