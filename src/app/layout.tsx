import type { Metadata } from "next";

import { Shell } from "@/components/Shell";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bec Hac",
  description: "Portfolio and essays.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <Shell>{children}</Shell>
        <SanityLive />
      </body>
    </html>
  );
}
