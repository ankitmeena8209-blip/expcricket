"use client";

import React, { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { AIService } from "@/services/aiService";
import { AICacheEntry } from "@/types/ai";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import SkeletonLoader from "@/components/common/SkeletonLoader";

export default function AdminAICachePage() {
  const [cacheEntries, setCacheEntries] = useState<AICacheEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCache();
  }, []);

  const loadCache = async () => {
    setLoading(true);
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("ai_cache_entries").select("*");
        if (data && !error && data.length > 0) {
          const mapped: AICacheEntry[] = data.map((item) => ({
            cacheKey: item.cache_key,
            request: { prompt: item.prompt, provider: item.provider },
            response: item.response,
            expiresAt: item.expires_at,
          }));
          setCacheEntries(mapped);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Supabase AI cache query fallback:", err);
      }
    }
    setCacheEntries(AIService.getCachedEntries());
    setLoading(false);
  };

  const handleClearCache = () => {
    AIService.clearCache();
    setCacheEntries([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-headline font-bold text-on-surface">AI Telemetry Response Cache</h2>
          <p className="text-xs font-mono-data text-outline">Stored Groq Llama 3.3 predictions and prompt response cache.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="tertiary">{cacheEntries.length} CACHED RESPONSES</Badge>
          <Button variant="outline" size="sm" onClick={handleClearCache} icon="delete_sweep">
            Clear Cache
          </Button>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader className="h-48 w-full" />
      ) : cacheEntries.length > 0 ? (
        <div className="space-y-3">
          {cacheEntries.map((entry, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 font-mono-data text-xs space-y-1">
              <div className="flex justify-between items-center text-outline text-[10px]">
                <span>KEY: {entry.cacheKey}</span>
                <span>EXPIRES: {new Date(entry.expiresAt).toLocaleTimeString()}</span>
              </div>
              <p className="text-on-surface font-bold">Prompt: {entry.request.prompt}</p>
              <p className="text-on-surface-variant text-[11px] line-clamp-2">{entry.response.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-surface-container-low border border-outline-variant/30 rounded-2xl font-mono-data text-xs text-outline">
          No cached AI response entries found. Run queries on the AI Analyst page to populate cache.
        </div>
      )}
    </div>
  );
}
