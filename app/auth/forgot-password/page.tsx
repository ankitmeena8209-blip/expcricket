import React from "react";
import Link from "next/link";
import Button from "@/components/common/Button";

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 text-center space-y-4">
      <h1 className="font-headline font-bold text-xl text-on-surface">Password Recovery</h1>
      <p className="text-xs font-mono-data text-outline">
        Enter your administrative email address to receive password reset telemetry token.
      </p>
      <input
        type="email"
        placeholder="admin@expcricket.com"
        className="w-full px-4 py-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none"
      />
      <Button variant="primary" className="w-full">Send Recovery Link</Button>
      <Link href="/auth/login" className="block text-xs font-mono-data text-outline hover:text-primary">
        Back to Login
      </Link>
    </div>
  );
}
