"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/common/StatCard";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import PitchMap from "@/components/charts/PitchMap";
import { MOCK_PLAYERS } from "@/lib/mockData/players";
import { MOCK_MATCHES } from "@/lib/mockData/matches";
import { MOCK_GROUNDS } from "@/lib/mockData/grounds";
import { AI_PROMPT_PRESETS } from "@/lib/mockData/aiPrompts";

export default function CommandCenterHome() {
  const liveMatch = MOCK_MATCHES[0];
  const mcg = MOCK_GROUNDS[0];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="p-6 lg:p-10 rounded-3xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high border border-outline-variant/30 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">
              COMMAND CENTER V1.0
            </Badge>
            <span className="text-xs font-mono-data text-outline">
              REALTIME TELEMETRY ACTIVE
            </span>
          </div>

          <h1 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-on-surface leading-tight">
            The Future of <span className="text-primary">Cricket Intelligence.</span>
          </h1>

          <p className="text-sm lg:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Institutional-grade match telemetry, predictive pitch vector models, player matchups, and multi-model AI analyst suite built for high-performance sports analytics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/player-intelligence">
              <Button variant="primary" icon="person">
                Explore Player Profiles
              </Button>
            </Link>
            <Link href="/ai-analyst">
              <Button variant="secondary" icon="psychology">
                Launch AI Analyst
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Core Platform KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="PLAYERS TRACKED"
          value="5,420+"
          subtitle="Across Test, ODI, T20 formats"
          icon="groups"
          accentColor="#4be277"
        />
        <StatCard
          title="VENUES ANALYZED"
          value="184"
          subtitle="Pitch telemetry & boundary maps"
          icon="stadium"
          accentColor="#c0c1ff"
        />
        <StatCard
          title="AI PREDICTIVE MODELS"
          value="42"
          subtitle="Win probability & pitch vectors"
          icon="psychology"
          accentColor="#ffba61"
        />
        <StatCard
          title="MATCH DATA RECORDS"
          value="1.2M+"
          subtitle="Ball-by-ball historical dataset"
          icon="database"
          accentColor="#4be277"
        />
      </div>

      {/* Live Match Intelligence Card */}
      {liveMatch && (
        <div className="p-6 lg:p-8 rounded-3xl bg-surface-container-low border border-primary/40 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-4 border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
              <span className="text-xs font-mono-data font-bold text-primary uppercase tracking-wider">
                FEATURED LIVE MATCH TELEMETRY
              </span>
            </div>
            <Badge variant="error" size="sm">
              {liveMatch.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Teams & Scorecard */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs font-mono-data text-outline block">
                {liveMatch.series} • {liveMatch.venue}
              </span>
              <h2 className="font-headline font-bold text-xl text-on-surface">
                {liveMatch.title}
              </h2>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-headline font-bold text-lg text-on-surface">
                      {liveMatch.teamA.name} ({liveMatch.teamA.code})
                    </span>
                  </div>
                  {liveMatch.teamA.scoreCard?.map((sc, i) => (
                    <div key={i} className="text-sm font-mono-data text-primary font-bold">
                      {sc.runs}/{sc.wickets} ({sc.overs} ov)
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-headline font-bold text-lg text-on-surface">
                      {liveMatch.teamB.name} ({liveMatch.teamB.code})
                    </span>
                  </div>
                  {liveMatch.teamB.scoreCard?.map((sc, i) => (
                    <div key={i} className="text-sm font-mono-data text-on-surface font-bold">
                      {sc.runs}/{sc.wickets} ({sc.overs} ov)
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/20 text-xs font-mono-data text-primary">
                ⚡ {liveMatch.resultSummary}
              </div>
            </div>

            {/* Quick Action */}
            <div className="p-5 rounded-2xl bg-surface-container-high border border-outline-variant/30 space-y-3 text-center">
              <span className="text-xs font-mono-data text-outline block uppercase">
                WIN PROBABILITY MODEL
              </span>
              <div className="text-3xl font-headline font-black text-primary">
                78% IND <span className="text-outline text-xl font-normal">/ 22% AUS</span>
              </div>
              <p className="text-[11px] font-mono-data text-on-surface-variant">
                India lead by 222 runs with 6 second-innings wickets in hand.
              </p>
              <Link href={`/match-analysis?id=${liveMatch.id}`} className="block">
                <Button variant="primary" size="sm" className="w-full">
                  Open Live Match Matrix
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Trending Profiles & Ground Analysis Dual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Trending Player Profiles */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-xl text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              Trending Profiles
            </h3>
            <Link href="/player-intelligence" className="text-xs font-mono-data text-primary hover:underline">
              View All Players →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MOCK_PLAYERS.map((player) => (
              <Link
                key={player.id}
                href={`/player-intelligence?id=${player.id}`}
                className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all group relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: player.primaryColor }}
                />
                <div className="w-16 h-16 rounded-xl overflow-hidden mb-3 border border-outline-variant/30">
                  <Image
                    src={player.avatarUrl}
                    alt={player.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <h4 className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                  {player.name}
                </h4>
                <p className="text-xs font-mono-data text-outline mb-2">
                  {player.country} • {player.role}
                </p>
                <div className="text-xs font-mono-data font-bold text-on-surface">
                  ODI Avg: <span className="text-primary">{player.stats.ODI?.batting?.average}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Featured Ground Analysis */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-xl text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">stadium</span>
              Featured Venue
            </h3>
            <Link href="/ground-intelligence" className="text-xs font-mono-data text-primary hover:underline">
              Ground Intel →
            </Link>
          </div>

          <PitchMap />
        </div>
      </div>

      {/* AI Assistant Launcher Banner */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-low border border-tertiary/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-2xl">psychology</span>
            <span className="text-xs font-mono-data font-bold text-tertiary uppercase tracking-wider">
              AI CRICKET INTELLIGENCE ENGINE
            </span>
          </div>
          <h3 className="font-headline font-bold text-2xl text-on-surface">
            Ask any tactical question about players, pitches, or match scenarios.
          </h3>
          <p className="text-xs font-mono-data text-on-surface-variant">
            Powered by multi-provider strategy: Gemini 1.5 Pro, OpenAI GPT-4o, and Grok 2.
          </p>
        </div>
        <Link href="/ai-analyst">
          <Button variant="primary" size="lg" icon="arrow_forward">
            Launch AI Assistant
          </Button>
        </Link>
      </div>
    </div>
  );
}
