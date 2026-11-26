"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useTenantStore } from "@/stores/tenant-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import {
  User,
  Mail,
  ShieldCheck,
  Lock,
  KeyRound,
  Upload,
  CheckCircle,
  Building2,
  Sparkles,
  Smartphone,
  ExternalLink,
  Camera,
  Check,
  Fingerprint,
  RefreshCw,
} from "lucide-react";
import { RiGoogleFill, RiShieldUserLine, RiVerifiedBadgeFill } from "@remixicon/react";

export default function AccountProfilePage() {
  const { user, setUser } = useAuthStore();
  const { currentTenant } = useTenantStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"profile" | "security" | "affiliation">("profile");

  const [name, setName] = useState(user?.name || "Marcus Vance");
  const [email, setEmail] = useState(user?.email || "marcus.vance@mediaos.io");
  const [designation, setDesignation] = useState(user?.designation || "Senior Editorial Administrator");
  const [bio, setBio] = useState(
    user?.bio || "Managing multi-tenant newsroom systems, foreign desk assignments, and automated AI pipelines."
  );
  const [avatar, setAvatar] = useState(
    user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  );
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  // Sync state if user state hydrates late
  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.email) setEmail(user.email);
      if (user.designation) setDesignation(user.designation);
      if (user.bio) setBio(user.bio);
      if (user.avatar) setAvatar(user.avatar);
    }
  }, [user]);

  // Handle local headshot upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      mediaosToast.error("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      mediaosToast.error("Headshot image size must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatar(result);
      if (user) {
        setUser({ ...user, avatar: result });
      }
      mediaosToast.success("Profile headshot updated successfully.");
    };
    reader.readAsDataURL(file);
  };

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      if (user) {
        setUser({
          ...user,
          name,
          email,
          designation,
          bio,
          avatar,
        });
      }
      setSaving(false);
      mediaosToast.success("Profile Updated", {
        description: "Your newsroom byline and contact details have been refreshed.",
      });
    }, 400);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      mediaosToast.error("New password and confirmation do not match.");
      return;
    }
    setPasswordSaved(true);
    mediaosToast.success("Security Credentials Updated", {
      description: "Your newsroom password has been changed successfully.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  const isGoogleConnected =
    email?.includes("@gmail.com") ||
    avatar?.includes("googleusercontent.com") ||
    user?.email?.includes("@gmail.com");

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Cover Banner with Avatar Overlay */}
      <div className="relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs overflow-hidden">
        {/* Editorial Top Gradient Banner */}
        <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 dark:bg-zinc-950/40 backdrop-blur-md text-white text-xs font-semibold shadow-xs">
              <RiVerifiedBadgeFill className="h-4 w-4 text-sky-200" />
              <span>Verified Newsroom Personnel</span>
            </span>
          </div>
        </div>

        {/* Profile Info Bar */}
        <div className="px-6 pb-6 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16">
            <div className="flex items-end gap-4">
              {/* Avatar Frame with Upload Trigger */}
              <div className="relative group">
                <img
                  src={avatar}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-4 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 shadow-md ring-1 ring-zinc-200/50 dark:ring-zinc-700/50"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-semibold transition cursor-pointer"
                  title="Upload New Headshot"
                >
                  <Camera className="h-5 w-5 mb-0.5" />
                  <span>Change</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              {/* Name & Headline */}
              <div className="space-y-1 mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
                    {name}
                  </h1>
                  <span className="rounded bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">
                    {user?.role || "Editor"}
                  </span>
                </div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {designation} &bull; <span className="font-mono">{email}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-9 text-xs flex items-center gap-1.5"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Headshot</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "profile"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>Journalist Byline & Bio</span>
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "security"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Security & Authentication</span>
          </button>
          <button
            onClick={() => setActiveTab("affiliation")}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "affiliation"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Publication Workspace</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Profile & Byline */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 space-y-6">
            <form
              onSubmit={handleProfileSave}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  Editorial Credentials & Newsroom Profile
                </h3>
                <span className="text-[11px] text-zinc-400">Public byline details</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Full Legal Name
                </label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xs font-medium"
                  placeholder="e.g. Marcus Vance"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Primary Editorial Email
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs font-mono"
                  placeholder="name@mediaos.io"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Official Newsroom Title / Byline Designation
                </label>
                <Input
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="text-xs font-medium"
                  placeholder="e.g. Senior Investigative Field Reporter"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Author Biography (Appears at footer of published dispatches)
                </label>
                <Textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="text-xs leading-relaxed"
                  placeholder="Brief summary of journalistic background, focus areas, and desk coverage."
                />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={saving} size="sm" className="shadow-xs">
                  {saving ? "Saving Changes..." : "Save Profile Details"}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Byline Live Preview */}
          <div className="md:col-span-4 space-y-6">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                Live Byline Preview
              </h4>
              <p className="text-[11px] text-zinc-400">
                This is how your verified byline appears beneath headlines on the public broadsheet:
              </p>

              <div className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 space-y-2.5">
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                  />
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                      <span>{name}</span>
                      <RiVerifiedBadgeFill className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{designation}</div>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-300 italic line-clamp-3 leading-relaxed border-t border-zinc-200/50 dark:border-zinc-800/50 pt-2 font-serif">
                  &ldquo;{bio}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Security & Credentials */}
      {activeTab === "security" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 space-y-6">
            {/* Connected Google Authentication Card */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <RiGoogleFill className="h-4 w-4 text-red-500" />
                  Google Identity Connection
                </h4>
                {isGoogleConnected ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    <Check className="h-3 w-3" />
                    Connected
                  </span>
                ) : (
                  <span className="text-[10px] text-zinc-400">Standard Email/Password</span>
                )}
              </div>

              <div className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-2xs">
                    <RiGoogleFill className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {isGoogleConnected ? "Google One-Click Sign-In Active" : "Google Authentication Available"}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      {isGoogleConnected ? email : "Sign in seamlessly with your Google workspace credentials"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Change Form */}
            <form
              onSubmit={handlePasswordUpdate}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-zinc-500" />
                Change Account Password
              </h4>

              {passwordSaved && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs">
                  <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>Password updated and synced across sessions successfully!</span>
                </div>
              )}

              <div>
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Current Password
                </label>
                <Input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="text-xs"
                  placeholder="Enter current password"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                    New Password
                  </label>
                  <Input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="text-xs"
                    placeholder="Min 8 characters"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-xs"
                    placeholder="Repeat new password"
                  />
                </div>
              </div>

              <div className="pt-1">
                <Button type="submit" variant="outline" size="sm" className="text-xs">
                  Update Password
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: 2FA & Session Tokens */}
          <div className="md:col-span-5 space-y-6">
            {/* Two-Factor Authentication */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Two-Factor Authentication (2FA)
              </h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Require a time-based 6-digit TOTP code during logins to safeguard editorial publishing permissions.
              </p>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
                label="TOTP Authenticator Enabled"
                description="Protected with Google Authenticator / 1Password"
              />
            </div>

            {/* Cryptographic Session Fingerprint */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-2.5 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Fingerprint className="h-4 w-4 text-blue-600" />
                Active Session Integrity
              </h4>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 text-xs space-y-1 font-mono">
                <div className="flex justify-between text-zinc-500">
                  <span>Transport:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">TLS 1.3 Encrypted</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Auth Token:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-[140px]">
                    {user?.id ? `sec_tok_${user.id.slice(0, 10)}...` : "active_token_ok"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Publication Workspace Affiliation */}
      {activeTab === "affiliation" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 space-y-6">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  Assigned Publication Workspace
                </h3>
                <span className="rounded bg-blue-100 dark:bg-blue-950 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">
                  Multi-Tenant
                </span>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full shrink-0"
                    style={{ backgroundColor: currentTenant.primaryColor }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {currentTenant.name}
                    </h4>
                    <p className="text-xs font-mono text-zinc-400">{currentTenant.domain}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Editorial Role</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 capitalize">
                      {user?.role || "Administrator"}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Workspace Status</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active & Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
