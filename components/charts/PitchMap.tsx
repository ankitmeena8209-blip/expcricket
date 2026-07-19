"use client";

import React from "react";

export default function PitchMap() {
  return (
    <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-center">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">grass</span>
          PITCH MAP & LENGTH VECTOR
        </span>
        <span className="text-[10px] font-mono-data text-outline">Pace Telemetry (140+ KM/H)</span>
      </div>

      {/* Pitch SVG Diagram */}
      <div className="relative w-full max-w-[200px] h-64 mx-auto bg-[#1a2c1f] rounded-xl border border-primary/30 p-2 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* Crease lines */}
        <div className="border-b-2 border-white/40 pb-1 text-[9px] font-mono-data text-white/50">Stumps</div>

        {/* Zones */}
        <div className="space-y-1 relative z-10 my-auto text-[10px] font-mono-data">
          <div className="py-2.5 bg-red-500/20 border border-red-500/40 rounded text-red-300 font-bold">
            Yorker / Full (18%)
          </div>
          <div className="py-3.5 bg-primary/30 border border-primary/60 rounded text-primary font-bold shadow-[0_0_10px_rgba(75,226,119,0.3)]">
            Good Length (58%)
          </div>
          <div className="py-2.5 bg-amber-500/20 border border-amber-500/40 rounded text-amber-300 font-bold">
            Short / Back of Length (24%)
          </div>
        </div>

        <div className="border-t-2 border-white/40 pt-1 text-[9px] font-mono-data text-white/50">Popping Crease</div>
      </div>

      <div className="mt-3 flex items-center justify-around text-[10px] font-mono-data text-on-surface-variant">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary" /> Max Wickets: Good Length
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400" /> High SR vs Full
        </span>
      </div>
    </div>
  );
}
