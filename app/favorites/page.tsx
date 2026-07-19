"use client";

import React from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { MOCK_PLAYERS } from "@/lib/mockData/players";
import { MOCK_GROUNDS } from "@/lib/mockData/grounds";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import EmptyState from "@/components/common/EmptyState";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoritePlayers = MOCK_PLAYERS.filter((p) => favorites.includes(p.id));
  const favoriteGrounds = MOCK_GROUNDS.filter((g) => favorites.includes(g.id));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-2xl">star</span>
            <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
              Favorites & Saved Bookmarks
            </h1>
            <Badge variant="primary">{favorites.length} SAVED</Badge>
          </div>
          <p className="text-xs font-mono-data text-outline">
            Quick access to your pinned players, grounds, and tactical analysis profiles
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="No Saved Bookmarks Yet"
          description="Bookmark your favorite players or grounds to view quick stats and predictive pitch reports here."
        />
      ) : (
        <div className="space-y-6">
          {/* Saved Players */}
          {favoritePlayers.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">person</span>
                SAVED PLAYER PROFILES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritePlayers.map((player) => (
                  <div
                    key={player.id}
                    className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-headline font-bold text-base text-on-surface">
                          {player.name}
                        </span>
                        <button
                          onClick={() => toggleFavorite(player.id)}
                          className="text-primary hover:text-error transition-colors"
                          title="Remove bookmark"
                        >
                          <span className="material-symbols-outlined fill text-xl">star</span>
                        </button>
                      </div>
                      <p className="text-xs font-mono-data text-outline mb-3">
                        {player.country} • {player.role}
                      </p>
                    </div>

                    <Link href={`/player-intelligence?id=${player.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Inspect Profile
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Grounds */}
          {favoriteGrounds.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono-data font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">stadium</span>
                SAVED CRICKET GROUNDS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteGrounds.map((ground) => (
                  <div
                    key={ground.id}
                    className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-headline font-bold text-base text-on-surface">
                          {ground.name}
                        </span>
                        <button
                          onClick={() => toggleFavorite(ground.id)}
                          className="text-primary hover:text-error transition-colors"
                          title="Remove bookmark"
                        >
                          <span className="material-symbols-outlined fill text-xl">star</span>
                        </button>
                      </div>
                      <p className="text-xs font-mono-data text-outline mb-3">
                        {ground.city}, {ground.country} • {ground.pitchType}
                      </p>
                    </div>

                    <Link href={`/ground-intelligence?id=${ground.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Ground Report
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
