"use client";

import React, { useState, useEffect } from "react";
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
    return <SkeletonLoader className="h-96 w-full rounded-3xl" />;
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
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-secondary text-2xl">groups</span>
            <h1 className="font-display-lg font-bold text-2xl lg:text-3xl text-primary">
              Institutional Team Intelligence
            </h1>
          </div>
          <p className="text-xs font-mono-data text-outline">
            National team performance telemetry, ICC rankings, and historical head-to-head records.
          </p>
        </div>

        {teams.length > 0 && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-high border border-outline-variant/20 flex-wrap">
            {teams.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTeamId(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono-data transition-all ${
                  selectedTeamId === t.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-outline hover:text-primary"
                }`}
              >
                {t.name.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Team Header Banner */}
      <div className="p-6 lg:p-10 rounded-3xl glass-panel relative overflow-hidden border border-outline-variant/30 shadow-modal-shadow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <h2 className="font-display-lg font-bold text-3xl text-primary mb-1">
              {team.name} ({team.code})
            </h2>
            <p className="text-xs font-mono-data text-on-surface-variant">
              Captain: <span className="text-primary font-bold">{team.captain || "N/A"}</span> • Coach: <span className="text-primary font-bold">{team.coach || "N/A"}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-surface-bright border border-outline-variant/30 text-xs font-mono-data font-bold text-primary">
              TEST RANK #{team.rankings?.test || 1}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-bright border border-outline-variant/30 text-xs font-mono-data font-bold text-primary">
              ODI RANK #{team.rankings?.odi || 1}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-bright border border-outline-variant/30 text-xs font-mono-data font-bold text-primary">
              T20I RANK #{team.rankings?.t20i || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Head to Head Table */}
      {team.headToHeadRecords && team.headToHeadRecords.length > 0 && (
        <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
          <h3 className="font-display-lg font-bold text-base text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">swap_horiz</span>
            Head-to-Head Telemetry vs Rivals
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-data">
              <thead>
                <tr className="border-b border-outline-variant/20 text-outline uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-semibold">Opponent</th>
                  <th className="pb-3 font-semibold text-right">Played</th>
                  <th className="pb-3 font-semibold text-right">Wins</th>
                  <th className="pb-3 font-semibold text-right">Losses</th>
                  <th className="pb-3 font-semibold text-right">Ties / NR</th>
                  <th className="pb-3 font-semibold text-right">Win %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                {team.headToHeadRecords.map((h2h, idx) => {
                  const totalValid = h2h.matchesPlayed - h2h.noResults;
                  const winPct = totalValid > 0 ? ((h2h.wins / totalValid) * 100).toFixed(1) : "50.0";
                  return (
                    <tr key={idx} className="hover:bg-surface-container-high/50 transition-colors">
                      <td className="py-3.5 font-bold text-primary">vs {h2h.opponentCode}</td>
                      <td className="py-3.5 text-right text-outline">{h2h.matchesPlayed}</td>
                      <td className="py-3.5 text-right font-bold text-emerald-400">{h2h.wins}</td>
                      <td className="py-3.5 text-right font-bold text-rose-300">{h2h.losses}</td>
                      <td className="py-3.5 text-right text-outline">{h2h.ties + h2h.noResults}</td>
                      <td className="py-3.5 text-right font-bold text-amber-300">{winPct}%</td>
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
