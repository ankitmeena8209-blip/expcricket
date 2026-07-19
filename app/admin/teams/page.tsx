"use client";

import React from "react";
import { MOCK_TEAMS } from "@/lib/mockData/teams";
import Button from "@/components/common/Button";

export default function AdminTeamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-headline font-bold text-on-surface">Teams Management Console</h2>
        <Button variant="primary" size="sm" icon="add">Add Team</Button>
      </div>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-3 font-semibold">Code</th>
                <th className="pb-3 font-semibold">Team Name</th>
                <th className="pb-3 font-semibold">Captain</th>
                <th className="pb-3 font-semibold">Coach</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {MOCK_TEAMS.map((t) => (
                <tr key={t.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-primary">{t.code}</td>
                  <td className="py-3 font-bold text-on-surface">{t.name}</td>
                  <td className="py-3 text-on-surface-variant">{t.captain}</td>
                  <td className="py-3 text-on-surface-variant">{t.coach}</td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm" icon="edit">Edit</Button>
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
