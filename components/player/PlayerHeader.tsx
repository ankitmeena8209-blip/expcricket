"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Player } from "@/types/player";
import { useFavorites } from "@/hooks/useFavorites";

interface PlayerHeaderProps {
  player: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const bookmarked = isFavorite(player.id);

  return (
    <div className="p-6 lg:p-10 rounded-3xl glass-panel relative overflow-hidden border border-outline-variant/30 shadow-modal-shadow">
      {/* Background Radial Glow */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: player.primaryColor || "#ffffff" }}
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        {/* Avatar & Player Meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl p-1 relative overflow-hidden shadow-2xl bg-surface-container-high border border-outline-variant/40 shrink-0">
            <Image
              src={player.avatarUrl}
              alt={player.name}
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-xl"
              priority
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display-lg font-bold text-2xl sm:text-3xl lg:text-4xl text-primary tracking-tight">
                {player.fullName}
              </h1>
              <span className="px-3 py-1 rounded-full bg-surface-bright border border-outline-variant/30 text-xs font-mono-data font-bold text-primary">
                RANK #{player.iccRankings.odi || player.iccRankings.test || 1}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data text-on-surface-variant">
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: player.primaryColor || "#ffffff" }} />
                {player.country} ({player.countryCode})
              </span>
              <span>•</span>
              <span>{player.role}</span>
              <span>•</span>
              <span>{player.battingStyle}</span>
              <span>•</span>
              <span>{player.bowlingStyle}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-surface-container-high border border-outline-variant/20 text-[11px] font-mono-data text-outline">
                TEST #{player.iccRankings.test}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-surface-container-high border border-outline-variant/20 text-[11px] font-mono-data text-outline">
                ODI #{player.iccRankings.odi}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-surface-container-high border border-outline-variant/20 text-[11px] font-mono-data text-outline">
                T20I #{player.iccRankings.t20i}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => toggleFavorite(player.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              bookmarked
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-high text-primary hover:bg-surface-bright border border-outline-variant/30"
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {bookmarked ? "star" : "star_outline"}
            </span>
            <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
          </button>

          <Link
            href={`/compare?playerA=${player.id}`}
            className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-primary border border-outline-variant/30 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">compare_arrows</span>
            <span>Head to Head</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
