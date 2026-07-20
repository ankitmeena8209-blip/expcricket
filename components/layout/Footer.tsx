"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/10 py-12 px-4 lg:px-gutter mt-auto text-on-surface-variant">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Mission */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-bright border border-outline-variant/30 flex items-center justify-center text-primary font-bold text-sm">
              S
            </div>
            <span className="font-display-lg font-bold text-base text-primary tracking-tight">
              Stitch Cricket Pro
            </span>
          </div>
          <p className="text-xs leading-relaxed text-on-surface-variant">
            Precision telemetry, deep pitch analytics, and AI predictive insights for modern cricket teams, coaches, and enthusiasts.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono-data text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Supabase Cloud Connected</span>
          </div>
        </div>

        {/* Intelligence Links */}
        <div>
          <h4 className="text-xs font-mono-data uppercase tracking-wider font-bold text-primary mb-4">
            Intelligence
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/match-analysis" className="hover:text-primary transition-colors">
                Live Match Center
              </Link>
            </li>
            <li>
              <Link href="/player-intelligence" className="hover:text-primary transition-colors">
                Player Intelligence
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-primary transition-colors">
                Head to Head Battles
              </Link>
            </li>
            <li>
              <Link href="/ground-intelligence" className="hover:text-primary transition-colors">
                Ground & Pitch Reports
              </Link>
            </li>
            <li>
              <Link href="/ai-analyst" className="hover:text-primary transition-colors">
                AI Analyst & Predictions
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-mono-data uppercase tracking-wider font-bold text-primary mb-4">
            Resources
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/rankings" className="hover:text-primary transition-colors">
                ICC Rankings
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="hover:text-primary transition-colors">
                Saved Bookmarks
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-primary transition-colors">
                Admin Telemetry Workspace
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                About Platform
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-primary transition-colors">
                FAQ & Help
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div>
          <h4 className="text-xs font-mono-data uppercase tracking-wider font-bold text-primary mb-4">
            Legal & Support
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-primary transition-colors">
                Data Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-10 pt-6 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-outline">
        <p>© {new Date().getFullYear()} Stitch Cricket Pro. All rights reserved.</p>
        <p className="font-mono-data mt-2 sm:mt-0">Built for Vercel & Supabase Platform</p>
      </div>
    </footer>
  );
}
