import { MOCK_PLAYERS } from "@/lib/mockData/players";
import { MOCK_GROUNDS } from "@/lib/mockData/grounds";
import { MOCK_MATCHES } from "@/lib/mockData/matches";

export interface SearchResultItem {
  id: string;
  type: "PLAYER" | "GROUND" | "MATCH";
  title: string;
  subtitle: string;
  url: string;
  image?: string;
}

export class SearchService {
  static async globalSearch(query: string): Promise<SearchResultItem[]> {
    if (!query || query.trim().length === 0) return [];
    const q = query.toLowerCase().trim();

    const results: SearchResultItem[] = [];

    // Search Players
    MOCK_PLAYERS.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q)
      ) {
        results.push({
          id: p.id,
          type: "PLAYER",
          title: p.name,
          subtitle: `${p.country} • ${p.role}`,
          url: `/player-intelligence?id=${p.id}`,
          image: p.avatarUrl,
        });
      }
    });

    // Search Grounds
    MOCK_GROUNDS.forEach((g) => {
      if (
        g.name.toLowerCase().includes(q) ||
        g.city.toLowerCase().includes(q) ||
        g.shortName.toLowerCase().includes(q)
      ) {
        results.push({
          id: g.id,
          type: "GROUND",
          title: g.name,
          subtitle: `${g.city}, ${g.country} • ${g.pitchType}`,
          url: `/ground-intelligence?id=${g.id}`,
          image: g.imageUrl,
        });
      }
    });

    // Search Matches
    MOCK_MATCHES.forEach((m) => {
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
