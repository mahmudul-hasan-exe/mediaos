import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 mb-4">
        <FileQuestion className="h-8 w-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        404 — Story or Page Not Found
      </span>

      <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-black tracking-tight">
        The Requested Article Does Not Exist
      </h1>

      <p className="mt-2 text-xs text-zinc-500 max-w-md">
        The page you are looking for may have been archived, renamed, or moved during an editorial edition update.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <Link href="/">
          <Button className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Front Page</span>
          </Button>
        </Link>
        <Link href="/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <span>Editorial Portal</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

