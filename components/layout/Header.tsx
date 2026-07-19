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
    <header className="sticky top-0 z-30 h-16 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/20 px-4 lg:px-8 flex items-center justify-between">
      {/* Left Section: Mobile Menu & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container"
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Global Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search players (e.g. Kohli), grounds (MCG), teams or matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-2 text-xs lg:text-sm bg-surface-container-low border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
          />
          <div className="hidden sm:flex items-center gap-0.5 absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] font-mono-data text-outline border border-outline-variant/30">
            <span>⌘</span>
            <span>K</span>
          </div>
        </form>
      </div>

      {/* Right Section: Ticker, Actions, Profile */}
      <div className="flex items-center gap-3">
        {/* Live System Ticker */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/30 text-xs font-mono-data">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-on-surface-variant">BORDER-GAVASKAR TROPHY LIVE</span>
          <span className="text-primary font-bold">IND vs AUS</span>
        </div>

        {/* Notifications Icon */}
        <button
          aria-label="System Notifications"
          className="relative p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-all"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-tertiary" />
        </button>

        {/* Favorites Quick Link */}
        <Link
          href="/favorites"
          className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-all hidden sm:block"
          title="Saved Bookmarks"
        >
          <span className="material-symbols-outlined text-xl">star</span>
        </Link>

        {/* User Account Menu */}
        <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/30">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-surface-container transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-secondary-container/40 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs">
              XP
            </div>
            <div className="hidden md:block text-left">
              <span className="text-xs font-semibold text-on-surface block leading-tight">
                Analyst Pro
              </span>
              <span className="text-[10px] text-outline font-mono-data block">
                ADMIN LEVEL
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
