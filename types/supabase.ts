// Database Table Type Definitions for Future Supabase Integration
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          country: string;
          role: string;
          batting_style: string;
          bowling_style: string;
          avatar_url: string;
          country_flag_url: string;
          primary_color: string;
          accent_color: string;
          stats_json: Json;
        };
        Insert: Omit<Database["public"]["Tables"]["players"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["players"]["Insert"]>;
      };
      grounds: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          city: string;
          country: string;
          capacity: number;
          pitch_type: string;
          image_url: string;
          venue_stats_json: Json;
        };
        Insert: Omit<Database["public"]["Tables"]["grounds"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["grounds"]["Insert"]>;
      };
      matches: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          series: string;
          format: string;
          status: string;
          venue_id: string;
          date: string;
          team_a_code: string;
          team_b_code: string;
          match_data_json: Json;
        };
        Insert: Omit<Database["public"]["Tables"]["matches"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["matches"]["Insert"]>;
      };
      ai_cache: {
        Row: {
          id: string;
          created_at: string;
          cache_key: string;
          provider: string;
          prompt: string;
          response_json: Json;
          expires_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["ai_cache"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["ai_cache"]["Insert"]>;
      };
      user_favorites: {
        Row: {
          id: string;
          user_id: string;
          entity_type: "PLAYER" | "GROUND" | "MATCH";
          entity_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_favorites"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["user_favorites"]["Insert"]>;
      };
    };
  };
}
