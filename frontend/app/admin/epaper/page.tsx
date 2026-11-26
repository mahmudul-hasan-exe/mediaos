"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataTable, Column } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Layers,
  Plus,
  Calendar,
  FileText,
  Eye,
  ExternalLink,
  Edit2,
  Trash2,
  MousePointerClick,
} from "lucide-react";

interface EPaperAdminEdition {
  id: string;
  title: string;
  editionDate: string;
  totalPages: number;
  coverImage: string;
  hotspotsCount: number;
  status: "published" | "draft";
}

const INITIAL_EDITIONS: EPaperAdminEdition[] = [
  {
    id: "ep-01",
    title: "City Morning Edition — Sunday Special",
    editionDate: "2025-02-16",
    totalPages: 16,
    coverImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&auto=format&fit=crop&q=80",
    hotspotsCount: 42,
    status: "published",
  },
  {
    id: "ep-02",
    title: "Saturday Weekend In-Depth BroadSheet",
    editionDate: "2025-02-15",
    totalPages: 24,
    coverImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&auto=format&fit=crop&q=80",
    hotspotsCount: 58,
    status: "published",
  },
  {
    id: "ep-03",
    title: "Friday Business & Macro Special",
    editionDate: "2025-02-14",
    totalPages: 20,
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80",
    hotspotsCount: 36,
    status: "published",
  },
];

export default function EPaperManagementPage() {
  const [editions, setEditions] = useState(INITIAL_EDITIONS);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2025-02-17");

  const handleCreateEdition = (e: React.FormEvent) => {
    e.preventDefault();
    const newEd: EPaperAdminEdition = {
      id: `ep-${Date.now()}`,
      title: title || "New BroadSheet Edition",
      editionDate: date,
      totalPages: 12,
      coverImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&auto=format&fit=crop&q=80",
      hotspotsCount: 0,
      status: "published",
    };
    setEditions([newEd, ...editions]);
    setModalOpen(false);
    setTitle("");
  };

  const columns: Column<EPaperAdminEdition>[] = [
    {
      key: "title",
      header: "BroadSheet Edition & Cover",
      render: (e) => (
        <div className="flex items-center gap-3">
          <img
            src={e.coverImage}
            alt=""
            className="h-12 w-9 rounded object-cover shadow-xs border border-zinc-200 dark:border-zinc-700"
          />
          <div>
            <div className="font-bold text-zinc-900 dark:text-zinc-100">{e.title}</div>
            <div className="text-[11px] text-zinc-400">Date: {e.editionDate}</div>
          </div>
        </div>
      ),
    },
    {
      key: "totalPages",
      header: "Total Pages",
      render: (e) => <span className="font-semibold text-xs">{e.totalPages} BroadSheet Pages</span>,
    },
    {
      key: "hotspotsCount",
      header: "Interactive Hotspots",
      render: (e) => (
        <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
          <MousePointerClick className="h-3.5 w-3.5" />
          {e.hotspotsCount} Clippable Articles
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (e) => <Badge variant="success">{e.status}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (e) => (
        <div className="flex items-center gap-1.5 justify-end">
          <Link href="/epaper" target="_blank">
            <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>Reader View</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditions(editions.filter((ed) => ed.id !== e.id))}
            className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Digital E-Paper Editions
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Upload daily print broadsheet scans, publish PDF editions, and calibrate interactive story hotspots.
          </p>
        </div>

        <Button size="sm" onClick={() => setModalOpen(true)} className="flex items-center gap-1.5">
          <Plus className="h-4 w-4" />
          <span>Upload New E-Paper Edition</span>
        </Button>
      </div>

      <DataTable
        data={editions}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search editions by date or title..."
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Publish Daily E-Paper Edition"
        description="Upload multi-page print replica edition for digital subscribers."
        maxWidth="md"
      >
        <form onSubmit={handleCreateEdition} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Edition Title
            </label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Daily Chronicle — Monday Morning Edition"
              className="text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Edition Publication Date
            </label>
            <Input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-6 text-center bg-zinc-50 dark:bg-zinc-900 cursor-pointer">
            <Layers className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Upload BroadSheet PDF or Page JPGs
            </p>
            <p className="text-[10px] text-zinc-400 mt-1">Automatic high-res tiling & thumbnail generation</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Upload & Publish
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

