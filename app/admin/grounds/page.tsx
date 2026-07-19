"use client";

import React, { useState, useEffect } from "react";
import { GroundService } from "@/services/groundService";
import { Ground } from "@/types/ground";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import SkeletonLoader from "@/components/common/SkeletonLoader";

export default function AdminGroundsPage() {
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGroundName, setNewGroundName] = useState("");
  const [newGroundCity, setNewGroundCity] = useState("");

  useEffect(() => {
    loadGrounds();
  }, []);

  const loadGrounds = async () => {
    setLoading(true);
    const data = await GroundService.getAllGrounds();
    setGrounds(data);
    setLoading(false);
  };

  const handleAddGround = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroundName.trim()) return;
    const success = await GroundService.createGround({
      name: newGroundName,
      shortName: newGroundName,
      city: newGroundCity || "London",
      country: "England",
      pitchType: "Pace-Friendly",
    });
    if (success) {
      setNewGroundName("");
      setNewGroundCity("");
      loadGrounds();
    } else {
      alert("Note: Added locally. Connect Supabase database to persist.");
      loadGrounds();
    }
  };

  const handleDelete = async (id: string) => {
    await GroundService.deleteGround(id);
    setGrounds((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-headline font-bold text-on-surface">Ground Telemetry Console</h2>
          <p className="text-xs font-mono-data text-outline">Manage stadium profiles, boundary vectors, and pitch surface types.</p>
        </div>
        <Badge variant="tertiary">{grounds.length} VENUES</Badge>
      </div>

      {/* Add Ground Form */}
      <form onSubmit={handleAddGround} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Stadium Name (e.g. Lord's Cricket Ground)"
          value={newGroundName}
          onChange={(e) => setNewGroundName(e.target.value)}
          className="flex-1 p-2.5 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none"
        />
        <input
          type="text"
          placeholder="City (e.g. London)"
          value={newGroundCity}
          onChange={(e) => setNewGroundCity(e.target.value)}
          className="w-full sm:w-48 p-2.5 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none"
        />
        <Button variant="primary" size="sm" type="submit" icon="add">
          Add Ground
        </Button>
      </form>

      {/* Grounds Table */}
      {loading ? (
        <SkeletonLoader className="h-64 w-full" />
      ) : (
        <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
          <table className="w-full text-left text-xs font-mono-data">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase text-[10px]">
                <th className="pb-2">Stadium</th>
                <th className="pb-2">City</th>
                <th className="pb-2">Pitch Type</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 text-on-surface">
              {grounds.map((g) => (
                <tr key={g.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3 font-bold text-on-surface">{g.name}</td>
                  <td className="py-3 text-outline">{g.city}, {g.country}</td>
                  <td className="py-3">
                    <Badge variant="primary">{g.pitchType}</Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(g.id)} icon="delete">
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
