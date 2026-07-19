"use client";

import React from "react";
import { MOCK_MATCHES } from "@/lib/mockData/matches";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

export default function AdminMatchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-headline font-bold text-on-surface">Matches Management Console</h2>
        <Button variant="primary" size="sm" icon="add">Create Match</Button>
      </div>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-3 font-semibold">Title</th>
                <th className="pb-3 font-semibold">Format</th>
                <th className="pb-3 font-semibold">Teams</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {MOCK_MATCHES.map((m) => (
                <tr key={m.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-on-surface">{m.title}</td>
                  <td className="py-3 text-outline">{m.format}</td>
                  <td className="py-3 font-bold text-primary">{m.teamA.code} vs {m.teamB.code}</td>
                  <td className="py-3"><Badge variant={m.status === "LIVE" ? "error" : "primary"}>{m.status}</Badge></td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm" icon="edit">Edit Scorecard</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
