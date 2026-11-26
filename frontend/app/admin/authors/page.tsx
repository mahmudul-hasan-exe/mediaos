"use client";

import React, { useState } from "react";
import { DataTable, Column } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { mediaosToast } from "@/stores/mediaos-toast-store";

interface AuthorItem {
  id: string;
  name: string;
  designation: string;
  email: string;
  role: "author" | "reporter" | "editor";
  avatar: string;
  articlesCount: number;
  status: "active" | "inactive";
}

const INITIAL_STAFF: AuthorItem[] = [
  {
    id: "stf-01",
    name: "Sarah Jenkins",
    designation: "Chief Diplomatic Editor",
    email: "sarah.jenkins@metrochronicle.com",
    role: "editor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    articlesCount: 142,
    status: "active",
  },
  {
    id: "stf-02",
    name: "Dr. Marcus Wei",
    designation: "Technology & AI Columnist",
    email: "marcus.wei@metrochronicle.com",
    role: "author",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    articlesCount: 89,
    status: "active",
  },
  {
    id: "stf-03",
    name: "David O'Connor",
    designation: "Senior Investigative Field Reporter",
    email: "david.oconnor@metrochronicle.com",
    role: "reporter",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    articlesCount: 64,
    status: "active",
  },
  {
    id: "stf-04",
    name: "Helena Rostova",
    designation: "Financial Markets Bureau Chief",
    email: "helena.rostova@metrochronicle.com",
    role: "author",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    articlesCount: 112,
    status: "active",
  },
];

export default function AuthorsPage() {
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    role: "reporter" as any,
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newStaffMember: AuthorItem = {
      id: `stf-${Date.now()}`,
      name: formData.name,
      designation: formData.designation,
      email: formData.email,
      role: formData.role,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      articlesCount: 0,
      status: "active",
    };

    setStaff([newStaffMember, ...staff]);
    setModalOpen(false);
    setFormData({ name: "", designation: "", email: "", role: "reporter" });
    mediaosToast.success(`Correspondent "${newStaffMember.name}" registered successfully.`);
  };

  const columns: Column<AuthorItem>[] = [
    {
      key: "name",
      header: "Staff Member & Designation",
      render: (s) => (
        <div className="flex items-center gap-3">
          <img
            src={s.avatar}
            alt={s.name}
            className="h-9 w-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
          />
          <div>
            <div className="font-bold text-zinc-900 dark:text-zinc-100">{s.name}</div>
            <div className="text-[11px] text-zinc-500">{s.designation}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Editorial Role",
      render: (s) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
            s.role === "editor"
              ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
              : s.role === "reporter"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
          }`}
        >
          {s.role}
        </span>
      ),
    },
    {
      key: "email",
      header: "Contact Email",
      render: (s) => <span className="font-mono text-xs text-zinc-500">{s.email}</span>,
    },
    {
      key: "articlesCount",
      header: "Bylines Published",
      render: (s) => <span className="font-semibold text-xs">{s.articlesCount} stories</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (s) => (
        <Badge variant={s.status === "active" ? "success" : "secondary"}>
          {s.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (s) => (
        <div className="flex items-center gap-1.5 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => mediaosToast.info(`Editing journalist profile: ${s.name}`)}
            className="h-7 text-xs flex items-center gap-1"
          >
            <Edit className="h-3 w-3" />
            <span>Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStaff(staff.filter((m) => m.id !== s.id));
              mediaosToast.success(`Correspondent "${s.name}" removed from editorial desk.`);
            }}
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
            Authors, Columnists & Field Reporters
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage journalist profiles, bylines, designations, and newsroom editorial assignments.
          </p>
        </div>

        <Button size="sm" onClick={() => setModalOpen(true)} className="flex items-center gap-1.5">
          <Plus className="h-4 w-4" />
          <span>Invite Journalist</span>
        </Button>
      </div>

      <DataTable
        data={staff}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search journalist by name..."
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Invite Editorial Staff Member"
        description="Add a new writer, correspondent, or desk editor to this publication."
        maxWidth="md"
      >
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Full Name
            </label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Liam Sterling"
              className="text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Designation / Title
            </label>
            <Input
              required
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              placeholder="e.g. Senior Foreign Correspondent"
              className="text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Email Address
            </label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="liam.sterling@metrochronicle.com"
              className="text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Editorial Role
            </label>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
            >
              <option value="reporter">Field Reporter (Can submit drafts)</option>
              <option value="author">Columnist / Author (Can draft essays)</option>
              <option value="editor">Desk Editor (Can review and approve)</option>
            </Select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

