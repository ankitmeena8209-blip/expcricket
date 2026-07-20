"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePlayer } from "@/hooks/usePlayer";
import PlayerHeader from "@/components/player/PlayerHeader";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ErrorState from "@/components/common/ErrorState";
import RadarChart from "@/components/charts/RadarChart";
import BowlerMatchupTable from "@/components/player/BowlerMatchupTable";
import { FormatType } from "@/types/player";
import { PlayerService } from "@/services/playerService";

function PlayerIntelligenceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const playerId = searchParams.get("id") || "virat-kohli";
  const { player, loading, error } = usePlayer(playerId);
  const [selectedFormat, setSelectedFormat] = useState<FormatType>("ODI");
  const [allPlayersList, setAllPlayersList] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadList() {
      try {
        const plist = await PlayerService.getAllPlayers();
        if (isMounted) {
          setAllPlayersList(plist.map((p) => ({ id: p.id, name: p.name })));
        }
      } catch (err) {
        console.error("Error loading player selector options:", err);
      }
    }
    loadList();
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePlayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextId = e.target.value;
    if (nextId) {
      router.push(`/player-intelligence?id=${nextId}`);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader className="h-48 w-full rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SkeletonLoader className="h-28 w-full rounded-2xl" />
          <SkeletonLoader className="h-28 w-full rounded-2xl" />
          <SkeletonLoader className="h-28 w-full rounded-2xl" />
          <SkeletonLoader className="h-28 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !player) {
    return <ErrorState message={error || "Player profile not found in database."} />;
  }

  const formatStats = player.stats[selectedFormat]?.batting || player.stats.ALL?.batting || {
    matches: 0,
    innings: 0,
    runs: 0,
    highestScore: "0",
    average: 0,
    strikeRate: 0,
    hundreds: 0,
    fifties: 0,
    fours: 0,
    sixes: 0,
    boundaryPercentage: 0,
    dotBallPercentage: 0,
  };

  const phaseStats = player.phaseAnalysis?.[selectedFormat] || player.phaseAnalysis?.ALL;

  return (
    <div className="space-y-8">
      {/* Player Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-outline-variant/30">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-xl">person_search</span>
          <span className="text-xs font-mono-data font-bold text-primary uppercase">
            Select Player Intelligence Profile:
          </span>
        </div>

        <select
          value={player.id}
          onChange={handlePlayerSelect}
          className="px-4 py-2 text-xs font-mono-data bg-surface-container-high border border-outline-variant/30 rounded-xl text-primary focus:outline-none focus:border-primary/60"
        >
          {allPlayersList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Player Header */}
      <PlayerHeader player={player} />

      {/* Format Selector Tabs */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
        <div className="flex items-center gap-2">
          {(["ODI", "TEST", "T20I", "ALL"] as FormatType[]).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono-data transition-all ${
                selectedFormat === fmt
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-high text-on-surface-variant hover:text-primary"
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono-data text-outline hidden sm:block">
          SUPABASE DB TELEMETRY Sourced
        </span>
      </div>

      {/* Core Telemetry Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Matches / Innings
          </span>
          <div className="text-xl font-mono-data font-bold text-primary">
            {formatStats.matches} / {formatStats.innings}
          </div>
          <p className="text-[11px] text-on-surface-variant">Total appearances</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Career Runs
          </span>
          <div className="text-xl font-mono-data font-bold text-primary">
            {formatStats.runs.toLocaleString()}
          </div>
          <p className="text-[11px] text-on-surface-variant">Highest: {formatStats.highestScore}</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Batting Average
          </span>
          <div className="text-xl font-mono-data font-bold text-emerald-400">
            {formatStats.average}
          </div>
          <p className="text-[11px] text-on-surface-variant">Runs per dismissal</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Strike Rate
          </span>
          <div className="text-xl font-mono-data font-bold text-secondary">
            {formatStats.strikeRate}
          </div>
          <p className="text-[11px] text-on-surface-variant">Runs per 100 balls</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            100s / 50s
          </span>
          <div className="text-xl font-mono-data font-bold text-primary">
            {formatStats.hundreds} / {formatStats.fifties}
          </div>
          <p className="text-[11px] text-on-surface-variant">Milestone centuries</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Fours / Sixes
          </span>
          <div className="text-xl font-mono-data font-bold text-primary">
            {formatStats.fours} / {formatStats.sixes}
          </div>
          <p className="text-[11px] text-on-surface-variant">Boundary count</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Boundary %
          </span>
          <div className="text-xl font-mono-data font-bold text-emerald-400">
            {formatStats.boundaryPercentage}%
          </div>
          <p className="text-[11px] text-on-surface-variant">Runs via boundaries</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Dot Ball %
          </span>
          <div className="text-xl font-mono-data font-bold text-amber-300">
            {formatStats.dotBallPercentage}%
          </div>
          <p className="text-[11px] text-on-surface-variant">Non-scoring balls</p>
        </div>
      </div>

      {/* Radar Skill & Innings Phase Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Profile */}
        <div className="p-6 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display-lg font-bold text-base text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">radar</span>
              Skill Vector Radar
            </h3>
            <span className="text-[10px] font-mono-data text-outline">TELEMETRY SCORE</span>
          </div>

          <RadarChart metrics={player.radarMetrics} primaryColor={player.primaryColor} />

          <div className="p-3.5 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-mono-data text-on-surface-variant">
            Telemetry data vectors verified for {player.name}.
          </div>
        </div>

        {/* Phase Analysis */}
        <div className="p-6 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display-lg font-bold text-base text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">timelapse</span>
              Innings Phase Breakdown ({selectedFormat})
            </h3>
            <span className="text-[10px] font-mono-data text-outline font-bold">OVER VECTORS</span>
          </div>

          {phaseStats ? (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-primary">Powerplay (Overs 1-10)</span>
                  <span className="text-xs font-mono-data text-emerald-400 font-bold">
                    SR: {phaseStats.powerplay?.strikeRate ?? 88}
                  </span>
                </div>
                <div className="text-[11px] font-mono-data text-outline">
                  Runs: {phaseStats.powerplay?.runs ?? 0} • Dismissals: {phaseStats.powerplay?.dismissals ?? 0} • Dot %: {phaseStats.powerplay?.dotBallPct ?? 0}%
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-primary">Middle Overs (Overs 11-40)</span>
                  <span className="text-xs font-mono-data text-emerald-400 font-bold">
                    SR: {phaseStats.middleOvers?.strikeRate ?? 92}
                  </span>
                </div>
                <div className="text-[11px] font-mono-data text-outline">
                  Runs: {phaseStats.middleOvers?.runs ?? 0} • Dismissals: {phaseStats.middleOvers?.dismissals ?? 0} • Dot %: {phaseStats.middleOvers?.dotBallPct ?? 0}%
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-primary">Death Overs (Overs 41-50)</span>
                  <span className="text-xs font-mono-data text-emerald-400 font-bold">
                    SR: {phaseStats.deathOvers?.strikeRate ?? 165}
                  </span>
                </div>
                <div className="text-[11px] font-mono-data text-outline">
                  Runs: {phaseStats.deathOvers?.runs ?? 0} • Dismissals: {phaseStats.deathOvers?.dismissals ?? 0} • Dot %: {phaseStats.deathOvers?.dotBallPct ?? 0}%
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono-data text-outline py-8 text-center">
              Phase telemetry available for ODI and T20I formats.
            </p>
          )}
        </div>
      </div>

      {/* Bowler Matchups Table */}
      {player.matchups && <BowlerMatchupTable matchups={player.matchups} />}
    </div>
  );
}

export default function PlayerIntelligencePage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-96 w-full rounded-3xl" />}>
      <PlayerIntelligenceContent />
    </Suspense>
  );
}
