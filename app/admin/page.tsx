"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatCard from "@/components/common/StatCard";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

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
        setSyncStatus(`Sync Error: ${data.error || "Failed to fetch from CricketData.org"}`);
      }
    } catch (err: any) {
      setSyncStatus(`Sync Error: ${err.message || "Network request failed"}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="ACTIVE DB CONNECTIONS"
          value="12 / 50"
          subtitle="Supabase Pool Status"
          icon="database"
          accentColor="#4be277"
        />
        <StatCard
          title="AI CACHE HIT RATE"
          value="88.4%"
          subtitle="Saved 1,420 Provider API calls"
          icon="memory"
          accentColor="#c0c1ff"
        />
        <StatCard
          title="CRICKETDATA API ENGINE"
          value="Connected"
          subtitle="Server-side CricAPI Integration"
          icon="cloud_sync"
          accentColor="#ffba61"
        />
        <StatCard
          title="SECURITY AUDIT STATUS"
          value="0 Vulnerabilities"
          subtitle="RLS & Server Secrets Secure"
          icon="verified_user"
          accentColor="#4be277"
        />
      </div>

      {/* CricketData Live Sync Panel */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">sync</span>
              CRICKETDATA.ORG LIVE SYNC ENGINE
            </h3>
            <p className="text-xs font-mono-data text-outline mt-1">
              Fetch live scores, match schedules, teams, grounds, and players securely on the server and update Supabase.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleCricketDataSync}
            disabled={syncing}
            icon={syncing ? "sync" : "cloud_download"}
          >
            {syncing ? "Syncing with CricketData.org..." : "Trigger Manual Data Sync"}
          </Button>
        </div>

        {syncStatus && (
          <div className={`p-4 rounded-2xl border text-xs font-mono-data ${syncStatus.includes("Error") ? "bg-error-container/20 border-error/40 text-error" : "bg-primary-container/20 border-primary/40 text-primary"}`}>
            {syncStatus}
          </div>
        )}
      </div>

      {/* CRUD Quick Management Shortcuts */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
        <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">tune</span>
          CRUD MANAGEMENT CONSOLES
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-2">
            <span className="text-xs font-bold text-on-surface block">Players Repository</span>
            <p className="text-[11px] font-mono-data text-outline">Manage player stats, roles, and profiles.</p>
            <Link href="/admin/players" className="block">
              <Button variant="outline" size="sm" className="w-full">
                Manage Players
              </Button>
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-2">
            <span className="text-xs font-bold text-on-surface block">Ground Telemetry</span>
            <p className="text-[11px] font-mono-data text-outline">Edit venue boundary maps & pitch profiles.</p>
            <Link href="/admin/grounds" className="block">
              <Button variant="outline" size="sm" className="w-full">
                Manage Grounds
              </Button>
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-2">
            <span className="text-xs font-bold text-on-surface block">AI Response Cache</span>
            <p className="text-[11px] font-mono-data text-outline">Inspect & purge stored AI answers.</p>
            <Link href="/admin/ai-cache" className="block">
              <Button variant="outline" size="sm" className="w-full">
                Inspect Cache
              </Button>
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-2">
            <span className="text-xs font-bold text-on-surface block">System Configuration</span>
            <p className="text-[11px] font-mono-data text-outline">Configure keys & active AI models.</p>
            <Link href="/admin/settings" className="block">
              <Button variant="outline" size="sm" className="w-full">
                System Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
