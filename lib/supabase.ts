import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;


if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL tidak ditemukan");
}

if (!supabaseKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY tidak ditemukan");
}

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
