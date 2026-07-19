"use client";

import React from "react";

export default function FAQPage() {
  const faqs = [
    { q: "What is EXP Cricket?", a: "EXP Cricket (Xpert Cricket) is a high-performance cricket analytics platform designed for match predictive models and deep player telemetry." },
    { q: "Which AI models are supported?", a: "The platform features a multi-provider strategy supporting Google Gemini 1.5 Pro, OpenAI GPT-4o, and xAI Grok 2." },
    { q: "How is venue boundary data calculated?", a: "Outfield boundaries are rendered via precise SVG vector measurements across 8 directional axes." },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="font-headline font-black text-3xl text-on-surface">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-2">
            <h3 className="font-headline font-bold text-base text-primary">{f.q}</h3>
            <p className="text-xs font-mono-data text-on-surface-variant leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
