"use client";

import React, { useState } from "react";
import { useAIAnalyst } from "@/hooks/useAIAnalyst";
import { AI_PROMPT_PRESETS } from "@/lib/mockData/aiPrompts";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-tertiary text-2xl">psychology</span>
            <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
              EXP Intelligence AI Analyst
            </h1>
            <Badge variant="tertiary">GROQ LLAMA 3.3 ENGINE</Badge>
          </div>
          <p className="text-xs font-mono-data text-outline">
            Powered exclusively by Groq Llama 3.3 70B with sub-second cricket telemetry inference
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high border border-outline-variant/30 rounded-xl text-xs font-mono-data text-primary">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Groq Llama 3.3 70B Active</span>
        </div>
      </div>

      {/* Preset Strategy Prompts */}
      <div className="space-y-2">
        <span className="text-xs font-mono-data text-outline block">SUGGESTED ANALYTICS PROMPTS</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AI_PROMPT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset.prompt)}
              disabled={loading}
              className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 text-left transition-all group disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono-data text-tertiary font-bold">{preset.category}</span>
                <span className="material-symbols-outlined text-outline group-hover:text-primary text-base transition-colors">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs font-headline font-bold text-on-surface line-clamp-1">{preset.title}</p>
              <p className="text-[11px] font-mono-data text-outline line-clamp-2 mt-0.5">{preset.prompt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Conversation Thread */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-6 min-h-[400px] flex flex-col justify-between">
        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-full bg-tertiary/10 border border-tertiary/30 text-tertiary flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">smart_toy</span>
              </div>
              <h3 className="font-headline font-bold text-lg text-on-surface">
                Groq AI Cricket Intelligence Engine Ready
              </h3>
              <p className="text-xs font-mono-data text-outline max-w-md mx-auto">
                Ask any query regarding player seam matchups, pitch telemetry forecasts, win probability models, or fantasy strategy.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="space-y-4">
                {/* User Prompt Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-xl p-4 rounded-2xl bg-primary-container/20 border border-primary/40 text-xs font-mono-data text-on-surface">
                    <span className="text-[10px] text-primary block font-bold mb-1">ANALYST QUERY</span>
                    {msg.prompt}
                  </div>
                </div>

                {/* AI Response Card */}
                <div className="p-5 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                      <span className="text-xs font-mono-data font-bold text-on-surface">
                        {msg.modelName}
                      </span>
                      {msg.cached && (
                        <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono-data text-outline">
                          CACHED TELEMETRY
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono-data text-outline">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  {/* Main Analysis Body */}
                  <div className="text-xs font-mono-data text-on-surface-variant whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </div>

                  {/* Structured Telemetry Widgets */}
                  {msg.structuredOutput && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-outline-variant/20">
                      {/* Win Probabilities */}
                      {msg.structuredOutput.winProbability && (
                        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/20 space-y-2">
                          <span className="text-[10px] font-mono-data text-outline font-bold uppercase block">
                            PROBABILISTIC WIN MODEL
                          </span>
                          <div className="flex justify-between items-center text-xs font-mono-data font-bold">
                            <span className="text-primary">Team A: {msg.structuredOutput.winProbability.teamA}%</span>
                            <span className="text-secondary">Team B: {msg.structuredOutput.winProbability.teamB}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden flex">
                            <div className="h-full bg-primary" style={{ width: `${msg.structuredOutput.winProbability.teamA}%` }} />
                            <div className="h-full bg-secondary" style={{ width: `${msg.structuredOutput.winProbability.teamB}%` }} />
                          </div>
                        </div>
                      )}

                      {/* Tactical Recommendations */}
                      {msg.structuredOutput.tacticalRecommendations && (
                        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/20 space-y-1">
                          <span className="text-[10px] font-mono-data text-tertiary font-bold uppercase block">
                            TACTICAL RECOMMENDATIONS
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
              <span className="material-symbols-outlined text-tertiary animate-spin">refresh</span>
              <span className="text-xs font-mono-data text-outline">
                Groq Llama 3.3 70B inferring seam vectors & matchup telemetry...
              </span>
            </div>
          )}
        </div>

        {/* Input Form Bar */}
        <form onSubmit={handleSubmit} className="pt-4 border-t border-outline-variant/20 flex gap-3">
          <input
            type="text"
            placeholder="Ask Groq AI (e.g., Analyze Virat Kohli vs Left-Arm Pacers at MCG)..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface placeholder:text-outline focus:outline-none focus:border-tertiary transition-all"
          />
          <Button variant="primary" type="submit" disabled={loading || !inputPrompt.trim()} icon="send">
            Analyze
          </Button>
        </form>
      </div>
    </div>
  );
}
