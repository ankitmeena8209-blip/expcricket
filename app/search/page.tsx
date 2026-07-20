"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import SkeletonLoader from "@/components/common/SkeletonLoader";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const { query, setQuery, results, loading } = useSearch(initialQ);

  return (
    <div className="space-y-8">
      {/* Search Header Input */}
      <div className="p-6 lg:p-8 rounded-3xl glass-panel border border-outline-variant/30 space-y-4">
        <h1 className="font-display-lg font-bold text-2xl lg:text-3xl text-primary">
          Global Telemetry Search
        </h1>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-2xl pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search players (e.g. Virat Kohli), grounds (MCG), or matches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-high border border-outline-variant/30 rounded-2xl text-xs font-mono-data text-primary placeholder:text-outline focus:outline-none focus:border-primary/60 transition-all"
          />
        </div>
      </div>

      {/* Results Container */}
      {loading ? (
        <div className="space-y-3">
          <SkeletonLoader className="h-16 w-full rounded-2xl" />
          <SkeletonLoader className="h-16 w-full rounded-2xl" />
          <SkeletonLoader className="h-16 w-full rounded-2xl" />
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <span className="text-xs font-mono-data font-bold text-outline uppercase tracking-wider block">
            Found {results.length} Matching Telemetry Entities
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="p-5 rounded-2xl glass-card border border-outline-variant/30 hover:border-primary/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-surface-bright border border-outline-variant/20 text-[10px] font-mono-data font-bold text-primary">
                      {item.type}
                    </span>
                    <h3 className="font-display-lg font-bold text-base text-primary group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs font-mono-data text-outline">{item.subtitle}</p>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : query.trim() ? (
        <div className="p-10 rounded-3xl glass-panel border border-outline-variant/30 text-center space-y-2">
          <h3 className="font-display-lg font-bold text-lg text-primary">No Matching Entities Found</h3>
          <p className="text-xs font-mono-data text-outline">
            We couldn't find any player, ground, or match matching "{query}". Try searching for "Kohli" or "MCG".
          </p>
        </div>
      ) : (
        <div className="p-10 rounded-3xl glass-panel border border-outline-variant/30 text-center space-y-2">
          <h3 className="font-display-lg font-bold text-lg text-primary">Start Your Search Query</h3>
          <p className="text-xs font-mono-data text-outline">
            Type a player name, cricket ground, or match title to inspect detailed analytics telemetry.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-64 w-full rounded-3xl" />}>
      <SearchContent />
    </Suspense>
  );
}
