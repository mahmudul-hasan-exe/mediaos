"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Edit2 } from "lucide-react";
import { mediaosToast } from "@/stores/mediaos-toast-store";

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      id: "starter",
      name: "Starter Publication",
      priceMonthly: 49,
      priceYearly: 490,
      description: "Ideal for local digital newsletters and community press organizations.",
      features: [
        "1 Publication Domain",
        "Up to 5 Staff Reporters",
        "500,000 AI Tokens / mo",
        "Standard CMS News Editor",
        "Community Comments Engine",
        "Standard RSS Feeds",
      ],
      currentTenants: 12,
    },
    {
      id: "pro",
      name: "Professional Daily",
      popular: true,
      priceMonthly: 149,
      priceYearly: 1490,
      description: "For established regional newspapers with fast daily publishing cycles.",
      features: [
        "Custom SSL Domain + CDN",
        "Up to 25 Staff Reporters & Editors",
        "2,500,000 AI Tokens / mo",
        "E-Paper Digital Editions",
        "Ad Campaign & Banner Zones",
        "Multilingual Editions (3 languages)",
        "Breaking News Push Alerts",
      ],
      currentTenants: 24,
    },
    {
      id: "enterprise",
      name: "Enterprise BroadSheet",
      priceMonthly: 399,
      priceYearly: 3990,
      description: "For national media corporations and large multi-desk publications.",
      features: [
        "Unlimited Reporters & Desks",
        "10,000,000 AI Tokens / mo",
        "Dedicated Multi-Sharding DB",
        "Real-Time Live Blogging",
        "High-Speed E-Paper Hotspots",
        "Custom OpenAI/Gemini Gateway",
        "24/7 Priority SLA & Dedicated Account Lead",
      ],
      currentTenants: 12,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Subscription Tier Management
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure recurring SaaS pricing, AI quota allocations, and feature entitlements.
          </p>
        </div>

        {/* Billing cycle toggle */}
        <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 bg-zinc-50 dark:bg-zinc-900 self-start sm:self-auto">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
              billingCycle === "monthly"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
              billingCycle === "yearly"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            Yearly (Save 18%)
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = billingCycle === "monthly" ? plan.priceMonthly : Math.round(plan.priceYearly / 12);
          return (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition relative ${
                plan.popular
                  ? "border-blue-600 dark:border-blue-500 bg-white dark:bg-zinc-900/90 shadow-lg ring-1 ring-blue-600"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 text-white text-[10px] font-extrabold px-3 py-0.5 uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                    {plan.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-zinc-500">
                    {plan.currentTenants} Tenants
                  </span>
                </div>

                <p className="mt-2 text-xs text-zinc-500 min-h-[32px]">
                  {plan.description}
                </p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                    ${price}
                  </span>
                  <span className="text-xs text-zinc-400">/ month</span>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Included Features
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  size="sm"
                  className="w-full flex items-center justify-center gap-1.5"
                  onClick={() => mediaosToast.info(`Plan settings for "${plan.name}" opened.`)}
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Configure Plan Limits</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

