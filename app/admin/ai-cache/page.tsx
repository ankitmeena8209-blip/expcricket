"use client";

import React, { useState } from "react";
import { AIService } from "@/services/aiService";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

export default function AdminAICachePage() {
  const [cachedEntries, setCachedEntries] = useState(AIService.getCachedEntries());

  const handleClearCache = () => {
    AIService.clearCache();
    setCachedEntries([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-headline font-bold text-on-surface">AI Response Cache Dashboard</h2>
        <Button variant="danger" size="sm" icon="delete" onClick={handleClearCache}>
          Purge Cache
        </Button>
      </div>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
        {cachedEntries.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono-data text-outline">
            No cached AI query responses currently stored.
          </div>
        ) : (
          <div className="space-y-3">
            {cachedEntries.map((entry, i) => (
              <div key={i} className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-xs font-mono-data">
                <div className="flex justify-between items-center mb-1">
                  <Badge variant="tertiary">{entry.response.provider.toUpperCase()}</Badge>
                  <span className="text-[10px] text-outline">{entry.response.timestamp}</span>
                </div>
                <div className="font-bold text-on-surface mb-1">Prompt: "{entry.request.prompt}"</div>
                <div className="text-on-surface-variant truncate">{entry.response.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
