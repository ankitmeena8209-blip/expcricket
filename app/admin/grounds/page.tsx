"use client";

import React from "react";
import { MOCK_GROUNDS } from "@/lib/mockData/grounds";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

export default function AdminGroundsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-headline font-bold text-on-surface">Ground Telemetry Console</h2>
        <Button variant="primary" size="sm" icon="add">Add Venue</Button>
      </div>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-3 font-semibold">Venue Name</th>
                <th className="pb-3 font-semibold">City / Country</th>
                <th className="pb-3 font-semibold">Pitch Type</th>
                <th className="pb-3 font-semibold text-right">Capacity</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {MOCK_GROUNDS.map((g) => (
                <tr key={g.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-on-surface">{g.name}</td>
                  <td className="py-3 text-on-surface-variant">{g.city}, {g.country}</td>
                  <td className="py-3"><Badge variant="tertiary">{g.pitchType}</Badge></td>
                  <td className="py-3 text-right font-bold text-primary">{g.capacity.toLocaleString()}</td>
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
