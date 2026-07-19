import { MOCK_PLAYERS } from "@/lib/mockData/players";
import { Player } from "@/types/player";

export class PlayerService {
  static async getAllPlayers(): Promise<Player[]> {
    // Simulate async data fetching
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PLAYERS), 100);
    });
  }

  static async getPlayerById(id: string): Promise<Player | null> {
    return new Promise((resolve) => {
      const player = MOCK_PLAYERS.find(
        (p) => p.id === id || p.name.toLowerCase().includes(id.toLowerCase())
      ) || MOCK_PLAYERS[0]; // Fallback to Kohli if requested ID not found
      setTimeout(() => resolve(player), 100);
    });
  }

  static async searchPlayers(query: string): Promise<Player[]> {
    const q = query.toLowerCase();
    return MOCK_PLAYERS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.countryCode.toLowerCase().includes(q)
    );
  }
}
