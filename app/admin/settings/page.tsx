"use client";

import React from "react";
import Button from "@/components/common/Button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-headline font-bold text-on-surface">System Configuration Console</h2>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4 max-w-xl">
        <div className="space-y-2">
          <label className="text-xs font-mono-data text-outline block">Active Default AI Provider</label>
          <select className="w-full p-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none">
            <option value="gemini">Google Gemini 1.5 Pro</option>
            <option value="openai">OpenAI GPT-4o</option>
            <option value="grok">xAI Grok 2</option>
          </select>
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
