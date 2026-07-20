"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import ErrorState from "@/components/common/ErrorState";
import { Match } from "@/types/match";
import { MatchService } from "@/services/matchService";

function MatchAnalysisContent() {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("id") || "";
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"scorecard" | "commentary" | "probability">("scorecard");

  useEffect(() => {
    let isMounted = true;
    async function loadMatch() {
      try {
        setLoading(true);
        setError(null);
        let data: Match | null = null;
        if (matchId) {
          data = await MatchService.getMatchById(matchId);
        }
        if (!data) {
          const matches = await MatchService.getAllMatches();
          data = matches[0] || null;
        }
        if (isMounted) setMatch(data);
      } catch (err) {
        if (isMounted) setError("Failed to load live match telemetry.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadMatch();
    return () => {
      isMounted = false;
    };
  }, [matchId]);

  if (loading) {
    return <SkeletonLoader className="h-96 w-full rounded-3xl" />;
  }

  if (error || !match) {
    return <ErrorState message={error || "Live match profile not found."} />;
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/10 pb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-mono-data font-bold text-rose-300 uppercase tracking-wider">
                {match.status} MATCH TELEMETRY
              </span>
            </div>
            <h1 className="font-display-lg font-bold text-2xl lg:text-3xl text-primary">
              {match.title}
            </h1>
            <p className="text-xs font-mono-data text-outline mt-1">
              {match.series} • {match.venue}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("scorecard")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "scorecard"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-high text-on-surface-variant hover:text-primary"
              }`}
            >
              Scorecard
            </button>
            <button
              onClick={() => setActiveTab("probability")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "probability"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-high text-on-surface-variant hover:text-primary"
              }`}
            >
              Win Probability
            </button>
          </div>
        </div>

        {/* Live Scores Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-2">
            <span className="text-xs font-mono-data font-bold text-outline uppercase">
              {match.teamA.name} ({match.teamA.code})
            </span>
            {match.teamA.scoreCard?.map((sc, idx) => (
              <div key={idx} className="text-2xl font-mono-data text-primary font-bold">
                {sc.runs}/{sc.wickets} <span className="text-xs font-normal text-on-surface-variant">({sc.overs} ov)</span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-2">
            <span className="text-xs font-mono-data font-bold text-outline uppercase">
              {match.teamB.name} ({match.teamB.code})
            </span>
            {match.teamB.scoreCard?.map((sc, idx) => (
              <div key={idx} className="text-2xl font-mono-data text-primary font-bold">
                {sc.runs}/{sc.wickets} <span className="text-xs font-normal text-on-surface-variant">({sc.overs} ov)</span>
              </div>
            ))}
          </div>
        </div>

        {match.resultSummary && (
          <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-mono-data text-emerald-400 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">bolt</span>
            <span>{match.resultSummary}</span>
          </div>
        )}
      </div>

      {/* Main Content Tabs */}
      {activeTab === "scorecard" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
            <h3 className="font-display-lg font-bold text-lg text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">table_chart</span>
              Detailed Innings Scorecard
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-data">
                <thead>
                  <tr className="border-b border-outline-variant/20 text-outline uppercase tracking-wider">
                    <th className="pb-3">Innings</th>
                    <th className="pb-3">Team</th>
                    <th className="pb-3">Runs</th>
                    <th className="pb-3">Wickets</th>
                    <th className="pb-3">Overs</th>
                    <th className="pb-3">Run Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                  {match.teamA.scoreCard?.map((sc, idx) => (
                    <tr key={`a-${idx}`} className="hover:bg-surface-container-high/50">
                      <td className="py-3 font-semibold text-primary">Innings {idx + 1}</td>
                      <td className="py-3 font-bold">{match.teamA.code}</td>
                      <td className="py-3 font-bold text-emerald-400">{sc.runs}</td>
                      <td className="py-3 text-rose-300">{sc.wickets}</td>
                      <td className="py-3">{sc.overs}</td>
                      <td className="py-3">{(sc.runs / (sc.overs || 1)).toFixed(2)}</td>
                    </tr>
                  ))}
                  {match.teamB.scoreCard?.map((sc, idx) => (
                    <tr key={`b-${idx}`} className="hover:bg-surface-container-high/50">
                      <td className="py-3 font-semibold text-primary">Innings {idx + 1}</td>
                      <td className="py-3 font-bold">{match.teamB.code}</td>
                      <td className="py-3 font-bold text-emerald-400">{sc.runs}</td>
                      <td className="py-3 text-rose-300">{sc.wickets}</td>
                      <td className="py-3">{sc.overs}</td>
                      <td className="py-3">{(sc.runs / (sc.overs || 1)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "probability" && (
        <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
          <h3 className="font-display-lg font-bold text-lg text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400">show_chart</span>
            Predictive Win Probability Telemetry
          </h3>

          {match.winProbabilityMatrix ? (
            <div className="space-y-3">
              {match.winProbabilityMatrix.map((wp, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl glass-card border border-outline-variant/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono-data"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-surface-bright text-primary font-bold">
                      Over {wp.over}
                    </span>
                    <span className="text-on-surface">{wp.keyEvent}</span>
                  </div>
                  <div className="font-bold text-primary text-sm">
                    {match.teamA.code} <span className="text-emerald-400">{wp.teamAProb}%</span> / {match.teamB.code} <span className="text-secondary">{wp.teamBProb}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs font-mono-data text-outline">
              Win probability matrix computing live pitch vectors...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function MatchAnalysisPage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-96 w-full rounded-3xl" />}>
      <MatchAnalysisContent />
    </Suspense>
  );
}
