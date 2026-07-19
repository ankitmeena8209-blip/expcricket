"use client";

import React from "react";
import Button from "@/components/common/Button";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-headline font-bold text-on-surface">Institutional Reports & Export</h2>
        <Button variant="primary" size="sm" icon="download">Export PDF Report</Button>
      </div>

      <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 text-xs font-mono-data text-on-surface-variant">
        📄 Institutional Performance Report: IND vs AUS - Border-Gavaskar Trophy telemetry PDF generated.
      </div>
    </div>
  );
}
