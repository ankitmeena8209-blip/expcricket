"use client";

import React from "react";
import Button from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon = "search_off",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="p-8 text-center bg-surface-container-low/50 border border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center max-w-md mx-auto my-8">
      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-3">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <h3 className="text-base font-headline font-bold text-on-surface mb-1">{title}</h3>
      <p className="text-xs font-mono-data text-outline mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
