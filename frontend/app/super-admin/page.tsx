"use client";

import React from "react";
import Link from "next/link";
import { StatCard } from "@/components/shared/stat-card";
import { SUPER_ADMIN_METRICS, REVENUE_CHART_DATA } from "@/services/analytics-service";
import { useTenantStore } from "@/stores/tenant-store";
import {
  Building2,
  FileText,
  DollarSign,
  Cpu,
  Server,
  Plus,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuperAdminOverviewPage() {
  const { tenants, toggleTenantStatus } = useTenantStore();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider">
              Super Admin Console
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            Platform Multi-Tenant Overview
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Centralized orchestration across all registered newspaper organizations and publications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/super-admin/tenants/create">
            <Button size="sm" className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              <span>Create Newspaper Tenant</span>
            </Button>
          </Link>
          <Link href="/super-admin/ai-providers">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-purple-600" />
              <span>AI Provider Gateway</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* High-Level Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Publications"
          value={SUPER_ADMIN_METRICS.totalNewspapers}
          change={SUPER_ADMIN_METRICS.activeTenantsGrowth}
          isPositive={true}
          subtitle="44 Active, 4 Suspended"
          icon={Building2}
          iconColor="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
        />
        <StatCard
          title="Monthly Recurring Revenue"
          value={`$${SUPER_ADMIN_METRICS.monthlyRevenue.toLocaleString()}`}
          change={SUPER_ADMIN_METRICS.revenueGrowth}
          isPositive={true}
          subtitle="From 640 tenant subscriptions"
          icon={DollarSign}
          iconColor="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
        />
        <StatCard
          title="Total Published Stories"
          value={SUPER_ADMIN_METRICS.totalPublishedNews.toLocaleString()}
          change="+8.3%"
          isPositive={true}
          subtitle="Across all editorial newsrooms"
          icon={FileText}
          iconColor="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40"
        />
        <StatCard
          title="AI Token Consumption"
          value={`${(SUPER_ADMIN_METRICS.aiTokensConsumed / 1000000).toFixed(2)}M`}
          change="+31.2%"
          isPositive={true}
          subtitle="Avg cost: $0.0008 / 1k tokens"
          icon={Cpu}
          iconColor="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
        />
      </div>

      {/* Visual Analytics Grid: Revenue & Growth Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Trajectory Card */}
        <div className="lg:col-span-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Platform MRR & Subscriber Trajectory
              </h3>
              <p className="text-xs text-zinc-400">
                Monthly revenue generation from SaaS tiers across global publications.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
              +18.4% YoY
            </span>
          </div>

          <div className="mt-6 h-48 flex items-end justify-between gap-3 pt-4">
            {REVENUE_CHART_DATA.map((item, idx) => {
              const maxRev = 130000;
              const heightPercent = Math.round((item.revenue / maxRev) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-medium text-zinc-400 opacity-0 group-hover:opacity-100 transition">
                    ${(item.revenue / 1000).toFixed(0)}k
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-t-lg h-36 flex items-end overflow-hidden p-0.5">
                    <div
                      className="w-full bg-blue-600 dark:bg-blue-500 rounded-t transition-all duration-500 group-hover:bg-blue-700"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health & Microservices */}
        <div className="lg:col-span-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-500" />
              System Infrastructure Health
            </h3>
            <p className="text-xs text-zinc-400">Multi-tenant backend services</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span className="font-medium">Laravel REST API v1</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                99.98% Up (42ms)
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span className="font-medium">Tenant Database Shards</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                Healthy (PostgreSQL)
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span className="font-medium">AI Proxy Gateway (Gemini/OpenAI)</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                Active (0 Queued)
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span className="font-medium">S3 Media Storage Cluster</span>
              </div>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                1.42 TB Stored
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Registered Publications (Tenants) Overview Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Registered Newspaper Publications
            </h3>
            <p className="text-xs text-zinc-500">
              Manage custom domains, suspend/activate subscriptions, and track AI limits.
            </p>
          </div>
          <Link href="/super-admin/tenants">
            <Button variant="outline" size="sm" className="text-xs">
              View All 48 Tenants
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900 font-semibold text-zinc-500 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3.5">Publication</th>
                <th className="px-4 py-3.5">Custom Domain</th>
                <th className="px-4 py-3.5">Languages</th>
                <th className="px-4 py-3.5">Subscription Plan</th>
                <th className="px-4 py-3.5">AI Token Usage</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:border-zinc-800">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40">
                  <td className="px-4 py-3.5 font-medium text-zinc-900 dark:text-zinc-100">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-[10px] text-zinc-400">Owner: {t.ownerName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">
                    {t.domain}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1">
                      {t.supportedLanguages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.2 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                          {lang.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {t.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>{(t.aiUsage / 1000).toFixed(0)}k</span>
                        <span>{(t.aiLimit / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${Math.min(100, (t.aiUsage / t.aiLimit) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        t.status === "active"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                      }`}
                    >
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right space-x-2">
                    <Button
                      variant={t.status === "active" ? "destructive" : "default"}
                      size="sm"
                      onClick={() => toggleTenantStatus(t.id)}
                      className="h-7 text-[11px]"
                    >
                      {t.status === "active" ? "Suspend" : "Activate"}
                    </Button>
                    <Link href={`/admin`}>
                      <Button variant="outline" size="sm" className="h-7 text-[11px]">
                        Inspect CMS
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

