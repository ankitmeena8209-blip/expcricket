import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your-project") &&
    !supabaseAnonKey.includes("placeholder")
);

// Fallback values prevent @supabase/supabase-js from throwing invalid URL errors during SSG build
const safeUrl = isSupabaseConfigured ? supabaseUrl : "https://placeholder-project.supabase.co";
const safeAnonKey = isSupabaseConfigured
  ? supabaseAnonKey
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";

export const supabase = createClient(safeUrl, safeAnonKey);
