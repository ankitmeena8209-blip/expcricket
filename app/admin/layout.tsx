"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Badge from "@/components/common/Badge";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const adminNav = [
    { title: "Overview", href: "/admin", icon: "dashboard" },
    { title: "Players", href: "/admin/players", icon: "person" },
    { title: "Teams", href: "/admin/teams", icon: "groups" },
    { title: "Grounds", href: "/admin/grounds", icon: "stadium" },
    { title: "Matches", href: "/admin/matches", icon: "sports_cricket" },
    { title: "Rankings", href: "/admin/rankings", icon: "leaderboard" },
    { title: "Users", href: "/admin/users", icon: "manage_accounts" },
    { title: "Reports", href: "/admin/reports", icon: "description" },
    { title: "AI Cache", href: "/admin/ai-cache", icon: "memory" },
    { title: "System Logs", href: "/admin/logs", icon: "terminal" },
    { title: "Settings", href: "/admin/settings", icon: "settings" },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Header Banner */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-primary/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-2xl">admin_panel_settings</span>
            <h1 className="font-headline font-black text-2xl lg:text-3xl text-on-surface">
              EXP Cricket Admin Portal
            </h1>
            <Badge variant="primary">SECURE MANAGEMENT</Badge>
          </div>
          <p className="text-xs font-mono-data text-outline">
            CRUD-ready system administration layer prepared for future Supabase RLS integration
          </p>
        </div>

        <Link
          href="/"
          className="text-xs font-mono-data text-primary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Exit to Platform
        </Link>
      </div>

      {/* Admin Navigation Bar */}
      <div className="flex items-center gap-1 overflow-x-auto p-1.5 bg-surface-container-low border border-outline-variant/30 rounded-2xl">
        {adminNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-xl text-xs font-mono-data font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/10"
                  : "text-outline hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Children Page Content */}
      {children}
    </div>
  );
}
