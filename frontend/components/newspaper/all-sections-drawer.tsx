"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNavigationStore } from "@/stores/navigation-store";
import {
  RiCloseLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "@remixicon/react";

interface AllSectionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AllSectionsDrawer({ isOpen, onClose }: AllSectionsDrawerProps) {
  const router = useRouter();
  const { menus } = useNavigationStore();
  const drawerItems = menus.drawer;

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-r border-zinc-300 dark:border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-left duration-200 ease-out font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header with Close Button */}
        <div className="flex items-center justify-between px-4 h-12 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-sans">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label="Close menu"
          >
            <RiCloseLine className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Sections Accordion List */}
        <div className="flex-1 overflow-y-auto">
          {drawerItems.map((section) => {
            const subtopics = section.children || [];
            const hasSubtopics = subtopics.length > 0;
            const isExpanded = expandedSection === section.id;
            const isHome = section.href === "/";

            return (
              <div
                key={section.id}
                className="border-b border-zinc-200 dark:border-zinc-800/80"
              >
                {/* Section Header Row */}
                <div
                  onClick={() => {
                    if (hasSubtopics) {
                      toggleSection(section.id);
                    } else {
                      onClose();
                      if (section.target === "_blank") {
                        window.open(section.href, "_blank", "noopener,noreferrer");
                      } else {
                        router.push(section.href);
                      }
                    }
                  }}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-bold cursor-pointer transition select-none ${
                    isHome ? "relative pl-5" : ""
                  } ${
                    isExpanded
                      ? "bg-white dark:bg-zinc-950 text-black dark:text-white"
                      : "text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  {isHome && (
                    <span className="absolute left-0 inset-y-0 w-1.5 bg-black dark:bg-white" />
                  )}

                  <span className="tracking-tight">{section.label}</span>

                  {hasSubtopics && (
                    <span className="text-zinc-800 dark:text-zinc-200">
                      {isExpanded ? (
                        <RiArrowUpSLine className="h-5 w-5" />
                      ) : (
                        <RiArrowDownSLine className="h-5 w-5" />
                      )}
                    </span>
                  )}
                </div>

                {/* Expanded Sub-Menu */}
                {hasSubtopics && isExpanded && (
                  <div className="bg-white dark:bg-zinc-950 pb-2">
                    {subtopics[0]?.label.toLowerCase() !== section.label.toLowerCase() && (
                      <Link
                        href={section.href}
                        onClick={onClose}
                        className="block px-6 py-2 text-xs bg-zinc-200/80 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-100 mb-1 transition"
                      >
                        {section.label}
                      </Link>
                    )}
                    {subtopics.map((sub, idx) => {
                      const isMainCategoryHeader =
                        idx === 0 && sub.label.toLowerCase() === section.label.toLowerCase();

                      return (
                        <Link
                          key={sub.id || `${sub.label}-${idx}`}
                          href={sub.href}
                          target={sub.target === "_blank" ? "_blank" : undefined}
                          rel={sub.target === "_blank" ? "noopener noreferrer" : undefined}
                          onClick={onClose}
                          className={`block px-6 py-2 text-xs transition ${
                            isMainCategoryHeader
                              ? "bg-zinc-200/80 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-100 mb-1"
                              : "text-zinc-800 dark:text-zinc-300 font-medium hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
