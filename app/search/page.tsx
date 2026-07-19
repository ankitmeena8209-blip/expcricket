"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import Badge from "@/components/common/Badge";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import EmptyState from "@/components/common/EmptyState";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const { query, setQuery, results, loading } = useSearch(initialQ);

  return (
    <div className="space-y-8">
      {/* Search Header Input */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
        <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
          Global Cricket Intelligence Search
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
            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-high border border-outline-variant/40 rounded-2xl text-sm font-mono-data text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Results Container */}
      {loading ? (
        <div className="space-y-3">
          <SkeletonLoader className="h-16 w-full" />
          <SkeletonLoader className="h-16 w-full" />
          <SkeletonLoader className="h-16 w-full" />
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-3">
          <span className="text-xs font-mono-data text-outline block">
            FOUND {results.length} MATCHING ENTITIES
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={item.type === "PLAYER" ? "primary" : item.type === "GROUND" ? "tertiary" : "secondary"}>
                      {item.type}
                    </Badge>
                    <h3 className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors">
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
        <EmptyState
          title="No Matching Entities Found"
          description={`We couldn't find any player, ground, or match matching "${query}". Try searching for "Kohli" or "MCG".`}
        />
      ) : (
        <EmptyState
          title="Start Your Intelligence Search"
          description="Type a player name, cricket ground, or match title to inspect detailed analytics telemetry."
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SkeletonLoader className="h-64 w-full" />}>
      <SearchContent />
    </Suspense>
  );
}
