"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CompareService, ComparisonResult } from "@/services/compareService";
import { MOCK_PLAYERS } from "@/lib/mockData/players";
import { MOCK_GROUNDS } from "@/lib/mockData/grounds";
import Badge from "@/components/common/Badge";
import Tabs from "@/components/common/Tabs";
import StatCard from "@/components/common/StatCard";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { Player } from "@/types/player";
import { Ground } from "@/types/ground";

function CompareContent() {
  const searchParams = useSearchParams();
  const initialPlayerA = searchParams.get("playerA") || "virat-kohli";
  const initialPlayerB = searchParams.get("playerB") || "travis-head";

  const [mode, setMode] = useState<"PLAYER" | "GROUND">("PLAYER");
  const [selectedA, setSelectedA] = useState(initialPlayerA);
  const [selectedB, setSelectedB] = useState(initialPlayerB);

  const [playerComparison, setPlayerComparison] = useState<ComparisonResult<Player> | null>(null);
  const [groundComparison, setGroundComparison] = useState<ComparisonResult<Ground> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComparison() {
      setLoading(true);
      if (mode === "PLAYER") {
        const res = await CompareService.comparePlayers(selectedA, selectedB);
        setPlayerComparison(res);
      } else {
        const res = await CompareService.compareGrounds("mcg", "lords");
        setGroundComparison(res);
      }
      setLoading(false);
    }
    loadComparison();
  }, [mode, selectedA, selectedB]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-2xl">compare_arrows</span>
            <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
              EXP Compare Engine
            </h1>
            <Badge variant="primary">HEAD-TO-HEAD MATRIX</Badge>
          </div>
          <p className="text-xs font-mono-data text-outline">
            Side-by-side metric comparison for players, grounds, and team statistics
          </p>
        </div>

        <Tabs
          tabs={[
            { id: "PLAYER", label: "PLAYER VS PLAYER" },
            { id: "GROUND", label: "GROUND VS GROUND" },
          ]}
          activeTab={mode}
          onChange={(m) => setMode(m as "PLAYER" | "GROUND")}
        />
      </div>

      {loading ? (
        <SkeletonLoader className="h-64 w-full" />
      ) : mode === "PLAYER" && playerComparison ? (
        <div className="space-y-6">
          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <label className="text-xs font-mono-data text-outline block mb-1">PLAYER A</label>
              <select
                value={selectedA}
                onChange={(e) => setSelectedA(e.target.value)}
                className="w-full p-2.5 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none"
              >
                {MOCK_PLAYERS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.country})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <label className="text-xs font-mono-data text-outline block mb-1">PLAYER B</label>
              <select
                value={selectedB}
                onChange={(e) => setSelectedB(e.target.value)}
                className="w-full p-2.5 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none"
              >
                {MOCK_PLAYERS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.country})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player A Card */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-primary/40 space-y-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: playerComparison.entityA.primaryColor }} />
                <h3 className="font-headline font-bold text-xl text-on-surface">
                  {playerComparison.entityA.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  title="ODI AVERAGE"
                  value={playerComparison.entityA.stats.ODI?.batting?.average || 0}
                  subtitle="Career Average"
                  accentColor={playerComparison.entityA.primaryColor}
                />
                <StatCard
                  title="STRIKE RATE"
                  value={playerComparison.entityA.stats.ODI?.batting?.strikeRate || 0}
                  subtitle="Runs/100 balls"
                  accentColor={playerComparison.entityA.primaryColor}
                />
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-2">
                <span className="text-xs font-mono-data font-bold text-primary uppercase block">
                  KEY ADVANTAGES
                </span>
                <ul className="text-xs font-mono-data text-on-surface-variant space-y-1 list-disc list-inside">
                  {playerComparison.advantages.entityAAdvantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Player B Card */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-tertiary/40 space-y-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: playerComparison.entityB.primaryColor }} />
                <h3 className="font-headline font-bold text-xl text-on-surface">
                  {playerComparison.entityB.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  title="ODI AVERAGE"
                  value={playerComparison.entityB.stats.ODI?.batting?.average || 0}
                  subtitle="Career Average"
                  accentColor={playerComparison.entityB.primaryColor}
                />
                <StatCard
                  title="STRIKE RATE"
                  value={playerComparison.entityB.stats.ODI?.batting?.strikeRate || 0}
                  subtitle="Runs/100 balls"
                  accentColor={playerComparison.entityB.primaryColor}
                />
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-2">
                <span className="text-xs font-mono-data font-bold text-tertiary uppercase block">
                  KEY ADVANTAGES
                </span>
                <ul className="text-xs font-mono-data text-on-surface-variant space-y-1 list-disc list-inside">
                  {playerComparison.advantages.entityBAdvantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : groundComparison ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-surface-container-low border border-primary/40 space-y-4">
            <h3 className="font-headline font-bold text-xl text-on-surface">
              {groundComparison.entityA.name}
            </h3>
            <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-2">
              <span className="text-xs font-mono-data font-bold text-primary uppercase block">
                VENUE ADVANTAGES
              </span>
              <ul className="text-xs font-mono-data text-on-surface-variant space-y-1 list-disc list-inside">
                {groundComparison.advantages.entityAAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-low border border-tertiary/40 space-y-4">
            <h3 className="font-headline font-bold text-xl text-on-surface">
              {groundComparison.entityB.name}
            </h3>
            <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-2">
              <span className="text-xs font-mono-data font-bold text-tertiary uppercase block">
                VENUE ADVANTAGES
              </span>
              <ul className="text-xs font-mono-data text-on-surface-variant space-y-1 list-disc list-inside">
                {groundComparison.advantages.entityBAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function CompareEnginePage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-64 w-full" />}>
      <CompareContent />
    </Suspense>
  );
}
