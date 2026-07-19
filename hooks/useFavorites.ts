"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("exp_favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites(["virat-kohli", "mcg"]); // Default bookmarks
      }
    } catch {
      setFavorites(["virat-kohli", "mcg"]);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("exp_favorites", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save favorites:", err);
      }
      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
