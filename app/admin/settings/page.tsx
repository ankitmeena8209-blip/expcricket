"use client";

import React from "react";
import Button from "@/components/common/Button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-headline font-bold text-on-surface">System Configuration Console</h2>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4 max-w-xl">
        <div className="space-y-2">
          <label className="text-xs font-mono-data text-outline block">Active Dedicated AI Engine</label>
          <div className="p-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-primary font-bold flex items-center justify-between">
            <span>Groq Llama 3.3 70B Engine</span>
            <span className="text-[10px] text-outline uppercase font-semibold">ACTIVE</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono-data text-outline block">Supabase Anon URL (From env)</label>
          <input
            type="text"
            readOnly
            value={process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"}
            className="w-full p-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-outline"
          />
        </div>

        <Button variant="primary" size="sm" icon="save">Save Configurations</Button>
      </div>
    </div>
  );
}
