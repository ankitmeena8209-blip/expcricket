import { MOCK_MATCHES } from "@/lib/mockData/matches";
import { Match } from "@/types/match";

export class MatchService {
  static async getAllMatches(): Promise<Match[]> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_MATCHES), 100));
  }

  static async getLiveMatch(): Promise<Match> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_MATCHES.find((m) => m.status === "LIVE") || MOCK_MATCHES[0]), 100)
    );
  }

  static async getMatchById(id: string): Promise<Match | null> {
    return new Promise((resolve) => {
      const match = MOCK_MATCHES.find((m) => m.id === id) || MOCK_MATCHES[0];
      setTimeout(() => resolve(match), 100);
    });
  }
}
