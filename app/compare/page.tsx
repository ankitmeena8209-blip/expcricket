"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CompareService, ComparisonResult } from "@/services/compareService";
import { PlayerService } from "@/services/playerService";
import { GroundService } from "@/services/groundService";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { Player } from "@/types/player";
import { Ground } from "@/types/ground";

function CompareContent() {
  const searchParams = useSearchParams();
  const initialPlayerA = searchParams.get("playerA") || "";
  const initialPlayerB = searchParams.get("playerB") || "";

  const [mode, setMode] = useState<"PLAYER" | "GROUND">("PLAYER");
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [groundsList, setGroundsList] = useState<Ground[]>([]);
  const [selectedA, setSelectedA] = useState(initialPlayerA);
  const [selectedB, setSelectedB] = useState(initialPlayerB);

  const [playerComparison, setPlayerComparison] = useState<ComparisonResult<Player> | null>(null);
  const [groundComparison, setGroundComparison] = useState<ComparisonResult<Ground> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function initOptions() {
      try {
        const [pList, gList] = await Promise.all([
          PlayerService.getAllPlayers(),
          GroundService.getAllGrounds(),
        ]);
        if (isMounted) {
          setPlayersList(pList);
          setGroundsList(gList);
          if (pList.length > 0) {
            if (!selectedA) setSelectedA(pList[0].id);
            if (!selectedB) setSelectedB(pList[1]?.id || pList[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load options for compare engine:", err);
      }
    }
    initOptions();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadComparison() {
      if (!selectedA && mode === "PLAYER") return;
      setLoading(true);
      if (mode === "PLAYER") {
        const res = await CompareService.comparePlayers(selectedA, selectedB || selectedA);
        if (isMounted) setPlayerComparison(res);
      } else {
        const gA = groundsList[0]?.id || "mcg";
        const gB = groundsList[1]?.id || groundsList[0]?.id || "mcg";
        const res = await CompareService.compareGrounds(gA, gB);
        if (isMounted) setGroundComparison(res);
      }
      if (isMounted) setLoading(false);
    }
    loadComparison();
    return () => {
      isMounted = false;
    };
  }, [mode, selectedA, selectedB, groundsList]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-secondary text-2xl">compare_arrows</span>
            <h1 className="font-display-lg font-bold text-2xl lg:text-3xl text-primary">
              Head-to-Head Duel Matrix
            </h1>
          </div>
          <p className="text-xs font-mono-data text-outline">
            Telemetry comparison for players, pitch metrics, and performance vectors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("PLAYER")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono-data transition-all ${
              mode === "PLAYER"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-high text-on-surface-variant hover:text-primary"
            }`}
          >
            Player Duel
          </button>
          <button
            onClick={() => setMode("GROUND")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono-data transition-all ${
              mode === "GROUND"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-high text-on-surface-variant hover:text-primary"
            }`}
          >
            Ground Duel
          </button>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader className="h-64 w-full rounded-3xl" />
      ) : mode === "PLAYER" && playerComparison ? (
        <div className="space-y-6">
          {/* Player Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl glass-panel border border-outline-variant/30">
              <label className="text-[11px] font-mono-data font-bold text-outline block mb-1.5 uppercase">
                Select Competitor A:
              </label>
              <select
                value={selectedA}
                onChange={(e) => setSelectedA(e.target.value)}
                className="w-full p-3 bg-surface-container-high border border-outline-variant/30 rounded-xl text-xs font-mono-data text-primary focus:outline-none"
              >
                {playersList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.country})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-outline-variant/30">
              <label className="text-[11px] font-mono-data font-bold text-outline block mb-1.5 uppercase">
                Select Competitor B:
              </label>
              <select
                value={selectedB}
                onChange={(e) => setSelectedB(e.target.value)}
                className="w-full p-3 bg-surface-container-high border border-outline-variant/30 rounded-xl text-xs font-mono-data text-primary focus:outline-none"
              >
                {playersList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.country})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duel Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player A Card */}
            <div className="p-6 rounded-3xl glass-card border border-outline-variant/30 space-y-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-3">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: playerComparison.entityA.primaryColor || "#ffffff" }}
                />
                <h3 className="font-display-lg font-bold text-xl text-primary">
                  {playerComparison.entityA.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] font-mono-data text-outline block uppercase">Average</span>
                  <div className="text-xl font-mono-data font-bold text-emerald-400">
                    {playerComparison.entityA.stats?.ODI?.batting?.average || playerComparison.entityA.stats?.ALL?.batting?.average || 48}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] font-mono-data text-outline block uppercase">Strike Rate</span>
                  <div className="text-xl font-mono-data font-bold text-secondary">
                    {playerComparison.entityA.stats?.ODI?.batting?.strikeRate || playerComparison.entityA.stats?.ALL?.batting?.strikeRate || 92}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 space-y-2">
                <span className="text-xs font-mono-data font-bold text-primary uppercase block">
                  Tactical Advantages
                </span>
                <ul className="text-xs font-mono-data text-on-surface-variant space-y-1.5 list-disc list-inside">
                  {playerComparison.advantages.entityAAdvantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Player B Card */}
            <div className="p-6 rounded-3xl glass-card border border-outline-variant/30 space-y-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-3">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: playerComparison.entityB.primaryColor || "#ffffff" }}
                />
                <h3 className="font-display-lg font-bold text-xl text-primary">
                  {playerComparison.entityB.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] font-mono-data text-outline block uppercase">Average</span>
                  <div className="text-xl font-mono-data font-bold text-emerald-400">
                    {playerComparison.entityB.stats?.ODI?.batting?.average || playerComparison.entityB.stats?.ALL?.batting?.average || 45}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] font-mono-data text-outline block uppercase">Strike Rate</span>
                  <div className="text-xl font-mono-data font-bold text-secondary">
                    {playerComparison.entityB.stats?.ODI?.batting?.strikeRate || playerComparison.entityB.stats?.ALL?.batting?.strikeRate || 94}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 space-y-2">
                <span className="text-xs font-mono-data font-bold text-amber-300 uppercase block">
                  Tactical Advantages
                </span>
                <ul className="text-xs font-mono-data text-on-surface-variant space-y-1.5 list-disc list-inside">
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
          <div className="p-6 rounded-3xl glass-card border border-outline-variant/30 space-y-4">
            <h3 className="font-display-lg font-bold text-xl text-primary">
              {groundComparison.entityA.name}
            </h3>
            <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 space-y-2">
              <span className="text-xs font-mono-data font-bold text-primary uppercase block">
                Venue Characteristics
              </span>
              <ul className="text-xs font-mono-data text-on-surface-variant space-y-1.5 list-disc list-inside">
                {groundComparison.advantages.entityAAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-outline-variant/30 space-y-4">
            <h3 className="font-display-lg font-bold text-xl text-primary">
              {groundComparison.entityB.name}
            </h3>
            <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/20 space-y-2">
              <span className="text-xs font-mono-data font-bold text-secondary uppercase block">
                Venue Characteristics
              </span>
              <ul className="text-xs font-mono-data text-on-surface-variant space-y-1.5 list-disc list-inside">
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
    <Suspense fallback={<SkeletonLoader className="h-64 w-full rounded-3xl" />}>
      <CompareContent />
    </Suspense>
  );
}
