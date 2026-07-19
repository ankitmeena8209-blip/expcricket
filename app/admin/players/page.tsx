"use client";

import React from "react";
import { MOCK_PLAYERS } from "@/lib/mockData/players";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

export default function AdminPlayersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-headline font-bold text-on-surface">Player CRUD Console</h2>
        <Button variant="primary" size="sm" icon="add">Add New Player</Button>
      </div>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">Player Name</th>
                <th className="pb-3 font-semibold">Country</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {MOCK_PLAYERS.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-primary">{p.id}</td>
                  <td className="py-3 font-bold text-on-surface">{p.name}</td>
                  <td className="py-3 text-on-surface-variant">{p.country} ({p.countryCode})</td>
                  <td className="py-3"><Badge variant="outline">{p.role}</Badge></td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" icon="edit">Edit</Button>
                      <Button variant="danger" size="sm" icon="delete">Delete</Button>
                    </div>
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
