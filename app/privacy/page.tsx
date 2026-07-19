import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 space-y-4">
      <h1 className="font-headline font-bold text-2xl text-on-surface">Privacy Policy</h1>
      <p className="text-xs font-mono-data text-outline leading-relaxed">
        EXP Cricket respects user data security. API keys, credentials, and session tokens are strictly processed server-side and never exposed to client-side browser runtimes.
      </p>
    </div>
  );
}
