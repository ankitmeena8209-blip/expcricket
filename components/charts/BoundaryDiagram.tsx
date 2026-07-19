import React from "react";
import { BoundaryDimensions } from "@/types/ground";

interface BoundaryDiagramProps {
  dimensions: BoundaryDimensions;
  groundName: string;
}

export default function BoundaryDiagram({ dimensions, groundName }: BoundaryDiagramProps) {
  return (
    <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">architecture</span>
          BOUNDARY DIMENSIONS ({groundName})
        </span>
        <span className="text-[10px] font-mono-data text-outline">OUTFIELD TELEMETRY</span>
      </div>

      <div className="relative w-full max-w-[260px] aspect-square mx-auto flex items-center justify-center">
        {/* Oval Ground SVG */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Outfield Grass */}
          <ellipse cx="100" cy="100" rx="90" ry="85" fill="#14281a" stroke="#22c55e" strokeWidth="2" />
          <ellipse cx="100" cy="100" rx="88" ry="83" fill="none" stroke="#4be277" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

          {/* Center Pitch Rect */}
          <rect x="94" y="85" width="12" height="30" fill="#2d3f2e" stroke="#869585" strokeWidth="1" />

          {/* Dimension Metric Labels */}
          {/* Straight */}
          <text x="100" y="25" textAnchor="middle" fill="#6bff8f" fontSize="10 font-mono-data" fontWeight="bold">
            {dimensions.straight}m (Straight)
          </text>
          {/* Square Leg */}
          <text x="22" y="104" textAnchor="start" fill="#6bff8f" fontSize="10 font-mono-data" fontWeight="bold">
            {dimensions.squareLeg}m
          </text>
          {/* Cover */}
          <text x="178" y="104" textAnchor="end" fill="#6bff8f" fontSize="10 font-mono-data" fontWeight="bold">
            {dimensions.cover}m
          </text>
          {/* Fine Leg */}
          <text x="100" y="182" textAnchor="middle" fill="#6bff8f" fontSize="10 font-mono-data" fontWeight="bold">
            {dimensions.fineLeg}m (Fine Leg)
          </text>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[10px] font-mono-data">
        <div className="p-2 rounded-lg bg-surface-container-high border border-outline-variant/30">
          <span className="text-outline block">Long On / Off</span>
          <span className="text-on-surface font-bold text-xs">{dimensions.longOn}m / {dimensions.longOff}m</span>
        </div>
        <div className="p-2 rounded-lg bg-surface-container-high border border-outline-variant/30">
          <span className="text-outline block">Third Man</span>
          <span className="text-on-surface font-bold text-xs">{dimensions.thirdMan}m</span>
        </div>
      </div>
    </div>
  );
}
