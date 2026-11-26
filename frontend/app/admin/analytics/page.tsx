"use client";

import React from "react";
import { StatCard } from "@/components/shared/stat-card";
import { TENANT_CMS_METRICS } from "@/services/analytics-service";
import { Eye, TrendingUp, Share2, Clock } from "lucide-react";

export default function NewspaperAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Newsroom & Readership Analytics
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Audience engagement statistics, popular editorial sections, and referral traffic channels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Monthly Views"
          value={TENANT_CMS_METRICS.totalViews.toLocaleString()}
          change="+24.6%"
          isPositive={true}
          icon={Eye}
        />
        <StatCard
          title="Avg Read Duration"
          value="4m 18s"
          change="+32s"
          isPositive={true}
          icon={Clock}
        />
        <StatCard
          title="Social Story Shares"
          value="18,420"
          change="+16.4%"
          isPositive={true}
          icon={Share2}
        />
        <StatCard
          title="Subscriber Conversion"
          value="3.8%"
          change="+0.6%"
          isPositive={true}
          icon={TrendingUp}
        />
      </div>

      {/* Traffic source breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Top Referral Channels
          </h3>
          <div className="space-y-3 text-xs">
            {[
              { source: "Google Organic & Google News", percent: 48, visitors: "404,200" },
              { source: "Direct Bookmarks & Masthead", percent: 26, visitors: "218,900" },
              { source: "X / Twitter Social Feeds", percent: 14, visitors: "117,800" },
              { source: "Newsletter Morning Dispatch", percent: 8, visitors: "67,300" },
              { source: "Syndicated RSS Aggregators", percent: 4, visitors: "33,900" },
            ].map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span>{c.source}</span>
                  <span className="text-zinc-500">{c.visitors} ({c.percent}%)</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${c.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Most Engaging Editorial Desks
          </h3>
          <div className="space-y-3 text-xs">
            {[
              { desk: "World Affairs & Diplomacy", views: "348,000 views", share: "41%" },
              { desk: "Technology & Autonomous AI", views: "264,000 views", share: "31%" },
              { desk: "Business & Monetary Policy", views: "142,000 views", share: "17%" },
              { desk: "Climate & Science Resilience", views: "88,100 views", share: "11%" },
            ].map((d, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800"
              >
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100">{d.desk}</div>
                  <div className="text-[11px] text-zinc-400">{d.views}</div>
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                  {d.share}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

