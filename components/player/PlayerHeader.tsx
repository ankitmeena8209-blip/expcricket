"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Player } from "@/types/player";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { useFavorites } from "@/hooks/useFavorites";

interface PlayerHeaderProps {
  player: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const bookmarked = isFavorite(player.id);

  return (
    <div
      className="p-6 lg:p-8 rounded-3xl relative overflow-hidden border border-outline-variant/30 shadow-2xl transition-all"
      style={{
        background: `linear-gradient(135deg, ${player.primaryColor}22 0%, #111317 70%, #1a1c20 100%)`,
      }}
    >
      {/* Dynamic Background Glow Accent */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ backgroundColor: player.primaryColor }}
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        {/* Left: Avatar & Meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div
            className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl p-1 relative overflow-hidden shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${player.primaryColor}, ${player.accentColor})`,
            }}
          >
            <Image
              src={player.avatarUrl}
              alt={player.name}
              width={112}
              height={112}
              className="w-full h-full object-cover rounded-xl"
              priority
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-headline font-black text-2xl lg:text-3xl text-on-surface tracking-tight">
                {player.fullName}
              </span>
              <Badge variant="primary">
                RANK #{player.iccRankings.odi || player.iccRankings.test || 1}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data text-on-surface-variant">
              <span className="flex items-center gap-1 font-semibold text-on-surface">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: player.primaryColor }} />
                {player.country} ({player.countryCode})
              </span>
              <span>•</span>
              <span>{player.role}</span>
              <span>•</span>
              <span>{player.battingStyle}</span>
              <span>•</span>
              <span>{player.bowlingStyle}</span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary">TEST RANK #{player.iccRankings.test}</Badge>
              <Badge variant="tertiary">ODI RANK #{player.iccRankings.odi}</Badge>
              <Badge variant="outline">T20I RANK #{player.iccRankings.t20i}</Badge>
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant={bookmarked ? "primary" : "secondary"}
            size="sm"
            icon={bookmarked ? "star" : "star_outline"}
            onClick={() => toggleFavorite(player.id)}
          >
            {bookmarked ? "Bookmarked" : "Bookmark Player"}
          </Button>

          <Link href={`/compare?playerA=${player.id}`}>
            <Button variant="outline" size="sm" icon="compare_arrows">
              Compare
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
