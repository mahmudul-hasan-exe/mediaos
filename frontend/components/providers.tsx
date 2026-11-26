"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeInitializer } from "@/components/shared/theme-initializer";
import { useUIStore } from "@/stores/ui-store";
import { MediaOSToastContainer } from "@/components/ui/mediaos-toast-container";

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useUIStore();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeInitializer />
      {children}
      {/* Custom MediaOS Native Toast UI (Single instance) */}
      <MediaOSToastContainer />
    </QueryClientProvider>
  );
}

