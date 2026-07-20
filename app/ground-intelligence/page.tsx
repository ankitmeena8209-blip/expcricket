"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGround } from "@/hooks/useGround";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ErrorState from "@/components/common/ErrorState";
import BoundaryDiagram from "@/components/charts/BoundaryDiagram";
import PitchMap from "@/components/charts/PitchMap";
import { GroundService } from "@/services/groundService";

function GroundIntelligenceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const groundId = searchParams.get("id") || "mcg";
  const { ground, loading, error } = useGround(groundId);
  const [selectedFormat, setSelectedFormat] = useState<string>("T20I");
  const [groundsList, setGroundsList] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadList() {
      try {
        const gList = await GroundService.getAllGrounds();
        if (isMounted) {
          setGroundsList(gList.map((g) => ({ id: g.id, name: g.name })));
        }
      } catch (err) {
        console.error("Failed to load ground options:", err);
      }
    }
    loadList();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleGroundSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextId = e.target.value;
    if (nextId) {
      router.push(`/ground-intelligence?id=${nextId}`);
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

  if (error || !ground) {
    return <ErrorState message={error || "Ground intelligence profile not found."} />;
  }

  const venueStats = ground.stats[selectedFormat] || ground.stats.T20I || ground.stats.TEST;

  return (
    <div className="space-y-8">
      {/* Venue Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-outline-variant/30">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-xl">stadium</span>
          <span className="text-xs font-mono-data font-bold text-primary uppercase">
            Select Venue Telemetry Profile:
          </span>
        </div>

        <select
          value={ground.id}
          onChange={handleGroundSelect}
          className="px-4 py-2 text-xs font-mono-data bg-surface-container-high border border-outline-variant/30 rounded-xl text-primary focus:outline-none"
        >
          {groundsList.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* Header Banner */}
      <div className="p-6 lg:p-10 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/10 pb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="material-symbols-outlined text-primary text-2xl">stadium</span>
              <h1 className="font-display-lg font-bold text-2xl lg:text-3xl text-primary">
                {ground.name}
              </h1>
              <span className="px-3 py-1 rounded-full bg-surface-bright border border-outline-variant/30 text-xs font-mono-data font-bold text-primary">
                {ground.pitchType}
              </span>
            </div>
            <p className="text-xs font-mono-data text-outline">
              {ground.city}, {ground.country} • Capacity: {ground.capacity.toLocaleString()} spectators
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-mono-data text-emerald-400 font-bold">
              WEATHER: {ground.weatherForecastPlaceholder.tempC}°C ({ground.weatherForecastPlaceholder.condition})
            </span>
          </div>
        </div>

        {/* Format Selector Bar */}
        <div className="flex items-center gap-2 pt-2">
          {["T20I", "ODI", "TEST"].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono-data transition-all ${
                selectedFormat === fmt
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-high text-on-surface-variant hover:text-primary"
              }`}
            >
              {fmt} STATS
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Total Matches
          </span>
          <div className="text-xl font-mono-data font-bold text-primary">
            {venueStats.totalMatches}
          </div>
          <p className="text-[11px] text-on-surface-variant">In {selectedFormat} format</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Avg 1st Innings
          </span>
          <div className="text-xl font-mono-data font-bold text-emerald-400">
            {venueStats.avgFirstInningsScore}
          </div>
          <p className="text-[11px] text-on-surface-variant">Batting first baseline</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Avg 2nd Innings
          </span>
          <div className="text-xl font-mono-data font-bold text-secondary">
            {venueStats.avgSecondInningsScore}
          </div>
          <p className="text-[11px] text-on-surface-variant">Chasing target baseline</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Chasing Win %
          </span>
          <div className="text-xl font-mono-data font-bold text-amber-300">
            {venueStats.chasingWinPct}%
          </div>
          <p className="text-[11px] text-on-surface-variant">Bat 1st Win: {venueStats.battingFirstWinPct}%</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Pace Wickets %
          </span>
          <div className="text-xl font-mono-data font-bold text-emerald-400">
            {venueStats.paceWicketsPct}%
          </div>
          <p className="text-[11px] text-on-surface-variant">Fast bowler dominance</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Spin Wickets %
          </span>
          <div className="text-xl font-mono-data font-bold text-secondary">
            {venueStats.spinWicketsPct}%
          </div>
          <p className="text-[11px] text-on-surface-variant">Slow bowler dominance</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Highest Total
          </span>
          <div className="text-xl font-mono-data font-bold text-primary">
            {venueStats.highestTotal}
          </div>
          <p className="text-[11px] text-on-surface-variant">Venue team record</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <span className="text-[11px] font-mono-data font-bold text-outline uppercase">
            Lowest Total
          </span>
          <div className="text-xl font-mono-data font-bold text-rose-300">
            {venueStats.lowestTotal}
          </div>
          <p className="text-[11px] text-on-surface-variant">Lowest team score</p>
        </div>
      </div>

      {/* Outfield & Pitch Map Dual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BoundaryDiagram dimensions={ground.boundaryDimensions} groundName={ground.shortName} />
        <PitchMap />
      </div>

      {/* Venue Historical Records */}
      <div className="p-6 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
        <h3 className="font-display-lg font-bold text-base text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">history</span>
          Venue Historical Records ({ground.shortName})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-data text-xs">
          <div className="p-4 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
            <span className="text-outline block">Highest Individual Score</span>
            <span className="text-primary font-bold text-base">{ground.historicalRecords.highestIndividualScore}</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
            <span className="text-outline block">Best Bowling Figures</span>
            <span className="text-primary font-bold text-base">{ground.historicalRecords.bestBowlingFigures}</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
            <span className="text-outline block">Highest Successful Chase</span>
            <span className="text-primary font-bold text-base">{ground.historicalRecords.highestSuccessfulChase}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GroundIntelligencePage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-96 w-full rounded-3xl" />}>
      <GroundIntelligenceContent />
    </Suspense>
  );
}
