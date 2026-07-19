import { Player } from "@/types/player";
import { MOCK_PLAYERS } from "@/lib/mockData/players";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export class PlayerService {
  static async getAllPlayers(): Promise<Player[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("players").select("*");
        if (data && !error && data.length > 0) {
          return data as Player[];
        }
      } catch (err) {
        console.warn("Supabase query fallback to mock data:", err);
      }
    }
    return MOCK_PLAYERS;
  }

  static async getPlayerById(id: string): Promise<Player | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("players").select("*").eq("id", id).single();
        if (data && !error) {
          return data as Player;
        }
      } catch (err) {
        console.warn(`Supabase getPlayerById(${id}) fallback:`, err);
      }
    }
    const player = MOCK_PLAYERS.find((p) => p.id === id);
    return player || MOCK_PLAYERS[0];
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
    const player = await this.getPlayerById("virat-kohli");
    return player || MOCK_PLAYERS[0];
  }
}
