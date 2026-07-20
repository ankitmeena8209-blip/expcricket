"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Badge from "@/components/common/Badge";
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
        if (isMounted) setError("Failed to load match telemetry.");
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
    return <SkeletonLoader className="h-96 w-full" />;
  }

  if (error || !match) {
    return <ErrorState message={error || "Match profile not found."} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-2xl">sports_cricket</span>
            <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
              {match.title}
            </h1>
            <Badge variant={match.status === "LIVE" ? "error" : "primary"}>{match.status}</Badge>
          </div>
          <p className="text-xs font-mono-data text-outline">
            {match.series} • {match.venue}
          </p>
        </div>
      </div>

      {/* Scorecards Banner */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-primary/40 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-high border border-outline-variant/30">
            <h3 className="font-headline font-bold text-xl text-on-surface mb-2">{match.teamA.name} ({match.teamA.code})</h3>
            {match.teamA.scoreCard?.map((sc, idx) => (
              <div key={idx} className="text-base font-mono-data text-primary font-bold">
                Innings {idx + 1}: {sc.runs}/{sc.wickets} ({sc.overs} overs)
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-high border border-outline-variant/30">
            <h3 className="font-headline font-bold text-xl text-on-surface mb-2">{match.teamB.name} ({match.teamB.code})</h3>
            {match.teamB.scoreCard?.map((sc, idx) => (
              <div key={idx} className="text-base font-mono-data text-on-surface font-bold">
                Innings {idx + 1}: {sc.runs}/{sc.wickets} ({sc.overs} overs)
              </div>
            ))}
          </div>
        </div>

        {match.resultSummary && (
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/20 text-xs font-mono-data text-primary">
            ⚡ {match.resultSummary}
          </div>
        )}
      </div>

      {/* Win Probability Matrix Timeline */}
      {match.winProbabilityMatrix && (
        <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
          <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">show_chart</span>
            WIN PROBABILITY TELEMETRY MATRIX
          </h3>

          <div className="space-y-3">
            {match.winProbabilityMatrix.map((wp, i) => (
              <div key={i} className="p-3 rounded-xl bg-surface-container-high border border-outline-variant/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono-data">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">Over {wp.over}</span>
                  <span className="text-on-surface">{wp.keyEvent}</span>
                </div>
                <div className="font-bold text-primary">
                  {match.teamA.code} {wp.teamAProb}% / {match.teamB.code} {wp.teamBProb}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MatchAnalysisPage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-96 w-full" />}>
      <MatchAnalysisContent />
    </Suspense>
  );
}
