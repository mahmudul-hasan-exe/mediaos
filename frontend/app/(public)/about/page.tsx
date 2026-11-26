"use client";

import React from "react";
import { useTenantStore } from "@/stores/tenant-store";
import { ShieldCheck, Globe, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  const { currentTenant } = useTenantStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b-2 border-zinc-900 dark:border-zinc-100 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Newsroom Principles & Heritage
        </span>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-zinc-950 dark:text-zinc-50 tracking-tight mt-1">
          About {currentTenant.name}
        </h1>
        <p className="text-sm font-serif italic text-zinc-600 dark:text-zinc-400 mt-1">
          {currentTenant.websiteConfig.tagline}
        </p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 font-serif">
        <p>
          Founded on the uncompromising bedrock of independent journalism, {currentTenant.name} serves citizens, decision-makers, and scholars across {currentTenant.domain}.
          Our editorial mission is to hold power accountable, decode complex global transformations, and present factual dispatches without corporate or partisan bias.
        </p>

        <p>
          As an organization running on the <strong>MediaOS</strong> multi-tenant publishing platform, our newsroom combines traditional shoe-leather investigative rigor with cutting-edge cryptographic verification, decentralized digital paper syndication, and ethical artificial intelligence writing assistance.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-2">
          <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
            Independent Verification
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Every piece of reporting must withstand multi-source corroboration before our editorial desk grants publication approval.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-2">
          <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
            Multilingual Accessibility
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Published across multiple language editions including English, Bangla, and Arabic with native typography and RTL fidelity.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-2">
          <HeartHandshake className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
            Civic Transparency
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Clear editorial ownership, transparent corrections policy, and direct public accountability channels.
          </p>
        </div>
      </div>
    </div>
  );
}

