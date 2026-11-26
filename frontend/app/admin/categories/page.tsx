"use client";

import React, { useState } from "react";
import { INITIAL_CATEGORIES } from "@/services/news-service";
import { DataTable, Column } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { mediaosToast } from "@/stores/mediaos-toast-store";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatSlug || newCatName.toLowerCase().replace(/\s+/g, "-"),
      description: newCatDesc,
      order: categories.length + 1,
      postCount: 0,
      subcategories: [],
      language: "en" as const,
    };

    setCategories([...categories, newCat]);
    setModalOpen(false);
    setNewCatName("");
    setNewCatSlug("");
    setNewCatDesc("");
    mediaosToast.success(`Category "${newCatName}" created successfully.`);
  };

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Category Name",
      render: (c) => (
        <div>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{c.name}</span>
          <p className="text-[11px] text-zinc-400">{c.description}</p>
        </div>
      ),
    },
    {
      key: "slug",
      header: "URL Slug",
      render: (c) => <span className="font-mono text-xs text-zinc-500">/{c.slug}</span>,
    },
    {
      key: "subcategories",
      header: "Subcategories",
      render: (c) => (
        <div className="flex flex-wrap gap-1">
          {c.subcategories.map((sub: any) => (
            <span
              key={sub.id}
              className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.2 text-[10px] text-zinc-600 dark:text-zinc-300"
            >
              {sub.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "postCount",
      header: "Published Stories",
      render: (c) => <span className="font-semibold text-xs">{c.postCount}</span>,
    },
    {
      key: "order",
      header: "Sort Order",
      render: (c) => (
        <span className="font-mono text-xs text-zinc-400">#{c.order}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (c) => (
        <div className="flex items-center gap-1.5 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => mediaosToast.info(`Editing category: ${c.name}`)}
            className="h-7 text-xs flex items-center gap-1"
          >
            <Edit2 className="h-3 w-3" />
            <span>Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCategories(categories.filter((cat) => cat.id !== c.id));
              mediaosToast.success(`Category "${c.name}" deleted.`);
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
            Category & Section Taxonomy
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Organize newspaper desks, subcategories, navigation hierarchies, and multi-language mappings.
          </p>
        </div>

        <Button size="sm" onClick={() => setModalOpen(true)} className="flex items-center gap-1.5">
          <Plus className="h-4 w-4" />
          <span>Add Primary Category</span>
        </Button>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search categories..."
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Primary Category"
        description="Create a new editorial section for the broadsheet."
        maxWidth="md"
      >
        <form onSubmit={handleCreateCategory} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Category Name
            </label>
            <Input
              required
              value={newCatName}
              onChange={(e) => {
                setNewCatName(e.target.value);
                setNewCatSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              placeholder="e.g. Science & Aerospace"
              className="text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              URL Slug
            </label>
            <Input
              required
              value={newCatSlug}
              onChange={(e) => setNewCatSlug(e.target.value)}
              className="text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Description
            </label>
            <Input
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              placeholder="Brief description for SEO and category headers"
              className="text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Save Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

