import React from "react";
import Link from "next/link";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
        <ShieldX className="h-8 w-8" />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Access Restricted
        </h1>
        <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto">
          Your current user role does not possess permissions to view or execute operations on this resource. Consult your publication&apos;s administrator.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Link href="/admin">
          <Button variant="default" size="sm">
            Return to Dashboard
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" size="sm">
            Switch Account
          </Button>
        </Link>
      </div>
    </div>
  );
}

