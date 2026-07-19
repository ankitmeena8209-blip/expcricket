import { Team } from "@/types/team";
import { MOCK_TEAMS } from "@/lib/mockData/teams";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export class TeamService {
  static async getAllTeams(): Promise<Team[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("teams").select("*");
        if (data && !error && data.length > 0) {
          return data.map((item) => ({
            id: item.id,
            name: item.name,
            code: item.code,
            flagUrl: item.flag_url || "https://flagcdn.com/w80/in.png",
            primaryColor: item.primary_color || "#0055a5",
            accentColor: item.accent_color || "#ffcd00",
            captain: item.captain || "",
            coach: item.coach || "",
            rankings: item.rankings || { test: 1, odi: 1, t20i: 1 },
            headToHeadRecords: item.head_to_head_records || [],
          }));
        }
      } catch (err) {
        console.warn("Supabase teams query fallback:", err);
      }
    }
    return MOCK_TEAMS;
  }

  static async getTeamById(id: string): Promise<Team | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("teams").select("*").eq("id", id).single();
        if (data && !error) {
          return {
            id: data.id,
            name: data.name,
            code: data.code,
            flagUrl: data.flag_url || "https://flagcdn.com/w80/in.png",
            primaryColor: data.primary_color || "#0055a5",
            accentColor: data.accent_color || "#ffcd00",
            captain: data.captain || "",
            coach: data.coach || "",
            rankings: data.rankings || { test: 1, odi: 1, t20i: 1 },
            headToHeadRecords: data.head_to_head_records || [],
          };
        }
      } catch (err) {
        console.warn(`Supabase getTeamById(${id}) fallback:`, err);
      }
    }
    const team = MOCK_TEAMS.find((t) => t.id === id);
    return team || MOCK_TEAMS[0];
  }

  static async createTeam(team: Partial<Team>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from("teams").insert({
        id: team.id || `team-${Date.now()}`,
        name: team.name,
        code: team.code,
        flag_url: team.flagUrl,
        primary_color: team.primaryColor || "#0055a5",
        accent_color: team.accentColor || "#ffcd00",
        captain: team.captain,
        coach: team.coach,
        rankings: team.rankings,
      });
      return !error;
    } catch (err) {
      console.error("Failed to create team in Supabase:", err);
      return false;
    }
  }

  static async deleteTeam(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from("teams").delete().eq("id", id);
      return !error;
    } catch (err) {
      console.error("Failed to delete team in Supabase:", err);
      return false;
    }
  }
}
