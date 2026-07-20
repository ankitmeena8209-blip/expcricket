"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 px-4 lg:px-gutter flex items-center justify-between shadow-card-shadow">
      {/* Left Section: Mobile Menu Toggle & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-on-surface-variant hover:text-primary p-2 rounded-lg hover:bg-surface-container-high transition-colors"
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        {/* Global Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search players (Kohli), matches, grounds (MCG)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-12 py-2.5 text-xs lg:text-sm bg-surface-container-low border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
          />
          <div className="hidden sm:flex items-center gap-0.5 absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-surface-container-high text-[10px] font-mono-data text-outline border border-outline-variant/20">
            <span>⌘</span>
            <span>K</span>
          </div>
        </form>
      </div>

      {/* Right Section: Telemetry Ticker & User Account */}
      <div className="flex items-center gap-3">
        {/* Live Match Telemetry Ticker */}
        <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/20 text-xs font-mono-data">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-on-surface-variant uppercase tracking-wider text-[11px]">BORDER-GAVASKAR TROPHY</span>
          <span className="text-primary font-bold">IND vs AUS</span>
        </div>

        {/* Favorites Quick Link */}
        <Link
          href="/favorites"
          className="p-2.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-xl transition-all hidden sm:block"
          title="Saved Bookmarks"
        >
          <span className="material-symbols-outlined text-xl">star</span>
        </Link>

        {/* AI Analyst Shortcut Button */}
        <Link
          href="/ai-analyst"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-xs font-semibold text-primary border border-outline-variant/30 transition-all"
        >
          <span className="material-symbols-outlined text-base text-amber-400">auto_awesome</span>
          <span>AI Analyst</span>
        </Link>

        {/* User Account / Admin Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/20">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-surface-container-high transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-surface-bright to-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary font-bold text-xs shadow-sm">
              XP
            </div>
            <div className="hidden md:block text-left">
              <span className="text-xs font-semibold text-on-surface block leading-tight">
                Analyst Pro
              </span>
              <span className="text-[10px] text-outline font-mono-data block uppercase tracking-wider">
                ADMIN ACCESS
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
