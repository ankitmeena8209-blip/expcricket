import { Player } from "@/types/player";
import { Ground } from "@/types/ground";
import { PlayerService } from "@/services/playerService";
import { GroundService } from "@/services/groundService";

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
    const players = await PlayerService.getAllPlayers();
    const pA = players.find((p) => p.id === playerAId) || players[0];
    const pB = players.find((p) => p.id === playerBId) || players[1] || players[0];

    const avgA = pA.stats?.ODI?.batting?.average || pA.stats?.ALL?.batting?.average || 45;
    const avgB = pB.stats?.ODI?.batting?.average || pB.stats?.ALL?.batting?.average || 42;

    return {
      entityA: pA,
      entityB: pB,
      advantages: {
        entityAAdvantages: [
          `Higher Career Average (${avgA} vs ${avgB})`,
          `Superior Pressure & Run Chase Record (${pA.radarMetrics?.clutchIndex || 95} Clutch Index)`,
          `Higher Total Centuries (${pA.stats?.ALL?.batting?.hundreds || 5})`,
        ],
        entityBAdvantages: [
          `Superior Powerplay Strike Rate (${pB.phaseAnalysis?.ODI?.powerplay?.strikeRate || 110})`,
          `Role Versatility & Tactical Field Adaptability`,
          `Higher Boundary Percentage (${pB.stats?.ALL?.batting?.boundaryPercentage || 60}%)`,
        ],
      },
    };
  }

  static async compareGrounds(groundAId: string, groundBId: string): Promise<ComparisonResult<Ground>> {
    const grounds = await GroundService.getAllGrounds();
    const gA = grounds.find((g) => g.id === groundAId) || grounds[0];
    const gB = grounds.find((g) => g.id === groundBId) || grounds[1] || grounds[0];

    return {
      entityA: gA,
      entityB: gB,
      advantages: {
        entityAAdvantages: [
          `Larger Capacity (${gA.capacity?.toLocaleString() || '45,000'} spectators)`,
          `Surface Profile: ${gA.pitchType}`,
          `Straight Boundary Dimension (${gA.boundaryDimensions?.straight || 78}m)`,
        ],
        entityBAdvantages: [
          `Dynamic Weather Adaptability & Pitch Moisture Variance`,
          `Surface Profile: ${gB.pitchType}`,
          `Chasing Win Percentage (${gB.stats?.T20I?.chasingWinPct || 52}%)`,
        ],
      },
    };
  }
}
