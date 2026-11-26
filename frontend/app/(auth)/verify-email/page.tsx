"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";


function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, verifyEmail } = useAuthStore();

  const urlToken = searchParams.get("token") || "";

  // Helper to reliably resolve the current reader email across reloads
  const resolveTargetEmail = () => {
    if (typeof window !== "undefined") {
      const fromParam = searchParams.get("email");
      const fromSession = sessionStorage.getItem("mediaos_verify_email");
      const fromLocal = localStorage.getItem("mediaos_verify_email");
      const fromStore = user?.email;
      return (fromParam || fromSession || fromLocal || fromStore || "").trim();
    }
    return (searchParams.get("email") || user?.email || "").trim();
  };

  const [code, setCode] = useState("");
  const [email, setEmail] = useState(() => resolveTargetEmail());
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [autoVerifying, setAutoVerifying] = useState(!!urlToken);

  // Calculate remaining time from persistent timestamp in sessionStorage
  const getRemainingTime = (targetEmail: string) => {
    if (typeof window === "undefined") return 120;
    try {
      const validEmail = targetEmail || resolveTargetEmail() || "default";
      const key = `mediaos_otp_expiry_${validEmail}`;
      const savedExpiry = sessionStorage.getItem(key);
      if (savedExpiry) {
        const diff = Math.floor((parseInt(savedExpiry, 10) - Date.now()) / 1000);
        return diff > 0 ? diff : 0;
      }
      // Initialize new 120-second session expiry
      const newExpiry = Date.now() + 120 * 1000;
      sessionStorage.setItem(key, newExpiry.toString());
      return 120;
    } catch {
      return 120;
    }
  };

  const [timeLeft, setTimeLeft] = useState(120);

  // Sync email and persistent timer on initial mount
  useEffect(() => {
    const resolved = resolveTargetEmail();
    if (resolved) {
      if (email !== resolved) setEmail(resolved);
      try {
        sessionStorage.setItem("mediaos_verify_email", resolved);
        localStorage.setItem("mediaos_verify_email", resolved);
      } catch { }
    }

    const remaining = getRemainingTime(resolved);
    setTimeLeft(remaining);
  }, [searchParams, user?.email]);

  // 120-second OTP countdown timer (persists across page reloads)
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      const target = email || resolveTargetEmail();
      const remaining = getRemainingTime(target);
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, email, user?.email]);

  // Auto-verify if token is present in URL
  useEffect(() => {
    if (urlToken) {
      const target = resolveTargetEmail();
      setAutoVerifying(true);
      verifyEmail({ token: urlToken, email: target })
        .then(() => {
          setSuccess("Email verified successfully! You are now an official Verified Reader.");
          setTimeout(() => router.push("/"), 1500);
        })
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : "Verification token is invalid or has expired.");
        })
        .finally(() => {
          setAutoVerifying(false);
        });
    }
  }, [urlToken, verifyEmail, router]);

  // Handle manual 6-digit code submit
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || code.trim().length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    if (timeLeft <= 0) {
      setError("This verification code has expired (120-second limit). Please click Resend below for a new code.");
      return;
    }

    const targetEmail = (email.trim() || resolveTargetEmail()).trim();
    if (!targetEmail) {
      setError("No user email found. Please login or register again.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await verifyEmail({
        email: targetEmail,
        code: code.trim(),
      });
      setSuccess("Congratulations! Your email has been verified. Welcome to Verified Readers.");
      setTimeout(() => router.push("/"), 1400);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid or expired verification code.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend with 120s timer reset in persistent storage
  const handleResend = async () => {
    if (timeLeft > 0) {
      setError(`Please wait ${timeLeft}s before requesting a new code.`);
      return;
    }

    const targetEmail = (email.trim() || resolveTargetEmail()).trim();
    if (!targetEmail) {
      setError("No user email found. Please login or register again.");
      return;
    }

    setResending(true);
    setError("");
    setSuccess("");

    try {
      const msg = await authService.resendVerification(targetEmail);
      setSuccess(msg);
      // Reset expiry timestamp in sessionStorage to 120s from now
      try {
        const key = `mediaos_otp_expiry_${targetEmail || "default"}`;
        const newExpiry = Date.now() + 120 * 1000;
        sessionStorage.setItem(key, newExpiry.toString());
      } catch { }
      setTimeLeft(120);
      setCode("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  if (autoVerifying) {
    return (
      <div className="space-y-6 py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
            <span>Verifying Reader Account...</span>
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            Validating secure token. Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Consistent Header Pattern */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Verify Your Reader Email
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          We dispatched a 6-digit verification code to{" "}
          <strong suppressHydrationWarning className="font-semibold text-zinc-800 dark:text-zinc-200">
            {email || resolveTargetEmail() || "your email address"}
          </strong>. Enter it below to activate your account.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {/* Main Verification Form */}
      <form onSubmit={handleVerifyCode} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
            6-Digit Verification Code
          </label>
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="pl-10 font-mono text-base tracking-[0.25em] font-bold h-10 text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* Resend Action Row (Countdown persists smoothly on refresh) */}
        <div className="flex items-center justify-end text-xs pt-0.5">
          <button
            type="button"
            onClick={handleResend}
            disabled={resending || timeLeft > 0}
            className={`text-xs font-semibold inline-flex items-center gap-1.5 transition ${timeLeft > 0 || resending
              ? "text-zinc-400 dark:text-zinc-500 cursor-not-allowed opacity-60"
              : "text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              }`}
          >
            <RefreshCw className={`h-3 w-3 ${resending ? "animate-spin" : ""}`} />
            <span>
              {resending
                ? "Sending code..."
                : timeLeft > 0
                  ? `Resend in ${timeLeft}s`
                  : "Resend Code"}
            </span>
          </button>
        </div>

        <Button
          type="submit"
          disabled={loading || code.length < 6 || timeLeft <= 0}
          className="w-full h-10 text-xs font-bold bg-zinc-900 hover:bg-blue-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-blue-400 dark:hover:text-white transition cursor-pointer flex items-center justify-center gap-2"
        >
          <ShieldCheck className="h-4 w-4" />
          <span>{loading ? "Verifying..." : "Verify & Activate Account"}</span>
        </Button>

        <div className="text-center pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6 py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Verify Your Reader Email
          </h1>
          <p className="mt-1 text-xs text-zinc-500">Loading verification screen...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
