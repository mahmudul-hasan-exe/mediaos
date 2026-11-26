import { MediaItem } from "@/types";

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "med-01",
    title: "Geneva Diplomatic Summit Plenary",
    fileName: "geneva-summit-plenary-2025.jpg",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    fileType: "image",
    fileSize: "2.4 MB",
    dimensions: "3840 x 2160",
    folder: "World Affairs",
    uploadedBy: "Sarah Jenkins",
    createdAt: "2025-02-14T06:00:00Z",
  },
  {
    id: "med-02",
    title: "Quantum Processor Laboratory",
    fileName: "quantum-processor-core.jpg",
    url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80",
    fileType: "image",
    fileSize: "1.8 MB",
    dimensions: "2560 x 1440",
    folder: "Technology",
    uploadedBy: "Dr. Marcus Wei",
    createdAt: "2025-02-13T09:30:00Z",
  },
  {
    id: "med-03",
    title: "Stock Exchange Market Desks",
    fileName: "trading-floor-monitors.jpg",
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    fileType: "image",
    fileSize: "3.1 MB",
    dimensions: "4000 x 2667",
    folder: "Business",
    uploadedBy: "Helena Rostova",
    createdAt: "2025-02-12T11:00:00Z",
  },
  {
    id: "med-04",
    title: "Wind Turbines at Sunset",
    fileName: "wind-farm-clean-grid.jpg",
    url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&auto=format&fit=crop&q=80",
    fileType: "image",
    fileSize: "1.5 MB",
    dimensions: "3000 x 2000",
    folder: "Climate",
    uploadedBy: "Sarah Jenkins",
    createdAt: "2025-02-11T14:15:00Z",
  },
  {
    id: "med-05",
    title: "Rare Earth Mining Facility Drone View",
    fileName: "mining-extraction-quarry.jpg",
    url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200&auto=format&fit=crop&q=80",
    fileType: "image",
    fileSize: "4.2 MB",
    dimensions: "4096 x 2730",
    folder: "Investigative",
    uploadedBy: "David O'Connor",
    createdAt: "2025-02-10T10:00:00Z",
  },
];

class MediaService {
  private items: MediaItem[] = [...INITIAL_MEDIA];

  async getMedia(params?: { folder?: string; type?: string; search?: string }): Promise<MediaItem[]> {
    let list = [...this.items];
    if (params?.folder && params.folder !== "All") {
      list = list.filter((m) => m.folder.toLowerCase() === params.folder!.toLowerCase());
    }
    if (params?.type && params.type !== "all") {
      list = list.filter((m) => m.fileType === params.type);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter((m) => m.title.toLowerCase().includes(q) || m.fileName.toLowerCase().includes(q));
    }
    return list;
  }

  async uploadMedia(file: { title: string; fileName: string; folder: string; type: "image" | "video" | "document" }): Promise<MediaItem> {
    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      title: file.title,
      fileName: file.fileName,
      url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
      fileType: file.type,
      fileSize: "1.9 MB",
      dimensions: "2400 x 1600",
      folder: file.folder || "Uncategorized",
      uploadedBy: "Marcus Vance",
      createdAt: new Date().toISOString(),
    };
    this.items.unshift(newItem);
    return newItem;
  }

  async deleteMedia(id: string): Promise<boolean> {
    const prev = this.items.length;
    this.items = this.items.filter((m) => m.id !== id);
    return this.items.length < prev;
  }
}

export const mediaService = new MediaService();

