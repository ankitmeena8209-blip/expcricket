import { AIAnalysisRequest, AIAnalysisResponse, AIProvider, AICacheEntry } from "@/types/ai";

// Simulated AI Cache store in memory for client/server execution
const aiCacheStore: Map<string, AICacheEntry> = new Map();

export class AIService {
  static getActiveProvider(): AIProvider {
    const provider = process.env.DEFAULT_AI_PROVIDER as AIProvider;
    return provider && ["gemini", "openai", "grok"].includes(provider) ? provider : "gemini";
  }

  static async analyzeQuery(req: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const provider = req.provider || this.getActiveProvider();
    const cacheKey = `${provider}:${req.contextType || "GEN"}:${req.prompt.trim().toLowerCase()}`;

    // 1. Check AI Cache
    if (aiCacheStore.has(cacheKey)) {
      const cached = aiCacheStore.get(cacheKey)!;
      if (new Date(cached.expiresAt).getTime() > Date.now()) {
        return { ...cached.response, cached: true };
      }
    }

    // 2. Generate simulated AI response with high-level cricket intelligence
    const timestamp = new Date().toISOString();
    const modelName =
      provider === "gemini"
        ? "Gemini 1.5 Pro Cricket"
        : provider === "openai"
        ? "GPT-4o Sports Intelligence"
        : "Grok 2 Cricket Engine";

    const response: AIAnalysisResponse = {
      id: `ai-res-${Date.now()}`,
      provider,
      modelName,
      prompt: req.prompt,
      content: `[${modelName} Tactical Analysis]\n\nBased on predictive trajectory models and historical pitch telemetry for "${req.prompt}":\n\n1. Pitch Behavior & Seam Index: High seam movement expected in the opening 15 overs (1.8° average lateral deviation).\n2. Batter Matchup Dynamics: Vulnerability identified against full-length deliveries outside off-stump at 140+ km/h.\n3. Tactical Recommendation: Deploy a deep fine-leg and aggressive short-cover fielder to catch upper-edge top slices.`,
      structuredOutput: {
        summary: `Strategic forecast indicates a 62% win probability bias for team batting first under cloudy overhead conditions.`,
        winProbability: { teamA: 62, teamB: 38 },
        keyRisks: [
          "Middle-overs spin collapse risk (38% dot ball rate)",
          "Overhead rain delay potential (15% probability)",
        ],
        tacticalRecommendations: [
          "Bowl tight stump-to-stump lines in Powerplay",
          "Target batter's front-leg pads early in innings",
        ],
        fantasyOptimizer: [
          { name: "Virat Kohli", role: "Batter", projectedPoints: 92 },
          { name: "Jasprit Bumrah", role: "Bowler", projectedPoints: 88 },
          { name: "Travis Head", role: "Batter", projectedPoints: 81 },
        ],
      },
      timestamp,
      cached: false,
    };

    // 3. Store in AI Cache (Expires in 1 hour)
    aiCacheStore.set(cacheKey, {
      cacheKey,
      request: req,
      response,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    });

    return response;
  }

  static getCachedEntries(): AICacheEntry[] {
    return Array.from(aiCacheStore.values());
  }

  static clearCache(): void {
    aiCacheStore.clear();
  }
}
