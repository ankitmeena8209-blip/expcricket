"use client";

import React from "react";
import Button from "@/components/common/Button";

export default function AdminRankingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-headline font-bold text-on-surface">Rankings Management Console</h2>
        <Button variant="primary" size="sm" icon="sync">Sync Official ICC Ratings</Button>
      </div>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 text-xs font-mono-data text-on-surface-variant">
        💡 Rankings points update automatically based on player match performances and weightage algorithms.
      </div>
    </div>
  );
}
