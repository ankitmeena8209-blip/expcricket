"use client";

import React, { useState } from "react";
import { useAIAnalyst } from "@/hooks/useAIAnalyst";
import { AI_PROMPT_PRESETS } from "@/lib/mockData/aiPrompts";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { AIProvider } from "@/types/ai";

export default function AICricketAnalystPage() {
  const { provider, setProvider, messages, loading, askAI } = useAIAnalyst();
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
      {/* Page Header & AI Provider Selector */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-tertiary text-2xl">psychology</span>
            <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
              EXP Intelligence AI Analyst
            </h1>
            <Badge variant="tertiary">MULTI-PROVIDER ENGINE</Badge>
          </div>
          <p className="text-xs font-mono-data text-outline">
            Configurable provider strategy: Gemini, OpenAI, Grok with response caching layer
          </p>
        </div>

        {/* AI Provider Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-surface-container-high border border-outline-variant/30 rounded-xl">
          <span className="text-xs font-mono-data text-outline pl-2 hidden sm:inline">Active Model:</span>
          {(["gemini", "openai", "grok"] as AIProvider[]).map((p) => (
            <button
              key={p}
              onClick={() => setProvider(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-data font-bold uppercase transition-all ${
                provider === p
                  ? "bg-tertiary text-on-tertiary-fixed shadow-sm"
                  : "text-outline hover:text-on-surface"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Col: Preset Prompts Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary text-sm">lightbulb</span>
            PRESET TACTICAL QUERIES
          </h3>
          <div className="space-y-2">
            {AI_PROMPT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset.prompt)}
                disabled={loading}
                className="w-full text-left p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-tertiary/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono-data font-bold text-tertiary uppercase">
                    {preset.category}
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-tertiary text-sm">
                    {preset.icon}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-on-surface group-hover:text-tertiary transition-colors">
                  {preset.title}
                </h4>
              </button>
            ))}
          </div>
        </div>

        {/* Right Col: Chat Container & Conversation */}
        <div className="lg:col-span-3 space-y-4">
          <div className="min-h-[420px] p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between space-y-6">
            {/* Conversation Messages */}
            {messages.length === 0 ? (
              <div className="my-auto py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-tertiary/10 border border-tertiary/30 flex items-center justify-center text-tertiary mx-auto">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface">
                  Ready to analyze match telemetry.
                </h3>
                <p className="text-xs font-mono-data text-outline max-w-md mx-auto">
                  Select a preset query from the left sidebar or type your custom prompt below to run predictive models.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-4">
                    {/* User Prompt Bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-xl p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-xs font-mono-data text-on-surface">
                        <span className="text-[10px] text-outline block mb-1">YOUR QUERY</span>
                        {msg.prompt}
                      </div>
                    </div>

                    {/* AI Response Card */}
                    <div className="p-6 rounded-2xl bg-surface-container-low border border-tertiary/40 space-y-4">
                      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-tertiary text-xl">psychology</span>
                          <span className="font-headline font-bold text-sm text-on-surface">
                            {msg.modelName}
                          </span>
                        </div>
                        <Badge variant={msg.cached ? "outline" : "tertiary"}>
                          {msg.cached ? "AI CACHE HIT" : "REALTIME GENERATED"}
                        </Badge>
                      </div>

                      {/* Main Text Content */}
                      <p className="text-xs font-mono-data text-on-surface whitespace-pre-line leading-relaxed">
                        {msg.content}
                      </p>

                      {/* Structured Output Grid */}
                      {msg.structuredOutput && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-outline-variant/20">
                          {/* Key Risks */}
                          {msg.structuredOutput.keyRisks && (
                            <div className="p-3 rounded-xl bg-surface-container-high border border-outline-variant/20">
                              <span className="text-[10px] font-mono-data font-bold text-error uppercase block mb-1">
                                ⚠️ RISK ANALYSIS
                              </span>
                              <ul className="text-[11px] font-mono-data text-on-surface-variant space-y-1 list-disc list-inside">
                                {msg.structuredOutput.keyRisks.map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tactical Recommendations */}
                          {msg.structuredOutput.tacticalRecommendations && (
                            <div className="p-3 rounded-xl bg-surface-container-high border border-outline-variant/20">
                              <span className="text-[10px] font-mono-data font-bold text-primary uppercase block mb-1">
                                🎯 TACTICAL RECOMMENDATIONS
                              </span>
                              <ul className="text-[11px] font-mono-data text-on-surface-variant space-y-1 list-disc list-inside">
                                {msg.structuredOutput.tacticalRecommendations.map((t, i) => (
                                  <li key={i}>{t}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="pt-4 border-t border-outline-variant/20 flex gap-3">
              <input
                type="text"
                placeholder="Ask AI Analyst (e.g. 'How to restrict Kohli in Powerplay?')..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-surface-container-low border border-outline-variant/40 rounded-2xl text-xs lg:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all"
              />
              <Button variant="primary" type="submit" disabled={loading} icon={loading ? "hourglass_empty" : "send"}>
                {loading ? "Analyzing..." : "Ask AI"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
