"use client";

import React, { useState } from "react";
import { AI_PROVIDERS } from "@/services/ai-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import {
  Cpu,
  ShieldAlert,
  Plus,
  Settings2,
  CheckCircle,
} from "lucide-react";

export default function AIProvidersPage() {
  const [providers] = useState(AI_PROVIDERS);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            AI Provider & Gateway Orchestration
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure upstream foundation LLM providers, enforce token consumption budgets, and control editorial routing.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => {
            setSelectedProvider({
              name: "Custom OpenAI-Compatible Provider",
              provider: "custom",
              baseUrl: "https://api.together.xyz/v1",
            });
            setIsConfigOpen(true);
          }}
          className="flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Connect AI Provider</span>
        </Button>
      </div>

      {/* Security notice */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 p-4 text-xs text-blue-800 dark:text-blue-300 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">Zero Client-Side Secret Leakage:</span>
          <p className="text-blue-700/80 dark:text-blue-300/80 leading-relaxed">
            API secrets are strictly encrypted using AES-256-GCM and stored exclusively within the Laravel secure environment.
            Frontend requests interface with foundation LLMs through the authenticated backend reverse-proxy, ensuring credentials are never exposed in browser inspector bundles.
          </p>
        </div>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers.map((prov) => (
          <div
            key={prov.id}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-xl bg-purple-50 dark:bg-purple-950/50 p-2 text-purple-600 dark:text-purple-400">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {prov.name}
                    </h3>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                      {prov.provider}
                    </span>
                  </div>
                </div>

                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Active
                </span>
              </div>

              {/* Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/40 p-3">
                  <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
                    Tokens Consumed
                  </span>
                  <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1 block">
                    {(prov.totalTokensUsed / 1000000).toFixed(2)}M
                  </span>
                </div>

                <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/40 p-3">
                  <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
                    Estimated Cost
                  </span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                    ${prov.estimatedCost.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Models List */}
              <div className="mt-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Active Models ({prov.models.length})
                </span>
                {prov.models.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between text-xs py-1 px-2 rounded-md bg-zinc-50/70 dark:bg-zinc-800/30"
                  >
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {m.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      ${m.costPer1kTokens}/1k
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[10px] text-zinc-400">
                Rate limit: {prov.rpmLimit} RPM
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedProvider(prov);
                  setIsConfigOpen(true);
                }}
                className="h-7 text-xs flex items-center gap-1"
              >
                <Settings2 className="h-3.5 w-3.5" />
                <span>Configure</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Config Modal */}
      {selectedProvider && (
        <Modal
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          title={`Configure ${selectedProvider.name}`}
          description="Update API endpoint and rate limit credentials for this model cluster."
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                API Key Secret
              </label>
              <Input
                type="password"
                defaultValue="sk-proj-demo-encrypted-secret-key-mediaos-94829348"
                className="text-xs font-mono"
              />
              <span className="text-[10px] text-zinc-400 mt-1 block">
                Stored in Laravel encrypted credentials repository.
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Base URL / Reverse Proxy Endpoint
              </label>
              <Input
                defaultValue={selectedProvider.baseUrl || "https://api.openai.com/v1"}
                className="text-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <Button variant="outline" size="sm" onClick={() => setIsConfigOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  mediaosToast.success("AI Provider Gateway configuration saved successfully.");
                  setIsConfigOpen(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

