"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Bell, Send, CheckCircle, Smartphone, Globe, Users } from "lucide-react";
import { mediaosToast } from "@/stores/mediaos-toast-store";

export default function NotificationsPage() {
  const [title, setTitle] = useState("BREAKING: Historic Treaty on Autonomous AI Signed in Geneva");
  const [message, setMessage] = useState("68 nations have signed the landmark convention regulating critical compute infrastructures.");
  const [target, setTarget] = useState("all");
  const [sending, setSending] = useState(false);

  const [history, setHistory] = useState([
    { id: 1, title: "Special Market Briefing: CBDC Interoperability Trial Results", date: "Yesterday, 14:30", sentCount: 142000 },
    { id: 2, title: "Severe Weather Warning: Coastal Energy Grid Alert", date: "Feb 12, 09:15", sentCount: 89400 },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setHistory([{ id: Date.now(), title, date: "Just now", sentCount: 198500 }, ...history]);
      mediaosToast.success("Push notification broadcast dispatched to 198,500 active mobile & web subscribers.");
      setTitle("");
      setMessage("");
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Push Notification Broadcasts
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Dispatch instant breaking news alerts to mobile app installations and opted-in web browser subscribers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Compose Notification Form (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Bell className="h-4 w-4 text-blue-600" />
            Dispatch Broadcast Alert
          </h3>

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Notification Headline
              </label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief, urgent alert title..."
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Body Message
              </label>
              <Textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Concise 1-2 sentence context summary..."
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Target Audience
                </label>
                <Select value={target} onChange={(e) => setTarget(e.target.value)}>
                  <option value="all">All Subscribers (Mobile + Web)</option>
                  <option value="breaking">Breaking News List Only</option>
                  <option value="premium">Digital Edition Subscribers</option>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Delivery Sound / Priority
                </label>
                <Select defaultValue="high">
                  <option value="high">High Priority (Audible chime)</option>
                  <option value="normal">Standard Silent Banner</option>
                </Select>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                <span>{sending ? "Dispatching..." : "Broadcast Push Notification"}</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Device Preview & History (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-xs space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              Mobile Lock Screen Simulation
            </span>

            <div className="rounded-xl bg-zinc-900 text-white p-4 shadow-inner space-y-2">
              <div className="flex items-center justify-between text-[10px] text-zinc-400">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                  MediaOS News Alert
                </div>
                <span>Now</span>
              </div>
              <h4 className="text-xs font-bold leading-snug">
                {title || "Breaking Alert Headline Preview"}
              </h4>
              <p className="text-[11px] text-zinc-300 line-clamp-2">
                {message || "Body summary will display here on device screens..."}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Recent Broadcast Dispatches
            </h4>
            <div className="space-y-2">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-xs space-y-1"
                >
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{h.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>{h.date}</span>
                    <span className="text-blue-600 font-medium">{h.sentCount.toLocaleString()} devices reached</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

