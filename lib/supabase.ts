// Reusable Supabase Client Wrapper for Vercel & Supabase
// Ensures credentials are read safely from process.env without exposing server keys to the client.

export const getSupabaseConfig = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your_supabase_anon_key_placeholder";

  const isConfigured =
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes("your-project") &&
    !supabaseAnonKey.includes("placeholder");

  return { supabaseUrl, supabaseAnonKey, isConfigured };
};

export class SupabaseAdapter {
  static isReady(): boolean {
    return getSupabaseConfig().isConfigured;
  }

  // Generic query wrapper ready for future Supabase client initialization
  static async queryTable<T>(tableName: string): Promise<T[] | null> {
    if (!this.isReady()) {
      return null;
    }
    // Future Supabase client call:
    // const { data, error } = await supabase.from(tableName).select('*');
    return null;
  }
}
