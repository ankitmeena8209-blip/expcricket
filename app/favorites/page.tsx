"use client";

import React from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { MOCK_PLAYERS } from "@/lib/mockData/players";
import { MOCK_GROUNDS } from "@/lib/mockData/grounds";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoritePlayers = MOCK_PLAYERS.filter((p) => favorites.includes(p.id));
  const favoriteGrounds = MOCK_GROUNDS.filter((g) => favorites.includes(g.id));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-amber-400 text-2xl">star</span>
            <h1 className="font-display-lg font-bold text-2xl lg:text-3xl text-primary">
              Saved Bookmarks & Telemetry Profiles
            </h1>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono-data font-bold">
              {favorites.length} SAVED
            </span>
          </div>
          <p className="text-xs font-mono-data text-outline">
            Quick access to your pinned players, grounds, and tactical profiles.
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="p-12 rounded-3xl glass-panel border border-outline-variant/30 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-surface-bright border border-outline-variant/30 text-amber-400 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">star_outline</span>
          </div>
          <h3 className="font-display-lg font-bold text-xl text-primary">No Saved Bookmarks Yet</h3>
          <p className="text-xs font-mono-data text-outline max-w-md mx-auto">
            Bookmark your favorite players or grounds to view quick stats and telemetry reports here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Saved Players */}
          {favoritePlayers.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display-lg font-bold text-base text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">person</span>
                Saved Player Profiles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritePlayers.map((player) => (
                  <div
                    key={player.id}
                    className="p-5 rounded-2xl glass-card border border-outline-variant/30 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display-lg font-bold text-base text-primary">
                          {player.name}
                        </span>
                        <button
                          onClick={() => toggleFavorite(player.id)}
                          className="text-amber-400 hover:text-rose-300 transition-colors"
                          title="Remove bookmark"
                        >
                          <span className="material-symbols-outlined fill text-xl">star</span>
                        </button>
                      </div>
                      <p className="text-xs font-mono-data text-outline mb-4">
                        {player.country} • {player.role}
                      </p>
                    </div>

                    <Link
                      href={`/player-intelligence?id=${player.id}`}
                      className="w-full py-2 px-3 bg-surface-container-high hover:bg-surface-bright text-primary border border-outline-variant/30 rounded-xl text-xs font-semibold text-center block transition-all"
                    >
                      Inspect Profile
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Grounds */}
          {favoriteGrounds.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display-lg font-bold text-base text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">stadium</span>
                Saved Cricket Grounds
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteGrounds.map((ground) => (
                  <div
                    key={ground.id}
                    className="p-5 rounded-2xl glass-card border border-outline-variant/30 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display-lg font-bold text-base text-primary">
                          {ground.name}
                        </span>
                        <button
                          onClick={() => toggleFavorite(ground.id)}
                          className="text-amber-400 hover:text-rose-300 transition-colors"
                          title="Remove bookmark"
                        >
                          <span className="material-symbols-outlined fill text-xl">star</span>
                        </button>
                      </div>
                      <p className="text-xs font-mono-data text-outline mb-4">
                        {ground.city}, {ground.country} • {ground.pitchType}
                      </p>
                    </div>

                    <Link
                      href={`/ground-intelligence?id=${ground.id}`}
                      className="w-full py-2 px-3 bg-surface-container-high hover:bg-surface-bright text-primary border border-outline-variant/30 rounded-xl text-xs font-semibold text-center block transition-all"
                    >
                      Ground Report
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
