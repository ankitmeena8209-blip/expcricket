"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  const mobileItems = [
    { title: "Home", href: "/", icon: "dashboard" },
    { title: "Players", href: "/player-intelligence", icon: "person" },
    { title: "Grounds", href: "/ground-intelligence", icon: "stadium" },
    { title: "AI Analyst", href: "/ai-analyst", icon: "psychology" },
    { title: "Search", href: "/search", icon: "search" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/30 px-2 py-2 flex items-center justify-around">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-mono-data transition-all ${
              isActive
                ? "text-primary font-bold"
                : "text-outline hover:text-on-surface"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isActive ? "text-primary fill" : ""
              }`}
            >
              {item.icon}
            </span>
            <span>{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
