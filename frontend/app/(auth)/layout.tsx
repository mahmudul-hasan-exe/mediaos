import React from "react";
import Link from "next/link";
import { ShieldCheck, BookOpen } from "lucide-react";
import { MediaOSIcon } from "@/components/shared/brand-logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-zinc-950 overflow-x-hidden">
      {/* Left Form Container */}
      <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-10 h-full overflow-y-auto">
        {/* Header Brand */}
        <div className="flex items-center justify-between shrink-0 mb-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <MediaOSIcon size={34} />
            <div className="flex items-center leading-none">
              <span className="font-sans font-black text-xl tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                Media
              </span>
              <span className="font-sans font-black text-xl tracking-tight text-blue-600 dark:text-blue-400">
                OS
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >
            ← Back to Front Page
          </Link>
        </div>

        {/* Auth Page Content */}
        <div className="my-auto max-w-md w-full mx-auto py-2 sm:py-4">{children}</div>

        {/* Pinned Consistent Bottom Footer */}
        <div className="shrink-0 text-xs text-zinc-400 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-4 mt-6">
          <span>© {new Date().getFullYear()} MediaOS News Network</span>
          <span>Independent Global Broadsheet</span>
        </div>
      </div>

      {/* Right Reader Showcase */}
      <div className="hidden lg:col-span-6 lg:flex flex-col justify-between p-10 lg:p-14 bg-zinc-900 text-white relative overflow-hidden border-l border-zinc-800 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-zinc-900 to-zinc-950 pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-lg my-auto">
          <h2 className="text-4xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
            Truth Without Compromise.
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Stay ahead with fearless global reporting, investigative scoops, and deep analysis from verified correspondents across 60+ countries.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <BookOpen className="h-5 w-5 text-blue-400 mb-2" />
              <h4 className="text-xs font-bold text-zinc-100">Personalized Reading</h4>
              <p className="text-[11px] text-zinc-400 mt-1">
                Save in-depth investigations, follow your favorite news desks, and read offline anytime.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-400 mb-2" />
              <h4 className="text-xs font-bold text-zinc-100">Verified & Fact-Checked</h4>
              <p className="text-[11px] text-zinc-400 mt-1">
                Zero sensationalism or clickbait. Every dispatch is rigorously vetted by seasoned editors.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-zinc-500">
          Trusted by millions of informed readers worldwide for daily news intelligence.
        </div>
      </div>
    </div>
  );
}
