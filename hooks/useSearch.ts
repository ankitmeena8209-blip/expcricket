"use client";

import { useState, useEffect } from "react";
import { SearchService, SearchResultItem } from "@/services/searchService";

export function useSearch(initialQuery: string = "") {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function performSearch() {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = await SearchService.globalSearch(query);
        if (isMounted) setResults(data);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    const timer = setTimeout(performSearch, 200);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  return { query, setQuery, results, loading };
}
