"use client";

import React from "react";
import Button from "@/components/common/Button";

export default function OfflinePage() {
  const handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 text-center space-y-4">
      <span className="material-symbols-outlined text-tertiary text-4xl">wifi_off</span>
      <h1 className="font-headline font-bold text-2xl text-on-surface">Network Connection Lost</h1>
      <p className="text-xs font-mono-data text-outline">
        EXP Cricket live telemetry requires an active internet connection. Please check your network connection.
      </p>
      <Button variant="primary" onClick={handleReload}>
        Retry Connection
      </Button>
    </div>
  );
}
