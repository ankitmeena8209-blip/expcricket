// Placeholder Supabase Client Adapter
// When connecting to Supabase in the future, initialize createClient() here.

export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("your-project") && !key.includes("placeholder"));
};

export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  // Future implementation:
  // return createClient<Database>(url, key);
  return null;
};
