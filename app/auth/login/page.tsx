"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/authService";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import ErrorState from "@/components/common/ErrorState";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const res = await AuthService.login(email, password);
    setLoading(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setErrorMessage(res.error || "Invalid login credentials. Please check your email and password.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 text-primary font-headline font-bold text-xl flex items-center justify-center mx-auto">
          E
        </div>
        <h1 className="font-headline font-bold text-2xl text-on-surface">EXP Cricket Portal</h1>
        <Badge variant="primary">SUPABASE AUTH SECURE LOGIN</Badge>
      </div>

      {errorMessage && <ErrorState message={errorMessage} />}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-mono-data text-outline block">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@expcricket.com"
            disabled={loading}
            className="w-full px-4 py-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none focus:border-primary disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono-data text-outline block">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            className="w-full px-4 py-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-xs font-mono-data text-on-surface focus:outline-none focus:border-primary disabled:opacity-50"
          />
        </div>

        <Button variant="primary" type="submit" className="w-full" disabled={loading} icon="login">
          {loading ? "Authenticating with Supabase..." : "Sign In to Admin Portal"}
        </Button>
      </form>

      <div className="text-center text-xs font-mono-data text-outline">
        <Link href="/auth/forgot-password" className="hover:text-primary transition-colors">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
