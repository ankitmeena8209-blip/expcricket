import { Match } from "@/types/match";
import { MOCK_MATCHES } from "@/lib/mockData/matches";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export class MatchService {
  static async getAllMatches(): Promise<Match[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("matches").select("*");
        if (data && !error && data.length > 0) {
          return data.map((item) => ({
            id: item.id,
            title: item.title,
            series: item.series,
            format: item.format,
            status: item.status,
            venue: item.venue,
            date: item.date,
            teamA: item.team_a,
            teamB: item.team_b,
            resultSummary: item.result_summary,
            playerOfTheMatch: item.player_of_the_match,
            winProbabilityMatrix: item.win_probability_matrix,
            tacticalNotes: item.tactical_notes,
          }));
        }
      } catch (err) {
        console.warn("Supabase matches query fallback:", err);
      }
    }
    return MOCK_MATCHES;
  }

  static async getMatchById(id: string): Promise<Match | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("matches").select("*").eq("id", id).single();
        if (data && !error) {
          return {
            id: data.id,
            title: data.title,
            series: data.series,
            format: data.format,
            status: data.status,
            venue: data.venue,
            date: data.date,
            teamA: data.team_a,
            teamB: data.team_b,
            resultSummary: data.result_summary,
            playerOfTheMatch: data.player_of_the_match,
            winProbabilityMatrix: data.win_probability_matrix,
            tacticalNotes: data.tactical_notes,
          };
        }
      } catch (err) {
        console.warn(`Supabase getMatchById(${id}) fallback:`, err);
      }
    }
    const match = MOCK_MATCHES.find((m) => m.id === id);
    return match || MOCK_MATCHES[0];
  }

  static async createMatch(match: Partial<Match>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from("matches").insert({
        id: match.id || `match-${Date.now()}`,
        title: match.title,
        series: match.series,
        format: match.format || "TEST",
        status: match.status || "LIVE",
        venue: match.venue,
        date: match.date || new Date().toISOString().split("T")[0],
        team_a: match.teamA,
        team_b: match.teamB,
        result_summary: match.resultSummary,
        player_of_the_match: match.playerOfTheMatch,
      });
      return !error;
    } catch (err) {
      console.error("Failed to create match in Supabase:", err);
      return false;
    }
  }

  static async deleteMatch(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from("matches").delete().eq("id", id);
      return !error;
    } catch (err) {
      console.error("Failed to delete match in Supabase:", err);
      return false;
    }
  }
}
