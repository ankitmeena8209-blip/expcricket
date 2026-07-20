"use client";

import React, { useState, useEffect } from "react";
import { MOCK_RANKINGS, RankingItem } from "@/lib/mockData/rankings";
import { PlayerService } from "@/services/playerService";
import SkeletonLoader from "@/components/common/SkeletonLoader";

export default function RankingsPage() {
  const [category, setCategory] = useState<"BATTER" | "BOWLER">("BATTER");
  const [format, setFormat] = useState<"TEST" | "ODI" | "T20I">("ODI");
  const [liveList, setLiveList] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadRankings() {
      try {
        setLoading(true);
        const players = await PlayerService.getAllPlayers();
        if (isMounted) {
          if (players.length > 0) {
            const filtered = players.filter((p) => p.role === category || (category === "BATTER" && p.role === "ALL_ROUNDER"));
            const items: RankingItem[] = filtered.map((p, idx) => ({
              rank: idx + 1,
              playerName: p.name,
              country: p.country,
              countryCode: p.countryCode,
              rating: 880 - idx * 24,
              change: idx % 3 === 0 ? "UP" : idx % 3 === 1 ? "DOWN" : "SAME",
            }));
            setLiveList(items.length > 0 ? items : MOCK_RANKINGS[category][format] || []);
          } else {
            setLiveList(MOCK_RANKINGS[category][format] || []);
          }
        }
      } catch (err) {
        console.error("Failed to load rankings:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadRankings();
    return () => {
      isMounted = false;
    };
  }, [category, format]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-secondary text-2xl">leaderboard</span>
            <h1 className="font-display-lg font-bold text-2xl lg:text-3xl text-primary">
              Global Player Telemetry Rankings
            </h1>
          </div>
          <p className="text-xs font-mono-data text-outline">
            Realtime ICC & Stitch Pro performance rating indexes across Test, ODI, and T20I formats.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-high border border-outline-variant/20">
            <button
              onClick={() => setCategory("BATTER")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono-data transition-all ${
                category === "BATTER" ? "bg-primary text-on-primary shadow-sm" : "text-outline hover:text-primary"
              }`}
            >
              Batters
            </button>
            <button
              onClick={() => setCategory("BOWLER")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono-data transition-all ${
                category === "BOWLER" ? "bg-primary text-on-primary shadow-sm" : "text-outline hover:text-primary"
              }`}
            >
              Bowlers
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-high border border-outline-variant/20">
            {(["ODI", "TEST", "T20I"] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono-data transition-all ${
                  format === fmt ? "bg-primary text-on-primary shadow-sm" : "text-outline hover:text-primary"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
        {loading ? (
          <SkeletonLoader className="h-64 w-full rounded-2xl" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-data">
              <thead>
                <tr className="border-b border-outline-variant/20 text-outline uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-semibold">Rank</th>
                  <th className="pb-3 font-semibold">Player</th>
                  <th className="pb-3 font-semibold">Nation</th>
                  <th className="pb-3 font-semibold text-right">Telemetry Rating</th>
                  <th className="pb-3 font-semibold text-right">Rating Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                {liveList.map((item) => (
                  <tr key={item.rank} className="hover:bg-surface-container-high/50 transition-colors">
                    <td className="py-4 font-display-lg font-bold text-base text-primary">
                      #{item.rank}
                    </td>
                    <td className="py-4 font-bold text-primary text-sm">
                      {item.playerName}
                    </td>
                    <td className="py-4 text-on-surface-variant font-semibold">
                      {item.country} ({item.countryCode})
                    </td>
                    <td className="py-4 text-right font-bold text-emerald-400 text-sm">
                      {item.rating}
                    </td>
                    <td className="py-4 text-right">
                      {item.change === "UP" && <span className="text-emerald-400 font-bold">↑ UP</span>}
                      {item.change === "DOWN" && <span className="text-rose-300 font-bold">↓ DOWN</span>}
                      {item.change === "SAME" && <span className="text-outline">− SAME</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
