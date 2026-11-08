
import { createBrowserClient } from "@supabase/ssr";

let supabase;

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (!supabase) {
    supabase = createBrowserClient(url, anonKey);
  }

  return supabase;
}
