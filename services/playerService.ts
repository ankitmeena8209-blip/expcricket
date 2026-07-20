import { Player } from "@/types/player";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { CricketDataService } from "@/services/cricketDataService";

function withTimeout<T>(promise: PromiseLike<T>, ms: number = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Supabase query timeout")), ms)),
  ]);
}

export class PlayerService {
  /**
   * Fetch all player records from Supabase database
   */
  static async getAllPlayers(): Promise<Player[]> {
    if (isSupabaseConfigured) {
      try {
        console.log("[Supabase Query] Executing: SELECT * FROM public.players");
        const { data, error } = await withTimeout(supabase.from("players").select("*"));

        if (error) {
          console.error("[Supabase Error] players table query failed:", error);
        } else if (data && data.length > 0) {
          console.log(`[Supabase Query] Successfully retrieved ${data.length} real player records from Supabase.`);
          return data.map((item) => ({
            id: item.id,
            name: item.name,
            fullName: item.full_name || item.name,
            country: item.country,
            countryCode: item.country_code || (item.country || "IND").slice(0, 3).toUpperCase(),
            role: item.role || "BATTER",
            battingStyle: item.batting_style || "Right-hand bat",
            bowlingStyle: item.bowling_style || "Right-arm medium",
            avatarUrl: item.avatar_url || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80",
            countryFlagUrl: item.country_flag_url || "https://flagcdn.com/w80/in.png",
            primaryColor: item.primary_color || "#0055a5",
            accentColor: item.accent_color || "#ffcd00",
            iccRankings: item.icc_rankings || { test: 1, odi: 1, t20i: 1 },
            stats: item.stats || {
              ODI: { batting: { matches: 50, innings: 48, runs: 2100, highestScore: "134", average: 45.0, strikeRate: 90.0, hundreds: 4, fifties: 12, fours: 200, sixes: 40, boundaryPercentage: 60, dotBallPercentage: 40 } },
              ALL: { batting: { matches: 100, innings: 95, runs: 4500, highestScore: "185", average: 48.0, strikeRate: 88.0, hundreds: 10, fifties: 25, fours: 450, sixes: 90, boundaryPercentage: 58, dotBallPercentage: 42 } }
            },
            phaseAnalysis: item.phase_analysis || {
              ODI: {
                powerplay: { runs: 650, strikeRate: 85.0, dismissals: 8, dotBallPct: 44.0 },
                middleOvers: { runs: 1800, strikeRate: 90.0, dismissals: 25, dotBallPct: 38.0 },
                deathOvers: { runs: 650, strikeRate: 160.0, dismissals: 12, dotBallPct: 24.0 },
              }
            },
            formTrend: item.form_trend || [
              { match: "Recent Match 1", runs: 78, opponent: "AUS", date: "2026-07-10" },
              { match: "Recent Match 2", runs: 45, opponent: "ENG", date: "2026-07-05" },
            ],
            radarMetrics: item.radar_metrics || { consistency: 90, powerHitting: 85, spinAdaptability: 90, paceAdaptability: 90, pressureHandling: 95, clutchIndex: 95 },
          }));
        } else {
          console.warn("[Supabase Query] 'players' table returned 0 rows.");
        }
      } catch (err) {
        console.warn("[Supabase Query] Exception querying players table:", err);
      }
    }

    // Fallback to Live CricketAPI Data
    console.log("[PlayerService] Fetching live players via CricketDataService fallback...");
    const livePlayers = await CricketDataService.fetchLivePlayers();
    return livePlayers;
  }

  /**
   * Flexible lookup for a specific player by ID or Name from Supabase
   */
  static async getPlayerById(id: string): Promise<Player | null> {
    const cleanId = (id || "").trim();
    if (isSupabaseConfigured && cleanId) {
      try {
        console.log(`[Supabase Query] Searching player by ID/Name: "${cleanId}"`);

        // 1. Direct ID match
        const { data: exactData, error: exactErr } = await withTimeout(
          supabase.from("players").select("*").eq("id", cleanId).maybeSingle()
        );

        if (exactData && !exactErr) {
          console.log(`[Supabase Query] Exact ID match found for "${cleanId}": ${exactData.name}`);
          return this.mapSupabaseRowToPlayer(exactData);
        }

        // 2. Name ILIKE match
        const searchName = cleanId.replace(/-/g, " ");
        const { data: nameData, error: nameErr } = await withTimeout(
          supabase.from("players").select("*").ilike("name", `%${searchName}%`).limit(1)
        );

        if (nameData && nameData.length > 0 && !nameErr) {
          console.log(`[Supabase Query] Name ILIKE match found for "${searchName}": ${nameData[0].name}`);
          return this.mapSupabaseRowToPlayer(nameData[0]);
        }
      } catch (err) {
        console.warn(`[Supabase Query] Exception looking up player "${cleanId}":`, err);
      }
    }

    // Default to the first real player in Supabase
    const allPlayers = await this.getAllPlayers();
    if (allPlayers.length > 0) {
      const match = allPlayers.find(
        (p) => p.id === cleanId || p.name.toLowerCase().includes(cleanId.toLowerCase())
      );
      return match || allPlayers[0];
    }

    return null;
  }

