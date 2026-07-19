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
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-surface-container-lowest/95 backdrop-blur-xl border-r border-outline-variant/30 transition-transform duration-300 flex flex-col justify-between ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-outline-variant/20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-headline font-bold text-lg group-hover:shadow-[0_0_15px_rgba(75,226,119,0.4)] transition-all">
              E
            </div>
            <div>
              <span className="font-headline font-black text-lg tracking-wider text-on-surface uppercase block leading-none">
                EXP <span className="text-primary">CRICKET</span>
              </span>
              <span className="text-[10px] font-mono-data text-outline tracking-widest block mt-0.5">
                XPERT ANALYTICS
              </span>
            </div>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-on-surface-variant hover:text-on-surface"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          <div className="px-3 py-2 text-[11px] font-mono-data font-semibold text-outline uppercase tracking-wider">
            Main Intelligence
          </div>
          {siteConfig.mainNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-surface-container-high text-primary font-semibold border-l-2 border-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60"
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
                    className={`px-1.5 py-0.5 text-[10px] font-mono-data font-bold rounded ${
                      item.badge === "LIVE"
                        ? "bg-error/20 text-error animate-pulse"
                        : item.badge === "AI PRO"
                        ? "bg-tertiary-container/30 text-tertiary"
                        : "bg-primary-container/30 text-primary"
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

      {/* Upgrade & Status Widget */}
      <div className="p-4 border-t border-outline-variant/20 bg-surface-container-low/40">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-surface-container-high to-surface-container border border-primary/20 text-center relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-center gap-1.5 text-primary text-xs font-semibold mb-1">
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            PRO ACCESS ACTIVE
          </div>
          <p className="text-[11px] text-on-surface-variant mb-3">
            Real-time Pitch & Match Predictive Models Loaded.
          </p>
          <Link
            href="/ai-analyst"
            className="w-full py-1.5 px-3 bg-primary hover:bg-primary-fixed text-on-primary font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1 shadow-md shadow-primary/10"
          >
            Launch AI Assistant
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
