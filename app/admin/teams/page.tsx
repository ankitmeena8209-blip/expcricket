"use client";

import React, { useState, useEffect } from "react";
import { TeamService } from "@/services/teamService";
import { Team } from "@/types/team";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import SkeletonLoader from "@/components/common/SkeletonLoader";

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    setLoading(true);
    const data = await TeamService.getAllTeams();
    setTeams(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await TeamService.deleteTeam(id);
    setTeams((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-headline font-bold text-on-surface">National Teams Console</h2>
          <p className="text-xs font-mono-data text-outline">Manage international teams, rankings, and head-to-head records.</p>
        </div>
        <Badge variant="primary">{teams.length} TEAMS</Badge>
      </div>

      {loading ? (
        <SkeletonLoader className="h-64 w-full" />
      ) : (
        <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-2">Team</th>
                <th className="pb-2">Code</th>
                <th className="pb-2">Captain</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {teams.map((t) => (
                <tr key={t.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-on-surface flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.primaryColor }} />
                    {t.name}
                  </td>
                  <td className="py-3 text-outline">{t.code}</td>
                  <td className="py-3 text-on-surface-variant">{t.captain}</td>
                  <td className="py-3 text-right">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(t.id)} icon="delete">
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
