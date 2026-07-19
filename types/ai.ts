export type AIProvider = "gemini" | "openai" | "grok";

export interface AIAnalysisRequest {
  prompt: string;
  contextType?: "PLAYER" | "GROUND" | "MATCH" | "FANTASY" | "GENERAL";
  entityId?: string;
  format?: string;
  provider?: AIProvider;
}

export interface AIAnalysisResponse {
  id: string;
  provider: AIProvider;
  modelName: string;
  prompt: string;
  content: string;
  structuredOutput?: {
    summary: string;
    winProbability?: { teamA: number; teamB: number };
    keyRisks?: string[];
    tacticalRecommendations?: string[];
    fantasyOptimizer?: { name: string; role: string; projectedPoints: number }[];
  };
  timestamp: string;
  cached: boolean;
}

export interface AICacheEntry {
  cacheKey: string;
  request: AIAnalysisRequest;
  response: AIAnalysisResponse;
  expiresAt: string;
}
