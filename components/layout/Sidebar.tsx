"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-surface/95 backdrop-blur-2xl border-r border-outline-variant/20 transition-transform duration-300 flex flex-col justify-between ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-outline-variant/10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-surface-bright border border-outline-variant/40 flex items-center justify-center text-primary font-bold text-lg group-hover:border-primary/60 transition-all shadow-card-shadow">
              S
            </div>
            <div>
              <span className="font-display-lg font-bold text-lg tracking-tight text-primary block leading-none">
                Stitch <span className="text-secondary">Pro</span>
              </span>
              <span className="text-[10px] font-mono-data text-outline tracking-widest block mt-1 uppercase">
                DEEP ANALYTICS
              </span>
            </div>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-on-surface-variant hover:text-primary p-1 rounded-lg"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="px-3 py-2 text-[10px] font-mono-data font-semibold text-outline uppercase tracking-wider">
            Telemetry Dashboard
          </div>
          {siteConfig.mainNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-surface-container-high text-primary font-semibold border-l-2 border-primary shadow-sm"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-xl ${
                      isActive ? "text-primary fill" : "text-outline"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-mono-data font-bold rounded ${
                      item.badge === "LIVE"
                        ? "bg-rose-500/20 text-rose-300 animate-pulse"
                        : item.badge === "AI PRO"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Upgrade & Pro Status Widget */}
      <div className="p-4 border-t border-outline-variant/10 bg-surface-container-lowest">
        <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono-data font-bold uppercase tracking-wider text-outline">
              Telemetry Engine
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <p className="text-xs font-semibold text-primary mb-1">
            F1-Precision Predictive Models
          </p>
          <p className="text-[11px] text-on-surface-variant mb-3 leading-relaxed">
            Real-time pitch telemetry & player matchup matrix active.
          </p>
          <Link
            href="/ai-analyst"
            className="w-full py-2 px-3 bg-surface-bright hover:bg-surface-container-highest text-primary font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 border border-outline-variant/30"
          >
            <span>Launch AI Hub</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
