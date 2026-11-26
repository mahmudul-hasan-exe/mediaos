"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, ArrowLeft, ArrowRight } from "lucide-react";

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-3">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Two-Factor Authentication
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Enter the 6-digit security verification code from your authenticator app (Google Authenticator, 1Password, Authy).
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <Input
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="text-center font-mono text-xl tracking-widest h-12"
          />
        </div>

        <Button type="submit" disabled={loading || code.length < 6} className="w-full flex items-center justify-center gap-2">
          <span>{loading ? "Verifying..." : "Verify & Continue"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Standard Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

