"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-md py-8 px-6 lg:px-12 text-on-surface-variant text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Rights */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-headline font-bold text-xs">
              E
            </div>
            <span className="font-headline font-bold text-on-surface tracking-wider">
              {siteConfig.name} <span className="text-outline font-normal">({siteConfig.fullName})</span>
            </span>
          </div>
          <span className="hidden sm:block text-outline-variant">•</span>
          <p className="text-outline">
            © {new Date().getFullYear()} EXP Cricket Intelligence. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono-data">
          {siteConfig.footerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors text-[11px]"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* System Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/30 text-[11px] font-mono-data">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-outline">Engine:</span>
          <span className="text-on-surface font-semibold">Operational v1.0</span>
        </div>
      </div>
    </footer>
  );
}
