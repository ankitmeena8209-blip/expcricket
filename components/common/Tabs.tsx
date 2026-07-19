"use client";

import React from "react";

interface TabOption {
  id: string;
  label: string;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-surface-container-low border border-outline-variant/30 rounded-xl w-fit">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-data font-semibold transition-all flex items-center gap-1.5 ${
              isActive
                ? "bg-surface-container-high text-primary shadow-sm border border-primary/30"
                : "text-outline hover:text-on-surface"
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary text-[10px]">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
