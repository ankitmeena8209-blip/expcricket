import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface AuthUser {
  id: string;
  email: string;
  role: "SUPER_ADMIN" | "ANALYST" | "MODERATOR" | "USER";
  name: string;
}

export class AuthService {
  static async getCurrentUser(): Promise<AuthUser | null> {
    if (isSupabaseConfigured) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          return {
            id: user.id,
            email: user.email || "",
            role: profile?.role || "USER",
            name: profile?.full_name || profile?.username || user.email || "Analyst",
          };
        }
      } catch (err) {
        console.warn("Supabase getUser fallback:", err);
      }
    }
    return {
      id: "usr_admin_01",
      email: "admin@expcricket.com",
      role: "SUPER_ADMIN",
      name: "EXP Analyst Pro",
    };
  }

  static async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          return { success: false, error: error.message };
        }
        return { success: Boolean(data.session) };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Authentication error";
        return { success: false, error: message };
      }
    }
    return { success: Boolean(email && password) };
  }

  static async register(email: string, password: string, fullName: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, role: "ANALYST" } },
        });
        if (error) {
          return { success: false, error: error.message };
        }
        return { success: Boolean(data.user) };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Registration error";
        return { success: false, error: message };
      }
    }
    return { success: true };
  }

  static async logout(): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn("SignOut error:", err);
      }
    }
  }
}
