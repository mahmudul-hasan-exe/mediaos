"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Building2, Sparkles, Globe } from "lucide-react";
import { useTenantStore } from "@/stores/tenant-store";
import { Tenant } from "@/types";
import { mediaosToast } from "@/stores/mediaos-toast-store";

export default function CreateTenantPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "Pacific Horizon Post",
    slug: "pacific-horizon-post",
    domain: "pacifichorizon.org",
    primaryColor: "#0284c7",
    plan: "Enterprise" as const,
    defaultLanguage: "en" as const,
    contactEmail: "press@pacifichorizon.org",
    ownerName: "Victoria Sterling",
    aiLimit: 5000000,
    tagline: "Unbiased Pacific and Global In-Depth Reporting",
    breakingNewsEnabled: true,
    ePaperEnabled: true,
    advertisementsEnabled: true,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newTenant: Tenant = {
        id: `ten-${Date.now()}`,
        name: formData.name,
        slug: formData.slug,
        domain: formData.domain,
        logo: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=100&auto=format&fit=crop&q=80",
        primaryColor: formData.primaryColor,
        supportedLanguages: ["en", "bn", "ar"],
        defaultLanguage: formData.defaultLanguage,
        plan: formData.plan,
        status: "active",
        aiLimit: formData.aiLimit,
        aiUsage: 0,
        contactEmail: formData.contactEmail,
        ownerName: formData.ownerName,
        createdAt: new Date().toISOString(),
        websiteConfig: {
          siteTitle: formData.name,
          tagline: formData.tagline,
          breakingNewsEnabled: formData.breakingNewsEnabled,
          ePaperEnabled: formData.ePaperEnabled,
          commentsModeration: true,
          advertisementsEnabled: formData.advertisementsEnabled,
        },
      };

      useTenantStore.setState((state) => ({
        tenants: [newTenant, ...state.tenants],
        currentTenant: newTenant,
      }));

      setLoading(false);
      mediaosToast.success(`Publication tenant "${formData.name}" provisioned successfully with isolated database tenancy.`);
      router.push("/super-admin/tenants");
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/super-admin/tenants">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Provision New Newspaper Organization
          </h1>
          <p className="text-xs text-zinc-500">
            Initialize tenant database schema, storage bucket, and editorial roles.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            Publication Identity & Branding
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Newspaper Name
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Primary Brand Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="h-9 w-12 rounded border border-zinc-200 dark:border-zinc-800 cursor-pointer p-0.5"
                />
                <Input
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Editorial Tagline
            </label>
            <Input
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="text-xs"
            />
          </div>
        </div>

        {/* Domain & Hosting */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Globe className="h-4 w-4 text-emerald-600" />
            Domain & Routing Configuration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Custom Domain (FQDN)
              </label>
              <Input
                required
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                placeholder="e.g. dailyherald.com"
                className="text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Internal URL Slug
              </label>
              <Input
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Plan & AI Limits */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            SaaS Plan & Intelligence Allocation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Subscription Plan Tier
              </label>
              <Select
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value as any })}
              >
                <option value="Starter">Starter Plan</option>
                <option value="Professional">Professional Plan</option>
                <option value="Enterprise">Enterprise BroadSheet</option>
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Monthly AI Token Limit
              </label>
              <Input
                type="number"
                value={formData.aiLimit}
                onChange={(e) => setFormData({ ...formData, aiLimit: Number(e.target.value) })}
                className="text-xs"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
            <Switch
              checked={formData.breakingNewsEnabled}
              onCheckedChange={(c) => setFormData({ ...formData, breakingNewsEnabled: c })}
              label="Enable Breaking News Engine"
              description="Displays live tickers and instant breaking alerts on public masthead."
            />
            <Switch
              checked={formData.ePaperEnabled}
              onCheckedChange={(c) => setFormData({ ...formData, ePaperEnabled: c })}
              label="Enable Digital E-Paper Edition Viewer"
              description="Allow publishers to upload broadsheet page editions and define interactive hotspots."
            />
            <Switch
              checked={formData.advertisementsEnabled}
              onCheckedChange={(c) => setFormData({ ...formData, advertisementsEnabled: c })}
              label="Monetization & Ad Campaign Manager"
              description="Enable revenue ad zones: leaderboards, rectangles, and sponsored articles."
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/super-admin/tenants">
            <Button variant="outline" type="button" size="sm">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading} size="sm">
            {loading ? "Provisioning..." : "Provision Publication"}
          </Button>
        </div>
      </form>
    </div>
  );
}

