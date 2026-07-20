import { Player } from "@/types/player";
import { MOCK_PLAYERS } from "@/lib/mockData/players";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { CricketDataService } from "@/services/cricketDataService";

function withTimeout<T>(promise: PromiseLike<T>, ms: number = 3000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Supabase query timeout")), ms)),
  ]);
}

export class PlayerService {
  static async getAllPlayers(): Promise<Player[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await withTimeout(supabase.from("players").select("*"));
        if (data && !error && data.length > 0) {
          return data.map((item) => ({
            id: item.id,
            name: item.name,
            fullName: item.full_name || item.name,
            country: item.country,
            countryCode: item.country_code || item.country.slice(0, 3).toUpperCase(),
            role: item.role,
            battingStyle: item.batting_style,
            bowlingStyle: item.bowling_style,
            avatarUrl: item.avatar_url || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80",
            countryFlagUrl: item.country_flag_url || "https://flagcdn.com/w80/in.png",
            primaryColor: item.primary_color || "#0055a5",
            accentColor: item.accent_color || "#ffcd00",
            iccRankings: item.icc_rankings || { test: 1, odi: 1, t20i: 1 },
            stats: item.stats || {},
            phaseAnalysis: item.phase_analysis || {},
            formTrend: item.form_trend || [],
            radarMetrics: item.radar_metrics || { consistency: 90, powerHitting: 85, spinAdaptability: 90, paceAdaptability: 90, pressureHandling: 95, clutchIndex: 95 },
          }));
        }
      } catch (err) {
        console.warn("Supabase players query fallback:", err);
      }
    }

    // Live Cricket API Fetch Fallback
    const livePlayers = await CricketDataService.fetchLivePlayers();
    if (livePlayers && livePlayers.length > 0) {
      return livePlayers;
    }

    return MOCK_PLAYERS;
  }

  static async getPlayerById(id: string): Promise<Player | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await withTimeout(supabase.from("players").select("*").eq("id", id).single());
        if (data && !error) {
          return {
            id: data.id,
            name: data.name,
            fullName: data.full_name || data.name,
            country: data.country,
            countryCode: data.country_code || data.country.slice(0, 3).toUpperCase(),
            role: data.role,
            battingStyle: data.batting_style,
            bowlingStyle: data.bowling_style,
            avatarUrl: data.avatar_url || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80",
            countryFlagUrl: data.country_flag_url || "https://flagcdn.com/w80/in.png",
            primaryColor: data.primary_color || "#0055a5",
            accentColor: data.accent_color || "#ffcd00",
            iccRankings: data.icc_rankings || { test: 1, odi: 1, t20i: 1 },
            stats: data.stats || {},
            phaseAnalysis: data.phase_analysis || {},
            formTrend: data.form_trend || [],
            radarMetrics: data.radar_metrics || { consistency: 90, powerHitting: 85, spinAdaptability: 90, paceAdaptability: 90, pressureHandling: 95, clutchIndex: 95 },
          };
        }
      } catch (err) {
        console.warn(`Supabase getPlayerById(${id}) fallback:`, err);
      }
    }

    const allPlayers = await this.getAllPlayers();
    const player = allPlayers.find((p) => p.id === id);
    if (player) return player;

    const mockPlayer = MOCK_PLAYERS.find((p) => p.id === id);
    return mockPlayer || allPlayers[0] || MOCK_PLAYERS[0];
  }

  static async searchPlayers(query: string): Promise<Player[]> {
    const players = await this.getAllPlayers();
    if (!query.trim()) return players;
    const q = query.toLowerCase();
    return players.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.fullName.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q)
    );
  }

  static async getFeaturedPlayer(): Promise<Player> {
    const players = await this.getAllPlayers();
    return players[0] || MOCK_PLAYERS[0];
  }

  static async createPlayer(player: Partial<Player>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from("players").insert({
        id: player.id || `player-${Date.now()}`,
        name: player.name,
        full_name: player.fullName || player.name,
        country: player.country,
        country_code: player.countryCode || "IND",
        role: player.role || "BATTER",
        batting_style: player.battingStyle || "Right-hand bat",
        bowling_style: player.bowlingStyle || "Right-arm medium",
        avatar_url: player.avatarUrl,
        country_flag_url: player.countryFlagUrl,
        primary_color: player.primaryColor || "#0055a5",
        accent_color: player.accentColor || "#ffcd00",
        icc_rankings: player.iccRankings,
        stats: player.stats,
        phase_analysis: player.phaseAnalysis,
        radar_metrics: player.radarMetrics,
      });
      return !error;
    } catch (err) {
      console.error("Failed to create player in Supabase:", err);
      return false;
    }
  }

  static async deletePlayer(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from("players").delete().eq("id", id);
      return !error;
    } catch (err) {
      console.error("Failed to delete player in Supabase:", err);
      return false;
    }
  }
}
