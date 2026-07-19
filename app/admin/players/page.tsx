"use client";

import React, { useState, useEffect } from "react";
import { PlayerService } from "@/services/playerService";
import { StorageService } from "@/services/storageService";
import { Player } from "@/types/player";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import SkeletonLoader from "@/components/common/SkeletonLoader";

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerCountry, setNewPlayerCountry] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    setLoading(true);
    const data = await PlayerService.getAllPlayers();
    setPlayers(data);
    setLoading(false);
  };

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    setUploading(true);
    let avatarUrl: string | undefined = undefined;

    if (selectedFile) {
      const uploaded = await StorageService.uploadImage("player-avatars", selectedFile);
      if (uploaded) avatarUrl = uploaded;
    }

    const success = await PlayerService.createPlayer({
      name: newPlayerName,
      fullName: newPlayerName,
      country: newPlayerCountry || "India",
      countryCode: (newPlayerCountry || "IND").slice(0, 3).toUpperCase(),
      role: "BATTER",
      battingStyle: "Right-hand bat",
      bowlingStyle: "Right-arm medium",
      avatarUrl: avatarUrl || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80",
    });

    setUploading(false);
    if (success) {
      setNewPlayerName("");
      setNewPlayerCountry("");
      setSelectedFile(null);
      loadPlayers();
    } else {
      alert("Note: Added locally. Connect Supabase database to persist.");
      loadPlayers();
    }
  };

  const handleDelete = async (id: string) => {
    await PlayerService.deletePlayer(id);
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-headline font-bold text-on-surface">Players Telemetry Repository</h2>
          <p className="text-xs font-mono-data text-outline">Manage player profiles, career statistics, and matchup matrices.</p>
        </div>
        <Badge variant="primary">{players.length} PLAYERS</Badge>
      </div>

      {/* Add Player Form with Supabase Storage File Upload */}
      <form onSubmit={handleAddPlayer} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Player Full Name (e.g. Jasprit Bumrah)"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            disabled={uploading}
            className="flex-1 p-2.5 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none"
          />
          <input
            type="text"
            placeholder="Country (e.g. India)"
            value={newPlayerCountry}
            onChange={(e) => setNewPlayerCountry(e.target.value)}
            disabled={uploading}
            className="w-full sm:w-48 p-2.5 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono-data text-outline">Avatar Image (Supabase Storage):</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="text-xs font-mono-data text-outline file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-surface-container-high file:text-on-surface hover:file:bg-surface-variant cursor-pointer"
            />
          </div>

          <Button variant="primary" size="sm" type="submit" disabled={uploading || !newPlayerName.trim()} icon="upload">
            {uploading ? "Uploading to Storage..." : "Add Player to Supabase"}
          </Button>
        </div>
      </form>

      {/* Players List Table */}
      {loading ? (
        <SkeletonLoader className="h-64 w-full" />
      ) : (
        <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-2">Name</th>
                <th className="pb-2">Country</th>
                <th className="pb-2">Role</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {players.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-on-surface">{p.name}</td>
                  <td className="py-3 text-outline">{p.country}</td>
                  <td className="py-3">
                    <Badge variant="secondary">{p.role}</Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)} icon="delete">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
