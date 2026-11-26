"use client";

import React, { useState } from "react";
import { useTenantStore } from "@/stores/tenant-store";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import {
  RiPaletteLine,
  RiSettings3Line,
  RiShareLine,
  RiRssLine,
  RiShieldCheckLine,
  RiCheckLine,
  RiCloseLine,
  RiUserAddLine,
} from "@remixicon/react";

export default function NewspaperSettingsPage() {
  const { currentTenant, updateCurrentTenant } = useTenantStore();
  const [activeTab, setActiveTab] = useState("branding");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: currentTenant.name,
    tagline: currentTenant.websiteConfig.tagline,
    primaryColor: currentTenant.primaryColor,
    contactEmail: currentTenant.contactEmail,
    facebookUrl: currentTenant.websiteConfig.facebookUrl || "",
    twitterUrl: currentTenant.websiteConfig.twitterUrl || "",
    breakingNewsEnabled: currentTenant.websiteConfig.breakingNewsEnabled,
    ePaperEnabled: currentTenant.websiteConfig.ePaperEnabled,
    advertisementsEnabled: currentTenant.websiteConfig.advertisementsEnabled,
  });

  // Permission Matrix State
  const roles = [
    "Owner",
    "Admin",
    "Editor-in-Chief",
    "Editor",
    "Reporter",
    "Author",
    "Moderator",
  ];

  const permissions = [
    { key: "publish", label: "Publish Articles Live" },
    { key: "review", label: "Approve / Reject Review Queue" },
    { key: "edit_any", label: "Edit Any Author's Dispatches" },
    { key: "ai_tools", label: "Access AI Writing Suite" },
    { key: "categories", label: "Create & Reorder Desks" },
    { key: "epaper", label: "Upload & Map E-Paper Editions" },
    { key: "ads", label: "Manage Advertisers & Revenue Slots" },
    { key: "comments", label: "Moderate & Delete Comments" },
    { key: "settings", label: "Modify Publication Branding & API" },
  ];

  const defaultMatrix: Record<string, string[]> = {
    Owner: ["publish", "review", "edit_any", "ai_tools", "categories", "epaper", "ads", "comments", "settings"],
    Admin: ["publish", "review", "edit_any", "ai_tools", "categories", "epaper", "ads", "comments", "settings"],
    "Editor-in-Chief": ["publish", "review", "edit_any", "ai_tools", "categories", "epaper", "comments"],
    Editor: ["publish", "review", "edit_any", "ai_tools", "comments"],
    Reporter: ["ai_tools"],
    Author: ["ai_tools"],
    Moderator: ["comments"],
  };

  const [permissionMatrix, setPermissionMatrix] = useState(defaultMatrix);

  const togglePermission = (role: string, permKey: string) => {
    setPermissionMatrix((prev) => {
      const currentPerms = prev[role] || [];
      const hasPerm = currentPerms.includes(permKey);
      const updated = hasPerm
        ? currentPerms.filter((p) => p !== permKey)
        : [...currentPerms, permKey];
      return { ...prev, [role]: updated };
    });
  };

  const tabs = [
    { id: "branding", label: "Branding & Colors", icon: <RiPaletteLine className="h-4 w-4" /> },
    { id: "modules", label: "Publishing Modules", icon: <RiSettings3Line className="h-4 w-4" /> },
    { id: "roles", label: "Roles & Permissions", icon: <RiShieldCheckLine className="h-4 w-4" /> },
    { id: "social", label: "Social & SEO", icon: <RiShareLine className="h-4 w-4" /> },
    { id: "rss", label: "RSS Syndication", icon: <RiRssLine className="h-4 w-4" /> },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      updateCurrentTenant({
        name: formData.name,
        primaryColor: formData.primaryColor,
        contactEmail: formData.contactEmail,
        websiteConfig: {
          ...currentTenant.websiteConfig,
          tagline: formData.tagline,
          breakingNewsEnabled: formData.breakingNewsEnabled,
          ePaperEnabled: formData.ePaperEnabled,
          advertisementsEnabled: formData.advertisementsEnabled,
          facebookUrl: formData.facebookUrl,
          twitterUrl: formData.twitterUrl,
        },
      });
      setSaving(false);
      mediaosToast.success("Publication settings & permission matrix saved successfully.");
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
          Publication Settings & Governance
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Customize website masthead, dynamic color palettes, roles & permission matrices, and syndication feeds.
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === "branding" && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Masthead & Color Palette
            </h3>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Newspaper Publication Name
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
                Masthead Tagline
              </label>
              <Input
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="text-xs italic"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Primary Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="h-9 w-12 rounded border cursor-pointer p-0.5"
                  />
                  <Input
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Editorial Contact Email
                </label>
                <Input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "modules" && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Toggle Features & Layout Blocks
            </h3>

            <div className="space-y-4 pt-2">
              <Switch
                checked={formData.breakingNewsEnabled}
                onCheckedChange={(c) => setFormData({ ...formData, breakingNewsEnabled: c })}
                label="Breaking News Top Banner"
                description="Displays high-priority live ticker at the top of the newspaper website."
              />

              <Switch
                checked={formData.ePaperEnabled}
                onCheckedChange={(c) => setFormData({ ...formData, ePaperEnabled: c })}
                label="Digital E-Paper Section"
                description="Allows readers to browse interactive broadsheet replica pages."
              />

              <Switch
                checked={formData.advertisementsEnabled}
                onCheckedChange={(c) => setFormData({ ...formData, advertisementsEnabled: c })}
                label="Sponsor & Ad Placements"
                description="Enables revenue slots (leaderboards and sidebar sponsor widgets)."
              />
            </div>
          </div>
        )}

        {activeTab === "roles" && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Granular Roles & Permissions Matrix
                </h3>
                <p className="text-xs text-zinc-500">
                  Configure access control for Owner, Editors, Reporters, and Moderators.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => mediaosToast.info("Staff invitation link generated and copied to clipboard.")}
                className="gap-1.5 text-xs font-semibold"
              >
                <RiUserAddLine className="h-4 w-4" />
                <span>Invite New Staff</span>
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-mono">
                    <th className="py-2.5 px-3 font-semibold">Permission Capability</th>
                    {roles.map((r) => (
                      <th key={r} className="py-2.5 px-2 text-center font-semibold">
                        {r}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                  {permissions.map((perm) => (
                    <tr key={perm.key} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition">
                      <td className="py-3 px-3 font-medium text-zinc-900 dark:text-zinc-100">
                        {perm.label}
                      </td>
                      {roles.map((role) => {
                        const isGranted = (permissionMatrix[role] || []).includes(perm.key);
                        const isOwner = role === "Owner";
                        return (
                          <td key={role} className="py-3 px-2 text-center">
                            <button
                              type="button"
                              disabled={isOwner}
                              onClick={() => togglePermission(role, perm.key)}
                              className={`h-6 w-6 rounded-md inline-flex items-center justify-center transition ${
                                isGranted
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold"
                                  : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
                              } ${isOwner ? "opacity-70 cursor-not-allowed" : "hover:scale-110 cursor-pointer"}`}
                            >
                              {isGranted ? (
                                <RiCheckLine className="h-3.5 w-3.5" />
                              ) : (
                                <RiCloseLine className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Social Media & Discovery Channels
            </h3>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                X / Twitter Profile URL
              </label>
              <Input
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                placeholder="https://twitter.com/yourpublication"
                className="text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Facebook Official Page
              </label>
              <Input
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                placeholder="https://facebook.com/yourpublication"
                className="text-xs font-mono"
              />
            </div>
          </div>
        )}

        {activeTab === "rss" && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              RSS Feed Syndication Endpoints
            </h3>
            <p className="text-xs text-zinc-500">
              Automated XML feeds for news aggregators (Google News, Apple News, Feedly).
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span>https://{currentTenant.domain}/api/rss</span>
                <span className="text-[10px] text-emerald-600 font-bold">ALL NEWS (ACTIVE)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span>https://{currentTenant.domain}/api/rss/breaking</span>
                <span className="text-[10px] text-emerald-600 font-bold">BREAKING ONLY</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" disabled={saving} size="sm">
            {saving ? "Saving Changes..." : "Save Publication Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
