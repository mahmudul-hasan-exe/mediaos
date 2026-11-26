import React from "react";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
      <PublicHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}

