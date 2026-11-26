"use client";

import React, { useState } from "react";
import Link from "next/link";
import { aiService, AIGenerationResponse } from "@/services/ai-service";
import { AIToolType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import {
  Sparkles,
  PenTool,
  Heading,
  RefreshCw,
  FileText,
  Languages,
  Search,
  Share2,
  ImageIcon,
  Copy,
  Check,
  Cpu,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const TOOLS: { id: AIToolType; label: string; icon: any; description: string }[] = [
  { id: "article_writer", label: "AI Article Writer", icon: PenTool, description: "Generate a full journalistic story from a factual prompt" },
  { id: "headline_generator", label: "Headline Generator", icon: Heading, description: "Craft 5 compelling, click-worthy broadsheet headlines" },
  { id: "rewriter", label: "Article Rewriter", icon: RefreshCw, description: "Improve prose clarity, journalistic objectivity, and voice" },
  { id: "summarizer", label: "Executive Summarizer", icon: FileText, description: "Distill complex reports into bulleted takeaways" },
  { id: "translator", label: "Multilingual Translator", icon: Languages, description: "Translate into fluent English, Bangla, or Arabic" },
  { id: "seo_generator", label: "SEO & Meta Generator", icon: Search, description: "Formulate search-optimized titles and meta keywords" },
  { id: "social_caption", label: "Social Media Broadcaster", icon: Share2, description: "Generate coordinated posts for X, LinkedIn & Facebook" },
  { id: "image_prompt", label: "Photojournalism Prompts", icon: ImageIcon, description: "Generate realistic editorial photography prompts" },
];

export default function AIWritingSuitePage() {
  const [selectedTool, setSelectedTool] = useState<AIToolType>("article_writer");
  const [topic, setTopic] = useState("Quantum computing breakthroughs in room-temperature silicon lattices");
  const [sourceText, setSourceText] = useState("");
  const [tone, setTone] = useState<any>("journalistic");
  const [model, setModel] = useState("gemini-1.5-pro");
  const [targetLanguage, setTargetLanguage] = useState<"en" | "bn" | "ar">("en");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIGenerationResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await aiService.generateContent({
        tool: selectedTool,
        topic,
        sourceText,
        tone,
        modelId: model,
        targetLanguage,
      });
      setResponse(res);
    } catch {
      mediaosToast.error("AI Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response.result);
    setCopied(true);
    mediaosToast.success("Generated copy copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider">
              Newsroom Intelligence Suite
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            AI Writing & Editorial Assistant
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Accelerate reporting workflows with integrated LLM tools while preserving rigorous human fact-checking.
          </p>
        </div>

        <Link href="/admin/news/create">
          <Button size="sm" className="flex items-center gap-1.5">
            <span>Open News Editor</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Main Tool Grid & Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Tool Chooser & Parameter Form (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tool Navigation Cards */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 space-y-2 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Select Editorial Assistant Tool
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {TOOLS.map((t) => {
                const Icon = t.icon;
                const isSelected = selectedTool === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTool(t.id);
                      setResponse(null);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-semibold shadow-xs"
                        : "border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isSelected ? "text-blue-600" : "text-zinc-400"}`} />
                      <div>
                        <div className="text-xs font-semibold">{t.label}</div>
                        <div className="text-[10px] text-zinc-400">{t.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Parameters */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Inference Parameters
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Model Engine
                </label>
                <Select value={model} onChange={(e) => setModel(e.target.value)}>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  <option value="gpt-4o">OpenAI GPT-4o</option>
                  <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                </Select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Target Language
                </label>
                <Select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value as any)}>
                  <option value="en">English</option>
                  <option value="bn">Bangla (বাংলা)</option>
                  <option value="ar">Arabic (العربية)</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Story Topic / Core Fact Angles
              </label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic or incident summary..."
                className="text-xs"
              />
            </div>

            {(selectedTool === "rewriter" || selectedTool === "summarizer" || selectedTool === "translator") && (
              <div>
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Source Text
                </label>
                <Textarea
                  rows={4}
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Paste excerpt to translate, rewrite, or summarize..."
                  className="text-xs"
                />
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>{loading ? "Synthesizing Copy..." : "Generate with AI Engine"}</span>
            </Button>
          </div>
        </div>

        {/* Right Side: Output Canvas & Actions (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs flex flex-col justify-between min-h-[500px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Editorial Output Canvas
                </span>
              </div>

              {response && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 text-xs flex items-center gap-1"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </Button>
                  <Link href="/admin/news/create">
                    <Button size="sm" className="h-7 text-xs flex items-center gap-1">
                      <span>Use in New Story</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-24 text-center space-y-3">
                <div className="h-8 w-8 mx-auto border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-zinc-500">
                  Querying foundation model via centralized Laravel AI Proxy...
                </p>
              </div>
            ) : response ? (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40 p-2 rounded-lg">
                  <span>Model: <strong>{response.model}</strong></span>
                  <span>Tokens Used: <strong>{response.tokensUsed}</strong></span>
                  <span>Latency: <strong>{response.processingTimeMs}ms</strong></span>
                </div>

                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed max-h-[500px] overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: response.result }}
                />
              </div>
            ) : (
              <div className="py-28 text-center text-zinc-400 text-xs space-y-2">
                <Sparkles className="h-8 w-8 mx-auto text-zinc-300 dark:text-zinc-700" />
                <p>Select a tool from the left panel and click Generate to produce editorial drafts.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Audited by Laravel Editorial Guardrails
            </span>
            <span>All AI articles require editor verification</span>
          </div>
        </div>
      </div>
    </div>
  );
}

