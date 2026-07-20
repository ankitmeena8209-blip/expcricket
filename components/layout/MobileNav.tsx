"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 px-2 py-2 flex items-center justify-around">
      {siteConfig.mainNav.slice(0, 5).map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
              isActive
                ? "text-primary font-semibold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isActive ? "fill text-primary" : "text-outline"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-medium leading-none">
              {item.title.split(" ")[0]}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
