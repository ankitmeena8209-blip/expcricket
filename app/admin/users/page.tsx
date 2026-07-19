"use client";

import React from "react";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

export default function AdminUsersPage() {
  const mockUsers = [
    { id: "usr_1", username: "analyst_pro", role: "SUPER_ADMIN", email: "analyst@expcricket.com", status: "ACTIVE" },
    { id: "usr_2", username: "cricket_scout", role: "ANALYST", email: "scout@expcricket.com", status: "ACTIVE" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-headline font-bold text-on-surface">User Management & Permissions</h2>
        <Button variant="primary" size="sm" icon="person_add">Invite Analyst</Button>
      </div>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-3 font-semibold">User ID</th>
                <th className="pb-3 font-semibold">Username</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {mockUsers.map((u) => (
                <tr key={u.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-outline">{u.id}</td>
                  <td className="py-3 font-bold text-primary">{u.username}</td>
                  <td className="py-3"><Badge variant="primary">{u.role}</Badge></td>
                  <td className="py-3 text-on-surface-variant">{u.email}</td>
                  <td className="py-3 text-right font-bold text-primary">{u.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
