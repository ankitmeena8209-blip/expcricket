"use client";

import React from "react";
import Button from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "An unexpected error occurred while loading cricket telemetry.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="p-6 bg-error-container/20 border border-error/40 rounded-2xl flex items-center justify-between gap-4 my-4">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-error text-2xl">warning</span>
        <div>
          <h4 className="text-xs font-mono-data font-bold text-error uppercase tracking-wider">
            System Alert
          </h4>
          <p className="text-xs text-on-surface-variant mt-0.5">{message}</p>
        </div>
      </div>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry} icon="refresh">
          Retry
        </Button>
      )}
    </div>
  );
}
