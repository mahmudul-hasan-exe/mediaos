"use client";

import React, { useState } from "react";
import { DataTable, Column } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Plus, Eye } from "lucide-react";

interface AdItem {
  id: string;
  name: string;
  client: string;
  zone: string;
  impressions: number;
  clicks: number;
  ctr: string;
  status: "active" | "paused" | "expired";
}

const INITIAL_ADS: AdItem[] = [
  {
    id: "ad-01",
    name: "Apex Cloud Enterprise Tier Campaign",
    client: "Apex Infrastructure Inc.",
    zone: "header_leaderboard (728x90)",
    impressions: 248900,
    clicks: 4120,
    ctr: "1.65%",
    status: "active",
  },
  {
    id: "ad-02",
    name: "Venture AI Global Conference 2025",
    client: "Global Tech Forums",
    zone: "sidebar_square (300x250)",
    impressions: 184500,
    clicks: 2890,
    ctr: "1.56%",
    status: "active",
  },
  {
    id: "ad-03",
    name: "Autonomous Mobility Summit",
    client: "Future Mobility Corp",
    zone: "in_article (Responsive)",
    impressions: 98400,
    clicks: 1420,
    ctr: "1.44%",
    status: "active",
  },
];

export default function AdvertisementsPage() {
  const [ads, setAds] = useState(INITIAL_ADS);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [zone, setZone] = useState("header_leaderboard (728x90)");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newAd: AdItem = {
      id: `ad-${Date.now()}`,
      name,
      client,
      zone,
      impressions: 0,
      clicks: 0,
      ctr: "0.00%",
      status: "active",
    };
    setAds([newAd, ...ads]);
    setModalOpen(false);
    setName("");
    setClient("");
  };

  const columns: Column<AdItem>[] = [
    {
      key: "name",
      header: "Campaign Name & Client",
      render: (a) => (
        <div>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{a.name}</span>
          <div className="text-[11px] text-zinc-400">Client: {a.client}</div>
        </div>
      ),
    },
    {
      key: "zone",
      header: "Ad Placement Zone",
      render: (a) => <span className="font-mono text-xs text-zinc-500">{a.zone}</span>,
    },
    {
      key: "impressions",
      header: "Impressions",
      render: (a) => (
        <span className="flex items-center gap-1 text-xs">
          <Eye className="h-3.5 w-3.5 text-zinc-400" />
          {a.impressions.toLocaleString()}
        </span>
      ),
    },
    {
      key: "clicks",
      header: "Clicks / CTR",
      render: (a) => (
        <div>
          <span className="font-bold text-xs text-zinc-800 dark:text-zinc-200">{a.clicks.toLocaleString()}</span>
          <span className="ml-1 text-[11px] text-emerald-600 font-semibold">({a.ctr})</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (a) => <Badge variant={a.status === "active" ? "success" : "secondary"}>{a.status}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (a) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const nextStatus = a.status === "active" ? "paused" : "active";
            setAds(ads.map((ad) => (ad.id === a.id ? { ...ad, status: nextStatus } : ad)));
          }}
          className="h-7 text-xs"
        >
          {a.status === "active" ? "Pause" : "Resume"}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Monetization & Ad Campaigns
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage sponsor banner placements, leaderboard zones, impressions delivery, and click-through rates.
          </p>
        </div>

        <Button size="sm" onClick={() => setModalOpen(true)} className="flex items-center gap-1.5">
          <Plus className="h-4 w-4" />
          <span>New Sponsor Campaign</span>
        </Button>
      </div>

      <DataTable
        data={ads}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search campaigns..."
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule Sponsor Campaign"
        description="Book advertisement space for direct sponsor clients."
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Campaign Name
            </label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Q1 Clean Tech Innovation Showcase"
              className="text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Client / Advertiser
            </label>
            <Input
              required
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="e.g. Siemens Global"
              className="text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Ad Slot Location
            </label>
            <Select value={zone} onChange={(e) => setZone(e.target.value)}>
              <option value="header_leaderboard (728x90)">Header Leaderboard (728x90)</option>
              <option value="sidebar_square (300x250)">Sidebar Medium Rectangle (300x250)</option>
              <option value="in_article (Responsive)">In-Article Responsive Break</option>
              <option value="homepage_middle (Full Width)">Homepage Middle Banner</option>
            </Select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Launch Campaign
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

