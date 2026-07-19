"use client";

import React, { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { AdminUser } from "@/types/admin";
import Badge from "@/components/common/Badge";
import SkeletonLoader from "@/components/common/SkeletonLoader";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        if (data && !error && data.length > 0) {
          const mapped: AdminUser[] = data.map((item) => ({
            id: item.id,
            username: item.username || item.full_name || item.email,
            email: item.email,
            role: item.role || "USER",
            lastLogin: item.updated_at || item.created_at,
            status: item.status || "ACTIVE",
          }));
          setUsers(mapped);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Supabase profiles query fallback:", err);
      }
    }

    setUsers([
      { id: "usr_admin_01", username: "EXP Analyst Pro", email: "admin@expcricket.com", role: "SUPER_ADMIN", lastLogin: new Date().toISOString(), status: "ACTIVE" },
      { id: "usr_analyst_02", username: "Senior Telemetry Lead", email: "analyst@expcricket.com", role: "ANALYST", lastLogin: new Date(Date.now() - 86400000).toISOString(), status: "ACTIVE" },
    ]);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-headline font-bold text-on-surface">User Profiles & Role Permissions</h2>
          <p className="text-xs font-mono-data text-outline">Manage user access privileges, roles, and status from Supabase Auth.</p>
        </div>
        <Badge variant="primary">{users.length} PROFILES</Badge>
      </div>

      {loading ? (
        <SkeletonLoader className="h-64 w-full" />
      ) : (
        <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-2">User</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
                <th className="pb-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-on-surface">{u.username}</td>
                  <td className="py-3 text-outline">{u.email}</td>
                  <td className="py-3">
                    <Badge variant={u.role === "SUPER_ADMIN" ? "primary" : "secondary"}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-primary font-bold text-[11px]">{u.status}</span>
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
