"use client";

import React from "react";

interface RadarMetrics {
  consistency: number;
  powerHitting: number;
  spinAdaptability: number;
  paceAdaptability: number;
  pressureHandling: number;
  clutchIndex: number;
}

interface RadarChartProps {
  metrics: RadarMetrics;
  primaryColor?: string;
}

export default function RadarChart({ metrics, primaryColor = "#4be277" }: RadarChartProps) {
  const keys: (keyof RadarMetrics)[] = [
    "consistency",
    "powerHitting",
    "spinAdaptability",
    "paceAdaptability",
    "pressureHandling",
    "clutchIndex",
  ];

  const labels = [
    "Consistency",
    "Power Hitting",
    "vs Spin",
    "vs Pace",
    "Pressure",
    "Clutch",
  ];

  const center = 120;
  const radius = 80;
  const total = keys.length;

  // Calculate polygon points
  const points = keys.map((key, i) => {
    const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
    const value = (metrics[key] || 50) / 100;
    const r = radius * value;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  // Grid concentric circles/polygons
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="relative w-full max-w-[280px] mx-auto aspect-square flex items-center justify-center">
      <svg viewBox="0 0 240 240" className="w-full h-full">
        {/* Background Grids */}
        {gridLevels.map((lvl, idx) => {
          const gridPoints = keys.map((_, i) => {
            const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
            const r = radius * lvl;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(" ");

          return (
            <polygon
              key={idx}
              points={gridPoints}
              fill="none"
              stroke="#3d4a3d"
              strokeWidth="1"
              strokeDasharray={idx < 3 ? "2,2" : "none"}
            />
          );
        })}

        {/* Axes */}
        {keys.map((_, i) => {
          const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="#3d4a3d"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Data Polygon */}
        <polygon
          points={points}
          fill={primaryColor}
          fillOpacity="0.25"
          stroke={primaryColor}
          strokeWidth="2.5"
        />

        {/* Data Vertices */}
        {keys.map((key, i) => {
          const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
          const value = (metrics[key] || 50) / 100;
          const r = radius * value;
          const cx = center + r * Math.cos(angle);
          const cy = center + r * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="4"
              fill={primaryColor}
              className="hover:scale-125 transition-transform"
            />
          );
        })}

        {/* Outer Labels */}
        {labels.map((lbl, i) => {
          const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
          const labelRadius = radius + 22;
          const lx = center + labelRadius * Math.cos(angle);
          const ly = center + labelRadius * Math.sin(angle);
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#bccbb9"
              fontSize="9 font-mono-data"
              fontWeight="600"
            >
              {lbl}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
