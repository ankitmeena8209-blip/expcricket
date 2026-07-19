"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGround } from "@/hooks/useGround";
import StatCard from "@/components/common/StatCard";
import Tabs from "@/components/common/Tabs";
import Badge from "@/components/common/Badge";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ErrorState from "@/components/common/ErrorState";
import BoundaryDiagram from "@/components/charts/BoundaryDiagram";
import PitchMap from "@/components/charts/PitchMap";

export default function GroundIntelligencePage() {
  const searchParams = useSearchParams();
  const groundId = searchParams.get("id") || "mcg";
  const { ground, loading, error } = useGround(groundId);
  const [selectedFormat, setSelectedFormat] = useState<string>("T20I");

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader className="h-40 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SkeletonLoader className="h-24 w-full" />
          <SkeletonLoader className="h-24 w-full" />
          <SkeletonLoader className="h-24 w-full" />
          <SkeletonLoader className="h-24 w-full" />
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
      {/* Ground Profile Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-2xl">stadium</span>
              <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
                {ground.name}
              </h1>
              <Badge variant="primary">{ground.pitchType}</Badge>
            </div>
            <p className="text-xs font-mono-data text-outline">
              {ground.city}, {ground.country} • Capacity: {ground.capacity.toLocaleString()} spectators
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" size="md">
              WEATHER: {ground.weatherForecastPlaceholder.tempC}°C ({ground.weatherForecastPlaceholder.condition})
            </Badge>
          </div>
        </div>
      </div>

      {/* Format Selector Bar */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
        <Tabs
          tabs={[
            { id: "T20I", label: "T20I VENUE STATS" },
            { id: "ODI", label: "ODI VENUE STATS" },
            { id: "TEST", label: "TEST VENUE STATS" },
          ]}
          activeTab={selectedFormat}
          onChange={(tab) => setSelectedFormat(tab)}
        />
        <span className="text-xs font-mono-data text-outline hidden sm:block">
          SURFACE TELEMETRY ACTIVE
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="TOTAL MATCHES"
          value={venueStats.totalMatches}
          subtitle="Hosted in this format"
          icon="sports_cricket"
          accentColor="#4be277"
        />
        <StatCard
          title="AVG 1ST INNINGS SCORE"
          value={venueStats.avgFirstInningsScore}
          subtitle="Batting first baseline"
          icon="equalizer"
          accentColor="#4be277"
        />
        <StatCard
          title="AVG 2ND INNINGS SCORE"
          value={venueStats.avgSecondInningsScore}
          subtitle="Chasing target baseline"
          icon="trending_down"
          accentColor="#c0c1ff"
        />
        <StatCard
          title="CHASING WIN %"
          value={`${venueStats.chasingWinPct}%`}
          subtitle={`Batting 1st Win: ${venueStats.battingFirstWinPct}%`}
          icon="pie_chart"
          accentColor="#ffba61"
        />
        <StatCard
          title="PACE WICKETS %"
          value={`${venueStats.paceWicketsPct}%`}
          subtitle="Fast bowler dominance"
          icon="bolt"
          accentColor="#4be277"
        />
        <StatCard
          title="SPIN WICKETS %"
          value={`${venueStats.spinWicketsPct}%`}
          subtitle="Slow bowler dominance"
          icon="rotate_right"
          accentColor="#c0c1ff"
        />
        <StatCard
          title="HIGHEST TOTAL"
          value={venueStats.highestTotal}
          subtitle="Record team score"
          icon="workspace_premium"
          accentColor="#4be277"
        />
        <StatCard
          title="LOWEST TOTAL"
          value={venueStats.lowestTotal}
          subtitle="Lowest team score"
          icon="warning"
          accentColor="#ffb4ab"
        />
      </div>

      {/* Outfield Diagram & Pitch Map Dual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BoundaryDiagram dimensions={ground.boundaryDimensions} groundName={ground.shortName} />
        <PitchMap />
      </div>

      {/* Venue Historical Records */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
        <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">history</span>
          HISTORICAL VENUE RECORDS ({ground.shortName})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-data text-xs">
          <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
            <span className="text-outline block mb-1">Highest Individual Score</span>
            <span className="text-on-surface font-bold text-sm">{ground.historicalRecords.highestIndividualScore}</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
            <span className="text-outline block mb-1">Best Bowling Figures</span>
            <span className="text-on-surface font-bold text-sm">{ground.historicalRecords.bestBowlingFigures}</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
            <span className="text-outline block mb-1">Highest Successful Chase</span>
            <span className="text-on-surface font-bold text-sm">{ground.historicalRecords.highestSuccessfulChase}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
