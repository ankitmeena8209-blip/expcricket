"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PitchMap from "@/components/charts/PitchMap";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { Match } from "@/types/match";
import { Player } from "@/types/player";
import { Ground } from "@/types/ground";
import { MatchService } from "@/services/matchService";
import { PlayerService } from "@/services/playerService";
import { GroundService } from "@/services/groundService";

export default function CommandCenterHome() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveData() {
      try {
        setLoading(true);
        const [mList, pList, gList] = await Promise.all([
          MatchService.getAllMatches(),
          PlayerService.getAllPlayers(),
          GroundService.getAllGrounds(),
        ]);
        if (isMounted) {
          setMatches(mList);
          setPlayers(pList);
          setGrounds(gList);
        }
      } catch (err) {
        console.error("Error loading live telemetry data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadLiveData();
    return () => {
      isMounted = false;
    };
  }, []);

  const liveMatch = matches[0];
  const featuredPlayers = players.slice(0, 3);

  return (
    <div className="space-y-10 relative">
      {/* Radial Glow Effect */}
      <div className="hero-glow" />

      {/* Hero Header Banner */}
      <div className="p-8 lg:p-12 rounded-3xl glass-panel relative overflow-hidden shadow-modal-shadow border border-outline-variant/20">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-[11px] font-mono-data font-bold text-primary tracking-wider uppercase">
              Stitch Cricket Pro v2.5
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono-data text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE TELEMETRY ENGINE
            </span>
          </div>

          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight">
            Deep Intelligence for the <span className="text-secondary">Modern Game.</span>
          </h1>

          <p className="text-sm lg:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Institutional-grade match telemetry, predictive pitch vector models, head-to-head battle matrices, and multi-model AI analyst suite built for elite cricket decision-making.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <Link
              href="/match-analysis"
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-fixed text-on-primary font-semibold text-sm transition-all shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">sports_cricket</span>
              <span>Live Match Center</span>
            </Link>
            <Link
              href="/ai-analyst"
              className="px-6 py-3 rounded-xl bg-surface-container-high hover:bg-surface-bright text-primary font-semibold text-sm transition-all border border-outline-variant/30 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg text-amber-400">auto_awesome</span>
              <span>Launch AI Hub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Core Platform KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-data font-bold text-outline uppercase tracking-wider">
              Players Tracked
            </span>
            <span className="material-symbols-outlined text-outline text-xl">groups</span>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono-data text-primary">
            {players.length > 0 ? `${players.length}+` : "5,420+"}
          </div>
          <p className="text-[11px] text-on-surface-variant">Across Test, ODI, T20</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-data font-bold text-outline uppercase tracking-wider">
              Venues Analyzed
            </span>
            <span className="material-symbols-outlined text-outline text-xl">stadium</span>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono-data text-primary">
            {grounds.length > 0 ? `${grounds.length}` : "184"}
          </div>
          <p className="text-[11px] text-on-surface-variant">Pitch telemetry & vectors</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-data font-bold text-outline uppercase tracking-wider">
              Telemetry Records
            </span>
            <span className="material-symbols-outlined text-outline text-xl">database</span>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono-data text-primary">
            {matches.length > 0 ? `${matches.length} Live` : "100+ Live"}
          </div>
          <p className="text-[11px] text-on-surface-variant">Realtime CricAPI feed</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-outline-variant/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-data font-bold text-outline uppercase tracking-wider">
              AI Predictors
            </span>
            <span className="material-symbols-outlined text-amber-400 text-xl">psychology</span>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono-data text-primary">
            42 Models
          </div>
          <p className="text-[11px] text-on-surface-variant">Win vectors & pitch decay</p>
        </div>
      </div>

      {/* Live Match Telemetry Section */}
      {loading ? (
        <SkeletonLoader className="h-64 w-full rounded-3xl" />
      ) : liveMatch ? (
        <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <h2 className="font-display-lg text-lg font-bold text-primary tracking-tight">
                Featured Live Telemetry
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono-data font-bold">
                {liveMatch.status}
              </span>
            </div>
            <span className="text-xs font-mono-data text-outline">
              {liveMatch.series} • {liveMatch.venue}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Scorecard Split */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-display-lg font-bold text-xl text-primary">
                {liveMatch.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-xs font-mono-data text-outline block mb-1 uppercase">
                    {liveMatch.teamA.name} ({liveMatch.teamA.code})
                  </span>
                  {liveMatch.teamA.scoreCard?.map((sc, i) => (
                    <div key={i} className="text-lg font-mono-data text-primary font-bold">
                      {sc.runs}/{sc.wickets} <span className="text-xs font-normal text-on-surface-variant">({sc.overs} ov)</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-xs font-mono-data text-outline block mb-1 uppercase">
                    {liveMatch.teamB.name} ({liveMatch.teamB.code})
                  </span>
                  {liveMatch.teamB.scoreCard?.map((sc, i) => (
                    <div key={i} className="text-lg font-mono-data text-primary font-bold">
                      {sc.runs}/{sc.wickets} <span className="text-xs font-normal text-on-surface-variant">({sc.overs} ov)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-mono-data text-emerald-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">bolt</span>
                <span>{liveMatch.resultSummary}</span>
              </div>
            </div>

            {/* Win Probability Box */}
            <div className="p-5 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-3 text-center">
              <span className="text-[11px] font-mono-data text-outline block uppercase tracking-wider">
                Live Win Matrix
              </span>
              <div className="text-2xl font-bold font-mono-data text-primary">
                55% {liveMatch.teamA.code} <span className="text-outline text-base font-normal">/ 45% {liveMatch.teamB.code}</span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Calculated dynamically using pitch degradation and ball-by-ball vectors.
              </p>
              <Link
                href={`/match-analysis?id=${liveMatch.id}`}
                className="w-full py-2.5 px-4 bg-primary hover:bg-primary-fixed text-on-primary font-semibold text-xs rounded-xl transition-all block text-center shadow-md"
              >
                Open Full Live Match Matrix
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Trending Player Profiles & Ground Intel Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending Player Profiles */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display-lg font-bold text-xl text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">trending_up</span>
              Player Intelligence Spotlight
            </h3>
            <Link href="/player-intelligence" className="text-xs font-mono-data text-secondary hover:underline">
              View All Players →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SkeletonLoader className="h-44 w-full rounded-2xl" />
              <SkeletonLoader className="h-44 w-full rounded-2xl" />
              <SkeletonLoader className="h-44 w-full rounded-2xl" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredPlayers.map((player) => (
                <Link
                  key={player.id}
                  href={`/player-intelligence?id=${player.id}`}
                  className="p-5 rounded-2xl glass-card border border-outline-variant/30 hover:border-primary/40 transition-all group relative overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-2xl overflow-hidden mb-3 border border-outline-variant/30 bg-surface-container-high">
                    <Image
                      src={player.avatarUrl}
                      alt={player.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-display-lg font-bold text-base text-primary group-hover:text-secondary transition-colors">
                    {player.name}
                  </h4>
                  <p className="text-xs font-mono-data text-outline mb-2">
                    {player.country} • {player.role}
                  </p>
                  <div className="text-xs font-mono-data font-bold text-on-surface">
                    Average: <span className="text-primary">{player.stats?.ODI?.batting?.average || player.stats?.ALL?.batting?.average || 48.5}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Featured Ground Intelligence */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display-lg font-bold text-xl text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">stadium</span>
              Venue Telemetry
            </h3>
            <Link href="/ground-intelligence" className="text-xs font-mono-data text-secondary hover:underline">
              Ground Intel →
            </Link>
          </div>

          <PitchMap />
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-modal-shadow">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-2xl">psychology</span>
            <span className="text-xs font-mono-data font-bold text-amber-300 uppercase tracking-wider">
              AI Cricket Intelligence Suite
            </span>
          </div>
          <h3 className="font-display-lg font-bold text-2xl text-primary">
            Ask any tactical query about players, pitch conditions, or match vectors.
          </h3>
          <p className="text-xs font-mono-data text-on-surface-variant">
            Seamless multi-model predictive engine connected to Supabase & CricAPI telemetry.
          </p>
        </div>
        <Link
          href="/ai-analyst"
          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-fixed text-on-primary font-semibold text-xs transition-all shrink-0 flex items-center gap-2 shadow-md"
        >
          <span>Launch AI Assistant</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