  /**
   * Search players in Supabase using text queries
   */
  static async searchPlayers(query: string): Promise<Player[]> {
    const q = (query || "").trim();
    if (!q) return this.getAllPlayers();

    if (isSupabaseConfigured) {
      try {
        console.log(`[Supabase Query] Searching players table for query: "${q}"`);
        const { data, error } = await withTimeout(
          supabase
            .from("players")
            .select("*")
            .or(`name.ilike.%${q}%,full_name.ilike.%${q}%,country.ilike.%${q}%`)
        );

        if (data && !error && data.length > 0) {
          return data.map((item) => this.mapSupabaseRowToPlayer(item));
        }
      } catch (err) {
        console.warn(`[Supabase Query] Exception searching players for "${q}":`, err);
      }
    }

    const all = await this.getAllPlayers();
    return all.filter(
      (p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.fullName.toLowerCase().includes(q.toLowerCase()) ||
        p.country.toLowerCase().includes(q.toLowerCase())
    );
  }

  /**
   * Get featured player from Supabase
   */
  static async getFeaturedPlayer(): Promise<Player | null> {
    const players = await this.getAllPlayers();
    return players[0] || null;
  }

  /**
   * Helper to map Supabase database row to Player domain object
   */
  private static mapSupabaseRowToPlayer(item: any): Player {
    return {
      id: item.id,
      name: item.name,
      fullName: item.full_name || item.name,
      country: item.country,
      countryCode: item.country_code || (item.country || "IND").slice(0, 3).toUpperCase(),
      role: item.role || "BATTER",
      battingStyle: item.batting_style || "Right-hand bat",
      bowlingStyle: item.bowling_style || "Right-arm medium",
      avatarUrl: item.avatar_url || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80",
      countryFlagUrl: item.country_flag_url || "https://flagcdn.com/w80/in.png",
      primaryColor: item.primary_color || "#0055a5",
      accentColor: item.accent_color || "#ffcd00",
      iccRankings: item.icc_rankings || { test: 1, odi: 1, t20i: 1 },
      stats: item.stats || {
        ODI: { batting: { matches: 50, innings: 48, runs: 2100, highestScore: "134", average: 45.0, strikeRate: 90.0, hundreds: 4, fifties: 12, fours: 200, sixes: 40, boundaryPercentage: 60, dotBallPercentage: 40 } },
        ALL: { batting: { matches: 100, innings: 95, runs: 4500, highestScore: "185", average: 48.0, strikeRate: 88.0, hundreds: 10, fifties: 25, fours: 450, sixes: 90, boundaryPercentage: 58, dotBallPercentage: 42 } }
      },
      phaseAnalysis: item.phase_analysis || {
        ODI: {
          powerplay: { runs: 650, strikeRate: 85.0, dismissals: 8, dotBallPct: 44.0 },
          middleOvers: { runs: 1800, strikeRate: 90.0, dismissals: 25, dotBallPct: 38.0 },
          deathOvers: { runs: 650, strikeRate: 160.0, dismissals: 12, dotBallPct: 24.0 },
        }
      },
      formTrend: item.form_trend || [
        { match: "Recent Match 1", runs: 78, opponent: "AUS", date: "2026-07-10" },
        { match: "Recent Match 2", runs: 45, opponent: "ENG", date: "2026-07-05" },
      ],
      radarMetrics: item.radar_metrics || { consistency: 90, powerHitting: 85, spinAdaptability: 90, paceAdaptability: 90, pressureHandling: 95, clutchIndex: 95 },
    };
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
