"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: string;
  trendPositive?: boolean;
  accentColor?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendPositive = true,
  accentColor,
}: StatCardProps) {
  return (
    <div className="p-4 lg:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 relative overflow-hidden group hover:border-outline-variant/60 transition-all">
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-80"
          style={{ backgroundColor: accentColor }}
        />
      )}
      <div className="flex items-start justify-between">
        <span className="text-xs font-mono-data text-outline uppercase tracking-wider block">
          {title}
        </span>
        {icon && (
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-xl">
            {icon}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-headline font-black text-on-surface tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-mono-data font-semibold flex items-center ${
              trendPositive ? "text-primary" : "text-error"
            }`}
          >
            {trendPositive ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-[11px] font-mono-data text-on-surface-variant">
          {subtitle}
        </p>
      )}
    </div>
  );
}
