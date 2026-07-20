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
      console.log("[useAIAnalyst Client] Sending AI prompt to /api/ai endpoint:", prompt);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, contextType, provider }),
      });

      const data = await res.json();
      console.log("[useAIAnalyst Client] Received response from /api/ai:", data);

      if (data.success && data.data) {
        setMessages((prev) => [...prev, data.data]);
      } else {
        console.error("AI API returned error:", data.error);
      }
    } catch (err) {
      console.error("AI Service Network Error:", err);
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
