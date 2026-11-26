import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "MediaOS — AI-Powered Multi-Tenant Newspaper & Digital Publishing Platform",
  description: "One Platform. Every Publication.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..800&family=Playfair+Display:ital,wght@0,500..900;1,500..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Tiro+Bangla:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-600 selection:text-white"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
