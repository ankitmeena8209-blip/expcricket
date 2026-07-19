import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// Strip trailing /rest/v1/ if present so @supabase/supabase-js uses the base project URL
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "");
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
