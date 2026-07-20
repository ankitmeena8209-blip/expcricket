"use client";

import React, { useState, useEffect } from "react";
import StatCard from "@/components/common/StatCard";
import Badge from "@/components/common/Badge";
import Tabs from "@/components/common/Tabs";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { Team } from "@/types/team";
import { TeamService } from "@/services/teamService";

export default function TeamAnalysisPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadTeams() {
      try {
        setLoading(true);
        const data = await TeamService.getAllTeams();
        if (isMounted) {
          setTeams(data);
          if (data.length > 0) {
            setSelectedTeamId(data[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load team telemetry:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTeams();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <SkeletonLoader className="h-96 w-full" />;
  }

  const team = teams.find((t) => t.id === selectedTeamId) || teams[0];

  if (!team) {
    return (
      <div className="p-8 text-center text-xs font-mono-data text-outline">
        No team telemetry records available.
      </div>
    );
  }

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

        {teams.length > 0 && (
          <Tabs
            tabs={teams.map((t) => ({ id: t.id, label: t.name.toUpperCase() }))}
            activeTab={selectedTeamId}
            onChange={(id) => setSelectedTeamId(id)}
          />
        )}
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
              Captain: <span className="text-on-surface font-bold">{team.captain || "N/A"}</span> • Coach: <span className="text-on-surface font-bold">{team.coach || "N/A"}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">TEST RANK #{team.rankings?.test || 1}</Badge>
            <Badge variant="tertiary" size="md">ODI RANK #{team.rankings?.odi || 1}</Badge>
            <Badge variant="outline" size="md">T20I RANK #{team.rankings?.t20i || 1}</Badge>
          </div>
        </div>
      </div>

      {/* Head to Head Table */}
      {team.headToHeadRecords && team.headToHeadRecords.length > 0 && (
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
                  const totalValid = h2h.matchesPlayed - h2h.noResults;
                  const winPct = totalValid > 0 ? ((h2h.wins / totalValid) * 100).toFixed(1) : "50.0";
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
      )}
    </div>
  );
}
