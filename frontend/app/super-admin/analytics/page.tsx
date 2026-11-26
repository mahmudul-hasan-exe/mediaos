"use client";

import React from "react";
import { StatCard } from "@/components/shared/stat-card";
import { TENANT_GROWTH_DATA } from "@/services/analytics-service";
import { BarChart3, Globe, Users, ShieldCheck } from "lucide-react";

export default function PlatformAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Global Platform Analytics
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Macro publishing metrics, tenant consumption patterns, and infrastructure load across all publications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Global Daily Pageviews"
          value="4,820,100"
          change="+14.2%"
          isPositive={true}
          subtitle="Across 48 digital newspapers"
          icon={BarChart3}
        />
        <StatCard
          title="Global Unique Readers"
          value="1,240,500"
          change="+9.8%"
          isPositive={true}
          subtitle="30-day active reader count"
          icon={Users}
        />
        <StatCard
          title="Avg Server Latency"
          value="38ms"
          change="-4ms"
          isPositive={true}
          subtitle="Edge CDN cache hit ratio: 94%"
          icon={Globe}
        />
        <StatCard
          title="System Reliability SLA"
          value="99.99%"
          change="Optimal"
          isPositive={true}
          subtitle="0 unexpected outages"
          icon={ShieldCheck}
        />
      </div>

      {/* Tenant Expansion Breakdown */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Tenant Growth & Retention Velocity
            </h3>
            <p className="text-xs text-zinc-400">
              Newspaper organizations onboarded over the last six operational cycles.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
            +50% Growth
          </span>
        </div>

        <div className="mt-6 h-48 flex items-end justify-between gap-4 pt-4">
          {TENANT_GROWTH_DATA.map((item, idx) => {
            const maxTenants = 60;
            const heightPercent = Math.round((item.count / maxTenants) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[10px] font-bold text-zinc-500">
                  {item.count}
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-t-lg h-36 flex items-end overflow-hidden p-0.5">
                  <div
                    className="w-full bg-emerald-600 dark:bg-emerald-500 rounded-t transition-all duration-500 group-hover:bg-emerald-700"
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
    </div>
  );
}

