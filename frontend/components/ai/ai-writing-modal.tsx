"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { mediaosToast } from "@/stores/mediaos-toast-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { aiService, AIGenerationResponse } from "@/services/ai-service";
import { AIToolType } from "@/types";
import {
  Sparkles,
  PenTool,
  Heading,
  RefreshCw,
  FileText,
  Languages,
  Search,
  Share2,
  Image as ImageIcon,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface AIWritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTool?: AIToolType;
  initialTopic?: string;
  initialSourceText?: string;
  onInsertContent?: (content: string, headlines?: string[]) => void;
}

const TOOLS: { id: AIToolType; label: string; icon: any; description: string }[] = [
  { id: "article_writer", label: "Article Writer", icon: PenTool, description: "Draft complete journalistic story from a prompt" },
  { id: "headline_generator", label: "Headline Generator", icon: Heading, description: "Generate 5 punchy broadsheet headlines" },
  { id: "rewriter", label: "Article Rewriter", icon: RefreshCw, description: "Rewrite with improved flow, tone, and rigor" },
  { id: "summarizer", label: "Executive Summary", icon: FileText, description: "Extract key takeaways and bullet points" },
  { id: "translator", label: "Journalism Translator", icon: Languages, description: "Translate between English, Bangla, and Arabic" },
  { id: "seo_generator", label: "SEO & Meta Generator", icon: Search, description: "Generate search-optimized titles and keywords" },
  { id: "social_caption", label: "Social Media Captions", icon: Share2, description: "Create broadcast posts for X, LinkedIn & FB" },
  { id: "image_prompt", label: "Photojournalism Prompt", icon: ImageIcon, description: "Generate photorealistic editorial image prompts" },
];

export function AIWritingModal({
  isOpen,
  onClose,
  initialTool = "article_writer",
  initialTopic = "",
  initialSourceText = "",
  onInsertContent,
}: AIWritingModalProps) {
  const [selectedTool, setSelectedTool] = useState<AIToolType>(initialTool);
  const [topic, setTopic] = useState(initialTopic);
  const [sourceText, setSourceText] = useState(initialSourceText);
  const [tone, setTone] = useState<any>("journalistic");
  const [model, setModel] = useState("gemini-1.5-pro");
  const [targetLanguage, setTargetLanguage] = useState<"en" | "bn" | "ar">("en");
  const [length, setLength] = useState<any>("medium");

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
        length,
      });
      setResponse(res);
    } catch {
      mediaosToast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response.result);
    setCopied(true);
    mediaosToast.success("AI draft copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsert = () => {
    if (!response || !onInsertContent) return;
    onInsertContent(response.result, response.headlineSuggestions);
    mediaosToast.success("Draft inserted into editor canvas.");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="MediaOS AI Writing Assistant"
      description="Enterprise AI intelligence suite designed specifically for digital publishing and broadsheet newsrooms."
      maxWidth="3xl"
    >
      <div className="space-y-4">
        {/* Editorial Policy Warning */}
        <div className="flex items-center gap-2.5 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/30 p-2.5 text-xs text-amber-800 dark:text-amber-300">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>
            <strong>Editorial Safeguard:</strong> All AI-generated outputs remain in Draft status until verified, fact-checked, and approved by a desk editor.
          </span>
        </div>

        {/* Tool Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-medium"
                    : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`} />
                  <span className="text-xs font-semibold">{t.label}</span>
                </div>
                <span className="text-[10px] text-zinc-400 line-clamp-1">{t.description}</span>
              </button>
            );
          })}
        </div>

        {/* Input Configuration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              AI Engine Model
            </label>
            <Select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
              <option value="gemini-1.5-flash">Google Gemini 1.5 Flash</option>
              <option value="gpt-4o">OpenAI GPT-4o Omni</option>
              <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
            </Select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Editorial Tone
            </label>
            <Select value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="journalistic">Objective Journalistic</option>
              <option value="investigative">Investigative & Rigorous</option>
              <option value="urgent">Breaking / Urgent</option>
              <option value="formal">Formal BroadSheet</option>
              <option value="conversational">Engaging & Feature</option>
            </Select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Language Output
            </label>
            <Select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value as any)}>
              <option value="en">English (US/UK)</option>
              <option value="bn">Bangla (বাংলা)</option>
              <option value="ar">Arabic (العربية)</option>
            </Select>
          </div>
        </div>

        {/* Prompt / Topic / Source Text */}
        <div className="space-y-2 pt-1">
          <div>
            <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
              Story Topic / Focus Angle
            </label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Breakthrough summit on autonomous computing ethics in Geneva..."
              className="text-xs"
            />
          </div>

          {(selectedTool === "rewriter" || selectedTool === "summarizer" || selectedTool === "translator") && (
            <div>
              <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Source Text to Process
              </label>
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Paste the draft paragraphs, reporter transcript, or quotes here..."
                rows={3}
                className="text-xs"
              />
            </div>
          )}
        </div>

        {/* Trigger Action */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <span className="text-[11px] text-zinc-400">
            Powered via centralized Laravel API Gateway
          </span>
          <Button
            onClick={handleGenerate}
            disabled={loading || (!topic && !sourceText)}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>{loading ? "Generating Editorial Draft..." : "Generate with AI"}</span>
          </Button>
        </div>

        {/* Result Area */}
        {response && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                Generated Output ({response.tokensUsed} tokens • {response.model})
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} className="h-7 text-xs flex items-center gap-1">
                  {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </Button>
                {onInsertContent && (
                  <Button size="sm" onClick={handleInsert} className="h-7 text-xs flex items-center gap-1">
                    <span>Insert into Editor</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            <div
              className="prose prose-sm dark:prose-invert max-h-60 overflow-y-auto text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: response.result }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}

