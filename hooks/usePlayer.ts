"use client";

import { useState, useEffect } from "react";
import { Player } from "@/types/player";
import { PlayerService } from "@/services/playerService";

export function usePlayer(id?: string) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        console.log(`[usePlayer Hook] Loading player data for ID param: "${id || 'default'}"`);
        const data = await PlayerService.getPlayerById(id || "");
        if (isMounted) setPlayer(data);
      } catch (err) {
        console.error("[usePlayer Hook] Error loading player analytics:", err);
        if (isMounted) setError("Failed to load player analytics data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { player, loading, error };
}
