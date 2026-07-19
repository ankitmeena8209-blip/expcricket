import React from "react";
import Badge from "@/components/common/Badge";

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
        <Badge variant="primary">ABOUT EXP CRICKET</Badge>
        <h1 className="font-headline font-black text-3xl text-on-surface">
          EXP Cricket (Xpert Cricket) Analytics Platform
        </h1>
        <p className="text-sm font-mono-data text-on-surface-variant leading-relaxed">
          EXP Cricket is an institutional-grade sports analytics platform providing high-performance cricket telemetry, venue seam & pitch forecasting models, bowler matchup vectors, and AI-driven match strategy simulations.
        </p>
      </div>
    </div>
  );
}
