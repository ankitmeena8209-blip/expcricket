import { Player } from "@/types/player";
import { Ground } from "@/types/ground";
import { MOCK_PLAYERS } from "@/lib/mockData/players";
import { MOCK_GROUNDS } from "@/lib/mockData/grounds";

export interface ComparisonResult<T> {
  entityA: T;
  entityB: T;
  advantages: {
    entityAAdvantages: string[];
    entityBAdvantages: string[];
  };
}

export class CompareService {
  static async comparePlayers(playerAId: string, playerBId: string): Promise<ComparisonResult<Player>> {
    const pA = MOCK_PLAYERS.find((p) => p.id === playerAId) || MOCK_PLAYERS[0];
    const pB = MOCK_PLAYERS.find((p) => p.id === playerBId) || MOCK_PLAYERS[1] || MOCK_PLAYERS[0];

    const avgA = pA.stats.ODI?.batting?.average || 0;
    const avgB = pB.stats.ODI?.batting?.average || 0;

    return {
      entityA: pA,
      entityB: pB,
      advantages: {
        entityAAdvantages: [
          `Higher ODI Career Average (${avgA} vs ${avgB})`,
          `Superior Pressure & Run Chase Record (99 Clutch Index)`,
          `Higher Total Centuries (80 vs ${pB.stats.ALL?.batting?.hundreds || 0})`,
        ],
        entityBAdvantages: [
          `Superior Powerplay Strike Rate (158.47 vs 137.04)`,
          `Left-Hand Batting Angle Advantage against right-arm off-spin`,
          `Higher T20I Boundary Percentage (68.9%)`,
        ],
      },
    };
  }

  static async compareGrounds(groundAId: string, groundBId: string): Promise<ComparisonResult<Ground>> {
    const gA = MOCK_GROUNDS.find((g) => g.id === groundAId) || MOCK_GROUNDS[0];
    const gB = MOCK_GROUNDS.find((g) => g.id === groundBId) || MOCK_GROUNDS[1] || MOCK_GROUNDS[0];

    return {
      entityA: gA,
      entityB: gB,
      advantages: {
        entityAAdvantages: [
          `Larger Capacity (${gA.capacity.toLocaleString()} spectators)`,
          `Pace & Seam Dominance (76.4% pace wickets)`,
          `Larger Straight Boundaries (85m)`,
        ],
        entityBAdvantages: [
          `Higher Swing Index in Overcast Weather`,
          `Balanced Pitch Suitability for Spinners (25.8% spin wickets)`,
          `Higher First Innings Winning % (54.4%)`,
        ],
      },
    };
  }
}
