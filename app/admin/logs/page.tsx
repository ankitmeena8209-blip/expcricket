"use client";

import React from "react";
import Badge from "@/components/common/Badge";

export default function AdminLogsPage() {
  const logs = [
    { id: "log-1", time: "2026-07-20 01:05:12", level: "INFO", module: "AIService", msg: "Cache hit for query 'Kohli vs Zampa'" },
    { id: "log-2", time: "2026-07-20 00:58:44", level: "SECURITY", module: "AuthMiddleware", msg: "Admin session authenticated successfully" },
    { id: "log-3", time: "2026-07-19 23:45:00", level: "WARN", module: "PitchMapTelemetry", msg: "Weather placeholder fallback activated" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-headline font-bold text-on-surface">System & Security Audit Logs</h2>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
        <div className="space-y-2">
          {logs.map((l) => (
            <div key={l.id} className="p-3 rounded-xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-between text-xs font-mono-data">
              <div className="flex items-center gap-3">
                <span className="text-outline text-[11px]">{l.time}</span>
                <Badge variant={l.level === "SECURITY" ? "primary" : l.level === "WARN" ? "tertiary" : "outline"}>
                  {l.level}
                </Badge>
                <span className="text-outline font-bold">[{l.module}]</span>
                <span className="text-on-surface">{l.msg}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
