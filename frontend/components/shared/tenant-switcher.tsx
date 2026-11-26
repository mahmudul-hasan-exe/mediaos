"use client";

import { useTenantStore } from "@/stores/tenant-store";
import { Check, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function TenantSwitcher() {
  const { currentTenant, tenants, setTenant } = useTenantStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-100 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
      >
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: currentTenant.primaryColor }}
        />
        <span className="max-w-[140px] truncate font-medium">{currentTenant.name}</span>
        <ChevronDown className="h-3 w-3 text-zinc-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <span>Publications (Tenants)</span>
            <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              Multi-tenant
            </span>
          </div>

          <div className="mt-1 space-y-1">
            {tenants.map((tenant) => {
              const isSelected = tenant.id === currentTenant.id;
              return (
                <button
                  key={tenant.id}
                  onClick={() => {
                    setTenant(tenant);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg p-2 text-left transition ${
                    isSelected
                      ? "bg-zinc-100 dark:bg-zinc-800/80 font-medium text-zinc-900 dark:text-white"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: tenant.primaryColor }}
                    />
                    <div className="truncate">
                      <div className="text-xs truncate">{tenant.name}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{tenant.domain}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                        tenant.status === "active"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                      }`}
                    >
                      {tenant.status}
                    </span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

