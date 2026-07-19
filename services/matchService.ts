import { Match } from "@/types/match";
import { MOCK_MATCHES } from "@/lib/mockData/matches";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export class MatchService {
  static async getAllMatches(): Promise<Match[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("matches").select("*");
        if (data && !error && data.length > 0) {
          return data as Match[];
        }
      } catch (err) {
        console.warn("Supabase matches query fallback to mock data:", err);
      }
    }
    return MOCK_MATCHES;
  }

  static async getMatchById(id: string): Promise<Match | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("matches").select("*").eq("id", id).single();
        if (data && !error) {
          return data as Match;
        }
      } catch (err) {
        console.warn(`Supabase getMatchById(${id}) fallback:`, err);
      }
    }
    const match = MOCK_MATCHES.find((m) => m.id === id);
    return match || MOCK_MATCHES[0];
  }
}
