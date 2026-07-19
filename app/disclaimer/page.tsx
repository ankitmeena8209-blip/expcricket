"use client";

import React from "react";

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
      <h1 className="font-headline font-bold text-2xl text-on-surface">Legal Disclaimer</h1>
      <p className="text-xs font-mono-data text-outline leading-relaxed">
        EXP Cricket predictions and AI analyst outputs are generated for statistical research purposes. Match win probabilities and fantasy projections do not guarantee outcome certainty.
      </p>
    </div>
  );
}
