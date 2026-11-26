"use client";

import React, { useState, useEffect } from "react";
import { mediaService, INITIAL_MEDIA } from "@/services/media-service";
import { MediaItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { MediaOSConfirmDialog } from "@/components/ui/mediaos-modal";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import {
  Upload,
  Search,
  Folder,
  Image as ImageIcon,
  Video,
  FileText,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Eye,
} from "lucide-react";

export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [selectedType, setSelectedType] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newFolder, setNewFolder] = useState("Technology");
  const [uploading, setUploading] = useState(false);

  const folders = ["All", "World Affairs", "Technology", "Business", "Climate", "Investigative"];

  const loadMedia = () => {
    mediaService.getMedia({ folder: selectedFolder, type: selectedType, search }).then((data) => {
      setItems(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadMedia();
  }, [selectedFolder, selectedType, search]);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    mediaosToast.success("Asset URL copied to clipboard.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
  };

  const confirmDeleteAsset = async () => {
    if (!deleteTargetId) return;
    const id = deleteTargetId;
    setDeleteTargetId(null);
    await mediaService.deleteMedia(id);
    mediaosToast.success("Media asset deleted from CDN cluster.");
    loadMedia();
  };

  const handleSimulateUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    setUploading(true);

    await mediaService.uploadMedia({
      title: newTitle,
      fileName: `${newTitle.toLowerCase().replace(/\s+/g, "-")}.jpg`,
      folder: newFolder,
      type: "image",
    });

    setUploading(false);
    setUploadModalOpen(false);
    setNewTitle("");
    mediaosToast.success(`Asset "${newTitle}" uploaded successfully.`);
    loadMedia();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Publishing Media & Asset Library
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Cloud storage cluster housing high-resolution photojournalism, charts, document leaks, and video clips.
          </p>
        </div>

        <Button size="sm" onClick={() => setUploadModalOpen(true)} className="flex items-center gap-1.5">
          <Upload className="h-4 w-4" />
          <span>Upload Media Asset</span>
        </Button>
      </div>

      {/* Toolbar & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media by title or filename..."
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* Folder Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedFolder === f
                  ? "bg-blue-600 text-white font-semibold shadow-xs"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50"
              }`}
            >
              <Folder className="h-3 w-3" />
              <span>{f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div
              className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
              onClick={() => setPreviewItem(item)}
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-2 left-2 rounded bg-black/60 backdrop-blur-xs px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                {item.folder}
              </span>
            </div>

            <div className="p-3">
              <h4
                onClick={() => setPreviewItem(item)}
                className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate cursor-pointer hover:underline"
                title={item.title}
              >
                {item.title}
              </h4>
              <p className="text-[10px] text-zinc-400 truncate mt-0.5">{item.fileName}</p>

              <div className="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                <span>{item.fileSize}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    title="Copy CDN Link"
                    className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Delete Asset"
                    className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950 text-red-500 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <Modal
          isOpen={!!previewItem}
          onClose={() => setPreviewItem(null)}
          title={previewItem.title}
          description={`File: ${previewItem.fileName} • ${previewItem.dimensions || "High Resolution"} • ${previewItem.fileSize}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl bg-zinc-950 max-h-96 flex items-center justify-center">
              <img
                src={previewItem.url}
                alt={previewItem.title}
                className="max-h-96 w-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
              <span className="text-zinc-500 font-mono truncate max-w-md">
                {previewItem.url}
              </span>
              <Button
                size="sm"
                onClick={() => handleCopyUrl(previewItem.url, previewItem.id)}
                className="h-8 text-xs flex items-center gap-1.5"
              >
                {copiedId === previewItem.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy CDN Link</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Asset Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Editorial Asset"
        description="Attach photos or documents to the media library."
        maxWidth="md"
      >
        <form onSubmit={handleSimulateUpload} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Asset Title / Caption
            </label>
            <Input
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. European Central Bank Press Conference"
              className="text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Folder Destination
            </label>
            <Select value={newFolder} onChange={(e) => setNewFolder(e.target.value)}>
              <option value="World Affairs">World Affairs</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Climate">Climate</option>
              <option value="Investigative">Investigative</option>
            </Select>
          </div>

          <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-6 text-center bg-zinc-50/50 dark:bg-zinc-900/50 cursor-pointer hover:border-blue-500 transition">
            <Upload className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Drag and drop high-res imagery or video
            </p>
            <p className="text-[10px] text-zinc-400 mt-1">
              PNG, JPG, WEBP, MP4 or PDF up to 50MB
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload to CDN"}
            </Button>
          </div>
        </form>
      </Modal>

      <MediaOSConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDeleteAsset}
        title="Delete Media Asset?"
        message="Are you sure you want to permanently delete this media asset from CDN storage? This action cannot be reversed."
        confirmText="Yes, Delete Asset"
        variant="danger"
      />
    </div>
  );
}

