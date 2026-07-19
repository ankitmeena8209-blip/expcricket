import { PlayerService } from "./playerService";
import { GroundService } from "./groundService";
import { MatchService } from "./matchService";

export interface SearchResultItem {
  id: string;
  type: "PLAYER" | "GROUND" | "MATCH";
  title: string;
  subtitle: string;
  url: string;
}

export class SearchService {
  static async searchAll(query: string): Promise<SearchResultItem[]> {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const results: SearchResultItem[] = [];

    const players = await PlayerService.getAllPlayers();
    players.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.fullName.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q)
      ) {
        results.push({
          id: p.id,
          type: "PLAYER",
          title: p.name,
          subtitle: `${p.country} • ${p.role}`,
          url: `/player-intelligence?id=${p.id}`,
        });
      }
    });

    const grounds = await GroundService.getAllGrounds();
    grounds.forEach((g) => {
      if (
        g.name.toLowerCase().includes(q) ||
        g.shortName.toLowerCase().includes(q) ||
        g.city.toLowerCase().includes(q) ||
        g.country.toLowerCase().includes(q)
      ) {
        results.push({
          id: g.id,
          type: "GROUND",
          title: g.name,
          subtitle: `${g.city}, ${g.country} • Pitch: ${g.pitchType}`,
          url: `/ground-intelligence?id=${g.id}`,
        });
      }
    });

    const matches = await MatchService.getAllMatches();
    matches.forEach((m) => {
      if (
        m.title.toLowerCase().includes(q) ||
        m.series.toLowerCase().includes(q) ||
        m.venue.toLowerCase().includes(q)
      ) {
        results.push({
          id: m.id,
          type: "MATCH",
          title: m.title,
          subtitle: `${m.series} • ${m.status}`,
          url: `/match-analysis?id=${m.id}`,
        });
      }
    });

    return results;
  }
}
