"use client";

import React from "react";
import Button from "@/components/common/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-error-container/20 border border-error/40 text-center space-y-4">
      <span className="material-symbols-outlined text-error text-4xl">error</span>
      <h1 className="font-headline font-black text-2xl text-error">500 - Application Error</h1>
      <p className="text-xs font-mono-data text-on-surface-variant">
        {error.message || "An unexpected error occurred in the telemetry runtime."}
      </p>
      <Button variant="danger" onClick={() => reset()}>
        Reset Runtime
      </Button>
    </div>
  );
}
