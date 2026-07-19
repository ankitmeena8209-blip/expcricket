import React from "react";
import Link from "next/link";
import Button from "@/components/common/Button";

export default function UnauthorizedPage() {
  return (
    <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-surface-container-low border border-error/40 text-center space-y-4">
      <span className="material-symbols-outlined text-error text-4xl">gavel</span>
      <h1 className="font-headline font-bold text-2xl text-on-surface">403 - Access Denied</h1>
      <p className="text-xs font-mono-data text-outline">
        You do not have institutional privileges to view this administrative resource.
      </p>
      <Link href="/">
        <Button variant="primary">Return to Command Center</Button>
      </Link>
    </div>
  );
}
