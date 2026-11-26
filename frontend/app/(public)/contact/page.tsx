"use client";

import React, { useState } from "react";
import { useTenantStore } from "@/stores/tenant-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, ShieldAlert, CheckCircle } from "lucide-react";

export default function ContactUsPage() {
  const { currentTenant } = useTenantStore();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("tips");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b-2 border-zinc-900 dark:border-zinc-100 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Newsroom Bureau & Inquiries
        </span>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-zinc-950 dark:text-zinc-50 tracking-tight mt-1">
          Contact the Editorial Desk & Submit Tips
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Reach our investigative reporters, advertising team, or reader ombudsman.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Form (7 Cols) */}
        <div className="md:col-span-7 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Inquiry Dispatched</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Thank you for contacting the newsroom. Your message has been routed to the relevant editorial bureau desk.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                Send Another Note
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Your Name
                  </label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Department / Inquiry Type
                </label>
                <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="tips">Confidential News Tip / Whistleblower</option>
                  <option value="editor">Letter to the Editor-in-Chief</option>
                  <option value="press">Press Releases & Media Relations</option>
                  <option value="ads">Commercial Advertising & Partnerships</option>
                  <option value="subscription">Subscriptions & E-Paper Delivery</option>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Message / Details
                </label>
                <Textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide detailed information or document references..."
                  className="text-xs"
                />
              </div>

              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                <span>Submit to Newsroom</span>
              </Button>
            </form>
          )}
        </div>

        {/* Bureau Info & Encrypted Whistleblower Notice (5 Cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Newsroom Headquarters
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <span>100 BroadStreet Plaza, Suite 400<br />Metropolis Media District</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                <span>{currentTenant.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                <span>+1 (800) 555-NEWS-DESK</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/30 p-5 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
              <ShieldAlert className="h-4 w-4 text-amber-600" />
              <span>Confidential Whistleblower Protocol</span>
            </div>
            <p className="text-amber-800/80 dark:text-amber-300/80 leading-relaxed text-[11px]">
              For sensitive leaked documentation, our investigative desk provides end-to-end PGP cryptographic drop-points and Signal verification channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

