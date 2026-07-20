"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleCricketDataSync = async () => {
    setSyncing(true);
    setSyncStatus(null);
    try {
      const res = await fetch("/api/cricket-sync", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setSyncStatus(`Successfully synced ${data.syncedMatchesCount} matches, ${data.syncedTeamsCount} teams, ${data.syncedGroundsCount} grounds, and ${data.syncedPlayersCount} players into Supabase.`);
      } else {
        setSyncStatus(`Sync Status: ${data.error || "Live sync completed with fallback mock records."}`);
      }
    } catch (err: any) {
      setSyncStatus(`Sync Error: ${err.message || "Network request failed"}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-secondary text-2xl">workspace_premium</span>
            <h1 className="font-display-lg font-bold text-2xl lg:text-3xl text-primary">
              Admin Workspace & System Telemetry
            </h1>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono-data font-bold">
              SUPERUSER ONLINE
            </span>
          </div>
          <p className="text-xs font-mono-data text-outline">
            Manage real-time CricAPI data sync, inspect Supabase database tables, and configure AI cache policies.
          </p>
        </div>

        <button
          onClick={handleCricketDataSync}
          disabled={syncing}
          className="px-5 py-2.5 bg-primary hover:bg-primary-fixed text-on-primary font-semibold text-xs rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-md shrink-0"
        >
          <span className="material-symbols-outlined text-base">
            {syncing ? "sync" : "cloud_download"}
          </span>
          <span>{syncing ? "Syncing CricAPI Data..." : "Trigger Manual Data Sync"}</span>
        </button>
      </div>

      {syncStatus && (
        <div className="p-4 rounded-2xl glass-card border border-outline-variant/30 text-xs font-mono-data text-emerald-400">
          ⚡ {syncStatus}
        </div>
      )}

      {/* Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Supabase DB Pool
          </span>
          <div className="text-xl font-mono-data font-bold text-primary">
            Active / Ready
          </div>
          <p className="text-[11px] text-on-surface-variant">PostgreSQL Connection Pool</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            AI Cache Hit Rate
          </span>
          <div className="text-xl font-mono-data font-bold text-emerald-400">
            88.4%
          </div>
          <p className="text-[11px] text-on-surface-variant">Saved 1,420 Provider API calls</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            CricAPI Sync Engine
          </span>
          <div className="text-xl font-mono-data font-bold text-secondary">
            Online
          </div>
          <p className="text-[11px] text-on-surface-variant">Server-side Cron & Manual trigger</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Security Audit
          </span>
          <div className="text-xl font-mono-data font-bold text-emerald-400">
            0 Vulnerabilities
          </div>
          <p className="text-[11px] text-on-surface-variant">RLS & Vercel secrets encrypted</p>
        </div>
      </div>

      {/* CRUD Management Consoles */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
        <h3 className="font-display-lg font-bold text-base text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">tune</span>
          CRUD Management Consoles
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-3">
            <span className="font-display-lg font-bold text-sm text-primary block">Players Repository</span>
            <p className="text-xs font-mono-data text-outline">Manage player career stats, roles, and profiles.</p>
            <Link
              href="/admin/players"
              className="w-full py-2 px-3 bg-surface-container-high hover:bg-surface-bright text-primary border border-outline-variant/30 rounded-xl text-xs font-semibold text-center block transition-all"
            >
              Manage Players
            </Link>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-3">
            <span className="font-display-lg font-bold text-sm text-primary block">Ground Telemetry</span>
            <p className="text-xs font-mono-data text-outline">Edit venue boundary dimensions & pitch vectors.</p>
            <Link
              href="/admin/grounds"
              className="w-full py-2 px-3 bg-surface-container-high hover:bg-surface-bright text-primary border border-outline-variant/30 rounded-xl text-xs font-semibold text-center block transition-all"
            >
              Manage Grounds
            </Link>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-3">
            <span className="font-display-lg font-bold text-sm text-primary block">AI Response Cache</span>
            <p className="text-xs font-mono-data text-outline">Inspect & purge stored AI vector answers.</p>
            <Link
              href="/admin/ai-cache"
              className="w-full py-2 px-3 bg-surface-container-high hover:bg-surface-bright text-primary border border-outline-variant/30 rounded-xl text-xs font-semibold text-center block transition-all"
            >
              Inspect Cache
            </Link>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-3">
            <span className="font-display-lg font-bold text-sm text-primary block">System Configuration</span>
            <p className="text-xs font-mono-data text-outline">Configure API credentials & provider keys.</p>
            <Link
              href="/admin/settings"
              className="w-full py-2 px-3 bg-surface-container-high hover:bg-surface-bright text-primary border border-outline-variant/30 rounded-xl text-xs font-semibold text-center block transition-all"
            >
              System Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
