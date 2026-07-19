"use client";

import React, { useState } from "react";
import { MOCK_TEAMS } from "@/lib/mockData/teams";
import StatCard from "@/components/common/StatCard";
import Badge from "@/components/common/Badge";
import Tabs from "@/components/common/Tabs";

export default function TeamAnalysisPage() {
  const [selectedTeamId, setSelectedTeamId] = useState("india");
  const team = MOCK_TEAMS.find((t) => t.id === selectedTeamId) || MOCK_TEAMS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-2xl">groups</span>
            <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
              Institutional Team Intelligence
            </h1>
            <Badge variant="primary">SQUAD & H2H MATRIX</Badge>
          </div>
          <p className="text-xs font-mono-data text-outline">
            National team performance telemetry, rankings, and head-to-head match history
          </p>
        </div>

        <Tabs
          tabs={MOCK_TEAMS.map((t) => ({ id: t.id, label: t.name.toUpperCase() }))}
          activeTab={selectedTeamId}
          onChange={(id) => setSelectedTeamId(id)}
        />
      </div>

      {/* Team Header Banner */}
      <div
        className="p-6 lg:p-8 rounded-3xl relative overflow-hidden border border-outline-variant/30 shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${team.primaryColor}22 0%, #111317 70%, #1a1c20 100%)`,
        }}
      >
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-headline font-black text-3xl text-on-surface">
                {team.name} ({team.code})
              </h2>
            </div>
            <p className="text-xs font-mono-data text-on-surface-variant">
              Captain: <span className="text-on-surface font-bold">{team.captain}</span> • Coach: <span className="text-on-surface font-bold">{team.coach}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">TEST RANK #{team.rankings.test}</Badge>
            <Badge variant="tertiary" size="md">ODI RANK #{team.rankings.odi}</Badge>
            <Badge variant="outline" size="md">T20I RANK #{team.rankings.t20i}</Badge>
          </div>
        </div>
      </div>

      {/* Head to Head Table */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
        <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">swap_horiz</span>
          HEAD-TO-HEAD HISTORICAL TELEMETRY
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-2 font-semibold">Opponent</th>
                <th className="pb-2 font-semibold text-right">Matches</th>
                <th className="pb-2 font-semibold text-right">Wins</th>
                <th className="pb-2 font-semibold text-right">Losses</th>
                <th className="pb-2 font-semibold text-right">Ties / NR</th>
                <th className="pb-2 font-semibold text-right">Win %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {team.headToHeadRecords.map((h2h, idx) => {
                const winPct = ((h2h.wins / (h2h.matchesPlayed - h2h.noResults)) * 100).toFixed(1);
                return (
                  <tr key={idx} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="py-3 font-bold text-on-surface">vs {h2h.opponentCode}</td>
                    <td className="py-3 text-right text-outline">{h2h.matchesPlayed}</td>
                    <td className="py-3 text-right font-bold text-primary">{h2h.wins}</td>
                    <td className="py-3 text-right font-bold text-error">{h2h.losses}</td>
                    <td className="py-3 text-right text-outline">{h2h.ties + h2h.noResults}</td>
                    <td className="py-3 text-right font-bold text-tertiary">{winPct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
