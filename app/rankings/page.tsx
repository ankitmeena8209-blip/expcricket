"use client";

import React, { useState, useEffect } from "react";
import { MOCK_RANKINGS, RankingItem } from "@/lib/mockData/rankings";
import { PlayerService } from "@/services/playerService";
import Badge from "@/components/common/Badge";
import Tabs from "@/components/common/Tabs";
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
              rating: 850 - idx * 25,
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
      {/* Header */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-2xl">leaderboard</span>
            <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
              ICC & EXP Player Rankings
            </h1>
            <Badge variant="primary">OFFICIAL TELEMETRY</Badge>
          </div>
          <p className="text-xs font-mono-data text-outline">
            Updated player ratings across Test, ODI, and T20 International formats
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Tabs
            tabs={[
              { id: "BATTER", label: "BATTERS" },
              { id: "BOWLER", label: "BOWLERS" },
            ]}
            activeTab={category}
            onChange={(c) => setCategory(c as "BATTER" | "BOWLER")}
          />

          <Tabs
            tabs={[
              { id: "ODI", label: "ODI" },
              { id: "TEST", label: "TEST" },
              { id: "T20I", label: "T20I" },
            ]}
            activeTab={format}
            onChange={(f) => setFormat(f as "TEST" | "ODI" | "T20I")}
          />
        </div>
      </div>

      {/* Rankings Table */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
        {loading ? (
          <SkeletonLoader className="h-64 w-full" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-data">
              <thead>
                <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                  <th className="pb-3 font-semibold">Rank</th>
                  <th className="pb-3 font-semibold">Player</th>
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold text-right">Rating</th>
                  <th className="pb-3 font-semibold text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15 text-on-surface">
                {liveList.map((item) => (
                  <tr key={item.rank} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="py-3.5 font-headline font-bold text-base text-primary">
                      #{item.rank}
                    </td>
                    <td className="py-3.5 font-bold text-on-surface text-sm">
                      {item.playerName}
                    </td>
                    <td className="py-3.5 text-on-surface-variant font-semibold">
                      {item.country} ({item.countryCode})
                    </td>
                    <td className="py-3.5 text-right font-bold text-primary text-sm">
                      {item.rating}
                    </td>
                    <td className="py-3.5 text-right">
                      {item.change === "UP" && <span className="text-primary font-bold">↑ UP</span>}
                      {item.change === "DOWN" && <span className="text-error font-bold">↓ DOWN</span>}
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
