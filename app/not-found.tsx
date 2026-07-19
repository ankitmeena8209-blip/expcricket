import React from "react";
import Link from "next/link";
import Button from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 text-center space-y-4">
      <span className="material-symbols-outlined text-primary text-4xl">search_off</span>
      <h1 className="font-headline font-black text-3xl text-on-surface">404 - Page Not Found</h1>
      <p className="text-xs font-mono-data text-outline">
        The cricket intelligence resource or entity telemetry page you requested does not exist.
      </p>
      <Link href="/">
        <Button variant="primary">Return to Command Center</Button>
      </Link>
    </div>
  );
}
