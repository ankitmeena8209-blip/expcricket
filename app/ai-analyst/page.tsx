"use client";

import React, { useState } from "react";
import { useAIAnalyst } from "@/hooks/useAIAnalyst";
import { AI_PROMPT_PRESETS } from "@/lib/mockData/aiPrompts";

export default function AICricketAnalystPage() {
  const { messages, loading, askAI } = useAIAnalyst();
  const [inputPrompt, setInputPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPrompt.trim() && !loading) {
      askAI(inputPrompt.trim());
      setInputPrompt("");
    }
  };

  const handlePresetClick = (prompt: string) => {
    if (!loading) {
      askAI(prompt);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/10 pb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="material-symbols-outlined text-amber-400 text-2xl">auto_awesome</span>
              <h1 className="font-display-lg font-bold text-2xl lg:text-3xl text-primary">
                Fantasy Edge & AI Predictive Analyst
              </h1>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono-data font-bold">
                PRO ENGINE
              </span>
            </div>
            <p className="text-xs font-mono-data text-outline">
              Connected multi-model strategy (Gemini 1.5 Pro, Llama 3.3 70B, GPT-4o) with sub-second cricket telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-mono-data text-emerald-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI API Route Online</span>
            </span>
          </div>
        </div>

        {/* Preset Prompt Buttons */}
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase tracking-wider block">
            Suggested Strategy Prompts:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {AI_PROMPT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset.prompt)}
                disabled={loading}
                className="p-3.5 rounded-2xl glass-card border border-outline-variant/20 hover:border-primary/40 text-left transition-all group disabled:opacity-50"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono-data text-amber-300 font-bold uppercase">{preset.category}</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary text-base transition-colors">
                    arrow_forward
                  </span>
                </div>
                <p className="text-xs font-display-lg font-bold text-primary line-clamp-1">{preset.title}</p>
                <p className="text-[11px] font-mono-data text-outline line-clamp-2 mt-1">{preset.prompt}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Conversation Console */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 space-y-6 min-h-[420px] flex flex-col justify-between shadow-modal-shadow">
        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-surface-bright border border-outline-variant/30 text-amber-400 flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="font-display-lg font-bold text-xl text-primary">
                AI Telemetry Assistant Active
              </h3>
              <p className="text-xs font-mono-data text-outline max-w-md mx-auto">
                Ask any query regarding player seam matchups, pitch degradation forecasts, win probability vectors, or fantasy captain choices.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="space-y-4">
                {/* User Query Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-xl p-4 rounded-2xl bg-surface-bright border border-outline-variant/30 text-xs font-mono-data text-primary">
                    <span className="text-[10px] text-amber-300 block font-bold mb-1 uppercase tracking-wider">ANALYST QUERY</span>
                    {msg.prompt}
                  </div>
                </div>

                {/* AI Response Card */}
                <div className="p-6 rounded-2xl glass-card border border-outline-variant/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-mono-data font-bold text-primary">
                        {msg.modelName}
                      </span>
                      {msg.cached && (
                        <span className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] font-mono-data text-outline">
                          TELEMETRY CACHED
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono-data text-outline">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  {/* Body Text */}
                  <div className="text-xs font-mono-data text-on-surface whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </div>

                  {/* Structured Output Widgets */}
                  {msg.structuredOutput && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-outline-variant/10">
                      {msg.structuredOutput.winProbability && (
                        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
                          <span className="text-[10px] font-mono-data text-outline font-bold uppercase block">
                            Win Probability Forecast
                          </span>
                          <div className="flex justify-between items-center text-xs font-mono-data font-bold">
                            <span className="text-emerald-400">Team A: {msg.structuredOutput.winProbability.teamA}%</span>
                            <span className="text-secondary">Team B: {msg.structuredOutput.winProbability.teamB}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden flex">
                            <div className="h-full bg-emerald-400" style={{ width: `${msg.structuredOutput.winProbability.teamA}%` }} />
                            <div className="h-full bg-secondary" style={{ width: `${msg.structuredOutput.winProbability.teamB}%` }} />
                          </div>
                        </div>
                      )}

                      {msg.structuredOutput.tacticalRecommendations && (
                        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1.5">
                          <span className="text-[10px] font-mono-data text-amber-300 font-bold uppercase block">
                            Key Recommendations
                          </span>
                          <ul className="text-[11px] font-mono-data text-on-surface-variant space-y-1 list-disc list-inside">
                            {msg.structuredOutput.tacticalRecommendations.map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center gap-3 animate-pulse">
              <span className="material-symbols-outlined text-amber-400 animate-spin">refresh</span>
              <span className="text-xs font-mono-data text-outline">
                AI Telemetry Model executing vector calculations...
              </span>
            </div>
          )}
        </div>

        {/* Input Form Bar */}
        <form onSubmit={handleSubmit} className="pt-4 border-t border-outline-variant/10 flex gap-3">
          <input
            type="text"
            placeholder="Ask AI Analyst (e.g., Tactical bowler matchup for Virat Kohli at MCG)..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-surface-container-high border border-outline-variant/30 rounded-xl text-xs font-mono-data text-primary placeholder:text-outline focus:outline-none focus:border-primary/60 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !inputPrompt.trim()}
            className="px-6 py-3 bg-primary hover:bg-primary-fixed text-on-primary font-semibold text-xs rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-md"
          >
            <span>Analyze</span>
            <span className="material-symbols-outlined text-base">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
