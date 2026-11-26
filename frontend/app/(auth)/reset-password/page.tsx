"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, CheckCircle, ArrowRight } from "lucide-react";
import { mediaosToast } from "@/stores/mediaos-toast-store";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      mediaosToast.error("Passwords do not match. Please re-enter.");
      return;
    }
    setSuccess(true);
    mediaosToast.success("Password updated successfully. Redirecting to sign in...");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Set New Password
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Choose a strong, secure password for your MediaOS editorial account.
        </p>
      </div>

      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-xs">
            <CheckCircle className="h-4 w-4" />
            <span>Password updated successfully!</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Redirecting to sign in screen...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="pl-9 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="pl-9 text-xs"
              />
            </div>
          </div>

          <Button type="submit" className="w-full flex items-center justify-center gap-2">
            <span>Update Password</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
}

