"use client";

import { useState, useEffect } from "react";
import { Ground } from "@/types/ground";
import { GroundService } from "@/services/groundService";

export function useGround(id?: string) {
  const [ground, setGround] = useState<Ground | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await GroundService.getGroundById(id || "mcg");
        if (isMounted) setGround(data);
      } catch (err) {
        if (isMounted) setError("Failed to load ground intelligence data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { ground, loading, error };
}
