"use client";

import React, { useState, useEffect } from "react";
import { MatchService } from "@/services/matchService";
import { Match } from "@/types/match";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import SkeletonLoader from "@/components/common/SkeletonLoader";

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    setLoading(true);
    const data = await MatchService.getAllMatches();
    setMatches(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await MatchService.deleteMatch(id);
    setMatches((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-headline font-bold text-on-surface">Matches & Scorecard Control</h2>
          <p className="text-xs font-mono-data text-outline">Manage live matches, scorecard inputs, and probability timelines.</p>
        </div>
        <Badge variant="primary">{matches.length} MATCHES</Badge>
      </div>

      {loading ? (
        <SkeletonLoader className="h-64 w-full" />
      ) : (
        <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-2">Match Title</th>
                <th className="pb-2">Series</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {matches.map((m) => (
                <tr key={m.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-on-surface">{m.title}</td>
                  <td className="py-3 text-outline">{m.series}</td>
                  <td className="py-3">
                    <Badge variant={m.status === "LIVE" ? "error" : "primary"}>{m.status}</Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(m.id)} icon="delete">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
