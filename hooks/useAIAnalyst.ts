"use client";

import { useState } from "react";
import { AIAnalysisResponse, AIProvider } from "@/types/ai";
import { AIService } from "@/services/aiService";

export function useAIAnalyst() {
  const [provider, setProvider] = useState<AIProvider>(AIService.getActiveProvider());
  const [messages, setMessages] = useState<AIAnalysisResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const askAI = async (prompt: string, contextType?: "PLAYER" | "GROUND" | "MATCH" | "FANTASY" | "GENERAL") => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await AIService.analyzeQuery({ prompt, contextType, provider });
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error("AI Service Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    provider,
    setProvider,
    messages,
    loading,
    askAI,
  };
}
