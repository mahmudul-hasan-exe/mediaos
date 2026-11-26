"use client";

import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
}

export const useMediaOSToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    return id;
  },
  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  clearToasts: () => set({ toasts: [] }),
}));

// Convenience helper methods mimicking sonner syntax
export const mediaosToast = {
  success: (title: string, options?: { description?: string; duration?: number; action?: { label: string; onClick: () => void } }) => {
    return useMediaOSToastStore.getState().addToast({
      type: "success",
      title,
      description: options?.description,
      duration: options?.duration ?? 4000,
      action: options?.action,
    });
  },
  error: (title: string, options?: { description?: string; duration?: number; action?: { label: string; onClick: () => void } }) => {
    return useMediaOSToastStore.getState().addToast({
      type: "error",
      title,
      description: options?.description,
      duration: options?.duration ?? 5000,
      action: options?.action,
    });
  },
  warning: (title: string, options?: { description?: string; duration?: number; action?: { label: string; onClick: () => void } }) => {
    return useMediaOSToastStore.getState().addToast({
      type: "warning",
      title,
      description: options?.description,
      duration: options?.duration ?? 4500,
      action: options?.action,
    });
  },
  info: (title: string, options?: { description?: string; duration?: number; action?: { label: string; onClick: () => void } }) => {
    return useMediaOSToastStore.getState().addToast({
      type: "info",
      title,
      description: options?.description,
      duration: options?.duration ?? 4000,
      action: options?.action,
    });
  },
  dismiss: (id: string) => {
    useMediaOSToastStore.getState().dismissToast(id);
  },
};
