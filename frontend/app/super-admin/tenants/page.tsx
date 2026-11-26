"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenantStore } from "@/stores/tenant-store";
import { DataTable, Column } from "@/components/shared/data-table";
import { Tenant } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, Ban, CheckCircle2 } from "lucide-react";

export default function TenantsManagementPage() {
  const { tenants, toggleTenantStatus } = useTenantStore();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredTenants = tenants.filter((t) => {
    if (filterStatus === "all") return true;
    return t.status === filterStatus;
  });

  const columns: Column<Tenant>[] = [
    {
      key: "name",
      header: "Publication Name",
      render: (t) => (
        <div className="flex items-center gap-2.5">
          <div
            className="h-3.5 w-3.5 rounded-full shrink-0"
            style={{ backgroundColor: t.primaryColor }}
          />
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</div>
            <div className="text-[10px] text-zinc-400">Created {new Date(t.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      ),
    },
    {
      key: "domain",
      header: "Domain / Hostname",
      render: (t) => (
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span>{t.domain}</span>
          <a
            href={`https://${t.domain}`}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-blue-600"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      ),
    },
    {
      key: "plan",
      header: "SaaS Plan",
      render: (t) => (
        <Badge variant={t.plan === "Enterprise" ? "default" : "secondary"}>
          {t.plan}
        </Badge>
      ),
    },
    {
      key: "aiUsage",
      header: "AI Token Allocation",
      render: (t) => {
        const percent = Math.min(100, Math.round((t.aiUsage / t.aiLimit) * 100));
        return (
          <div className="w-32 space-y-1">
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>{(t.aiUsage / 1000).toLocaleString()}k</span>
              <span>{(t.aiLimit / 1000).toLocaleString()}k ({percent}%)</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${percent > 85 ? "bg-amber-500" : "bg-blue-600"}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Tenant State",
      render: (t) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
            t.status === "active"
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
              : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
          }`}
        >
          {t.status.toUpperCase()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (t) => (
        <div className="flex items-center gap-1.5 justify-end">
          <Button
            variant={t.status === "active" ? "destructive" : "default"}
            size="sm"
            onClick={() => toggleTenantStatus(t.id)}
            className="h-7 text-xs"
          >
            {t.status === "active" ? (
              <span className="flex items-center gap-1">
                <Ban className="h-3 w-3" /> Suspend
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Activate
              </span>
            )}
          </Button>
          <Link href="/admin">
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Open CMS
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Tenant & Publication Registry
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Full directory of independent newspaper organizations operating on the MediaOS multi-tenant engine.
          </p>
        </div>

        <Link href="/super-admin/tenants/create">
          <Button size="sm" className="flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            <span>Create New Newspaper Tenant</span>
          </Button>
        </Link>
      </div>

      <DataTable
        data={filteredTenants}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search publication by name..."
        filterComponent={
          <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 bg-zinc-50 dark:bg-zinc-900">
            {["all", "active", "suspended"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium capitalize transition ${
                  filterStatus === st
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        }
      />
    </div>
  );
}

