"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { usePlayer } from "@/hooks/usePlayer";
import PlayerHeader from "@/components/player/PlayerHeader";
import StatCard from "@/components/common/StatCard";
import Tabs from "@/components/common/Tabs";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ErrorState from "@/components/common/ErrorState";
import RadarChart from "@/components/charts/RadarChart";
import BowlerMatchupTable from "@/components/player/BowlerMatchupTable";
import { FormatType } from "@/types/player";

function PlayerIntelligenceContent() {
  const searchParams = useSearchParams();
  const playerId = searchParams.get("id") || "virat-kohli";
  const { player, loading, error } = usePlayer(playerId);
  const [selectedFormat, setSelectedFormat] = useState<FormatType>("ODI");

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader className="h-48 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SkeletonLoader className="h-24 w-full" />
          <SkeletonLoader className="h-24 w-full" />
          <SkeletonLoader className="h-24 w-full" />
          <SkeletonLoader className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (error || !player) {
    return <ErrorState message={error || "Player profile not found."} />;
  }

  const formatStats = player.stats[selectedFormat]?.batting || player.stats.ALL.batting;
  const phaseStats = player.phaseAnalysis?.[selectedFormat] || player.phaseAnalysis?.ALL;

  return (
    <div className="space-y-8">
      {/* Dynamic Player Profile Header */}
      <PlayerHeader player={player} />

      {/* Format Selector Bar */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
        <Tabs
          tabs={[
            { id: "ODI", label: "ODI" },
            { id: "TEST", label: "TEST" },
            { id: "T20I", label: "T20I" },
            { id: "ALL", label: "ALL FORMATS" },
          ]}
          activeTab={selectedFormat}
          onChange={(tab) => setSelectedFormat(tab as FormatType)}
        />
        <span className="text-xs font-mono-data text-outline hidden sm:block">
          DATA LAYER: ISOLATED MOCK (SUPABASE-READY)
        </span>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="MATCHES / INNINGS"
          value={`${formatStats.matches} / ${formatStats.innings}`}
          subtitle="Total career appearances"
          icon="sports_cricket"
          accentColor={player.primaryColor}
        />
        <StatCard
          title="TOTAL RUNS"
          value={formatStats.runs.toLocaleString()}
          subtitle={`Highest: ${formatStats.highestScore}`}
          icon="emoji_events"
          accentColor={player.primaryColor}
        />
        <StatCard
          title="BATTING AVERAGE"
          value={formatStats.average}
          subtitle="Runs per dismissal"
          icon="analytics"
          accentColor={player.primaryColor}
        />
        <StatCard
          title="STRIKE RATE"
          value={formatStats.strikeRate}
          subtitle="Runs per 100 balls"
          icon="speed"
          accentColor={player.primaryColor}
        />
        <StatCard
          title="100s / 50s"
          value={`${formatStats.hundreds} / ${formatStats.fifties}`}
          subtitle="Milestone scores"
          icon="workspace_premium"
          accentColor={player.primaryColor}
        />
        <StatCard
          title="FOURS / SIXES"
          value={`${formatStats.fours} / ${formatStats.sixes}`}
          subtitle="Boundary count"
          icon="bolt"
          accentColor={player.primaryColor}
        />
        <StatCard
          title="BOUNDARY %"
          value={`${formatStats.boundaryPercentage}%`}
          subtitle="Runs from boundaries"
          icon="pie_chart"
          accentColor={player.primaryColor}
        />
        <StatCard
          title="DOT BALL %"
          value={`${formatStats.dotBallPercentage}%`}
          subtitle="Non-scoring balls"
          icon="do_not_disturb_on"
          accentColor={player.primaryColor}
        />
      </div>

      {/* Skills Radar & Phase Analysis Dual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Metrics */}
        <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">radar</span>
              BATTING SKILL PROFILE RADAR
            </h3>
            <span className="text-[10px] font-mono-data text-outline">TELEMETRY SCORE</span>
          </div>

          <RadarChart metrics={player.radarMetrics} primaryColor={player.primaryColor} />

          <div className="mt-4 p-3 rounded-xl bg-surface-container border border-outline-variant/20 text-xs font-mono-data text-on-surface-variant">
            💡 Clutch index score (99/100) reflects unmatched chase acceleration in pressure situations.
          </div>
        </div>

        {/* Phase Analysis (Powerplay / Middle / Death) */}
        <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">timelapse</span>
              INNINGS PHASE BREAKDOWN ({selectedFormat})
            </h3>
            <span className="text-[10px] font-mono-data text-outline">OVER BREAKDOWN</span>
          </div>

          {phaseStats ? (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-on-surface">Powerplay (Overs 1-10)</span>
                  <span className="text-xs font-mono-data text-primary font-bold">SR: {phaseStats.powerplay.strikeRate}</span>
                </div>
                <div className="text-[11px] font-mono-data text-outline">
                  Runs: {phaseStats.powerplay.runs} • Dismissals: {phaseStats.powerplay.dismissals} • Dot Ball %: {phaseStats.powerplay.dotBallPct}%
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-on-surface">Middle Overs (Overs 11-40)</span>
                  <span className="text-xs font-mono-data text-primary font-bold">SR: {phaseStats.middleOvers.strikeRate}</span>
                </div>
                <div className="text-[11px] font-mono-data text-outline">
                  Runs: {phaseStats.middleOvers.runs} • Dismissals: {phaseStats.middleOvers.dismissals} • Dot Ball %: {phaseStats.middleOvers.dotBallPct}%
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-on-surface">Death Overs (Overs 41-50)</span>
                  <span className="text-xs font-mono-data text-primary font-bold">SR: {phaseStats.deathOvers.strikeRate}</span>
                </div>
                <div className="text-[11px] font-mono-data text-outline">
                  Runs: {phaseStats.deathOvers.runs} • Dismissals: {phaseStats.deathOvers.dismissals} • Dot Ball %: {phaseStats.deathOvers.dotBallPct}%
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs font-mono-data text-outline py-8 text-center">
              Phase telemetry available for ODI and T20I formats.
            </div>
          )}
        </div>
      </div>

      {/* Bowler Matchups */}
      {player.matchups && <BowlerMatchupTable matchups={player.matchups} />}
    </div>
  );
}

export default function PlayerIntelligencePage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-96 w-full" />}>
      <PlayerIntelligenceContent />
    </Suspense>
  );
}
