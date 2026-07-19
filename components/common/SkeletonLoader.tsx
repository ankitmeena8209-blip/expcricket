import React from "react";

export default function SkeletonLoader({ className = "h-20 w-full" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-surface-container-high/60 rounded-xl border border-outline-variant/20 ${className}`}
    />
  );
}
