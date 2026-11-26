"use client";

import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import {
  Settings,
  Mail,
  HardDrive,
  KeyRound,
  FileCode,
} from "lucide-react";

export default function SuperAdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: "general", label: "General & Branding", icon: <Settings className="h-4 w-4" /> },
    { id: "smtp", label: "SMTP Mailer", icon: <Mail className="h-4 w-4" /> },
    { id: "storage", label: "Object Storage (S3)", icon: <HardDrive className="h-4 w-4" /> },
    { id: "license", label: "License & Version", icon: <KeyRound className="h-4 w-4" /> },
    { id: "logs", label: "System Audit Logs", icon: <FileCode className="h-4 w-4" /> },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      mediaosToast.success("Platform settings saved successfully to Laravel database configuration.");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Global Platform Settings
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Configure platform-wide environment parameters, outbound SMTP servers, media storage buckets, and commercial licensing.
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 max-w-2xl shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Platform Instance Parameters
          </h3>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Platform Product Name
            </label>
            <Input defaultValue="MediaOS" className="text-xs" />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Official Tagline
            </label>
            <Input defaultValue="One Platform. Every Publication." className="text-xs" />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Software Developer / Agency
            </label>
            <Input defaultValue="SoftSync Agency" className="text-xs" />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Root App Domain
            </label>
            <Input defaultValue="mediaos.io" className="text-xs font-mono" />
          </div>

          <div className="pt-2">
            <Switch
              checked={true}
              onCheckedChange={() => {}}
              label="Allow New Newspaper Tenant Registrations"
              description="When enabled, prospective publishers can register via public signup."
            />
          </div>
        </div>
      )}

      {/* SMTP Tab */}
      {activeTab === "smtp" && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 max-w-2xl shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Outbound Mail Transport (Transactional SMTP)
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                SMTP Host
              </label>
              <Input defaultValue="smtp.mailgun.org" className="text-xs font-mono" />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Port
              </label>
              <Input defaultValue="587" className="text-xs font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                SMTP Username
              </label>
              <Input defaultValue="postmaster@mg.mediaos.io" className="text-xs font-mono" />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                SMTP Password
              </label>
              <Input type="password" defaultValue="••••••••••••••••" className="text-xs font-mono" />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => mediaosToast.success("Test transactional email dispatched to administrator inbox successfully.")}
            className="text-xs"
          >
            Send Test Email
          </Button>
        </div>
      )}

      {/* Storage Tab */}
      {activeTab === "storage" && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 max-w-2xl shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Media Library & CDN Storage Configuration
          </h3>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Storage Driver
            </label>
            <Input defaultValue="AWS S3 / Cloudflare R2 Compatible" disabled className="text-xs" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Bucket Name
              </label>
              <Input defaultValue="mediaos-production-assets" className="text-xs font-mono" />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                AWS Region
              </label>
              <Input defaultValue="us-east-1" className="text-xs font-mono" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Public CDN Base URL
            </label>
            <Input defaultValue="https://cdn.mediaos.io" className="text-xs font-mono" />
          </div>
        </div>
      )}

      {/* License Tab */}
      {activeTab === "license" && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 max-w-2xl shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Commercial Software License
              </h3>
              <p className="text-xs text-zinc-400">CodeCanyon / SellMyCode Commercial Edition</p>
            </div>
            <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              Verified License
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Purchase License Key
            </label>
            <Input
              defaultValue="MOS-ENT-2025-9834-8291-SOFTSYNC"
              readOnly
              className="text-xs font-mono bg-zinc-50 dark:bg-zinc-800/50"
            />
          </div>

          <div className="text-xs space-y-1 text-zinc-500 pt-2">
            <p><strong>Licensed to:</strong> SoftSync Agency</p>
            <p><strong>Tenants Allowed:</strong> Unlimited Enterprise Tenancy</p>
            <p><strong>Support Validity:</strong> Lifetime SaaS License Updates</p>
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === "logs" && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            System & Security Audit Log
          </h3>

          <div className="space-y-2 text-xs font-mono">
            {[
              { time: "2025-02-14 18:22:10", action: "TENANT_STATUS_TOGGLE", detail: "Tenant 'techherald.io' suspended for token quota exceedance", ip: "192.168.1.1" },
              { time: "2025-02-14 17:15:02", action: "AI_MODEL_UPDATE", detail: "Updated default model to gemini-1.5-pro across platform", ip: "10.0.4.12" },
              { time: "2025-02-14 14:02:44", action: "SUBSCRIPTION_RENEWAL", detail: "The Metro Chronicle renewed Enterprise Annual ($3,990)", ip: "Stripe Webhook" },
              { time: "2025-02-14 11:30:19", action: "TENANT_REGISTERED", detail: "New organization 'Al-Sharq Tribune' completed domain verification", ip: "194.67.210.8" },
            ].map((log, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 gap-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">{log.time}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">[{log.action}]</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-sans">{log.detail}</span>
                </div>
                <span className="text-[10px] text-zinc-400">{log.ip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      {activeTab !== "logs" && (
        <div className="pt-2">
          <Button onClick={handleSave} disabled={saving} size="sm">
            {saving ? "Saving Changes..." : "Save Platform Settings"}
          </Button>
        </div>
      )}
    </div>
  );
}

