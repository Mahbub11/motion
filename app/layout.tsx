import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/next-theme-provider";
import { SupabaseUserProvider } from "@/lib/providers/supabase-user-provider";
import AppStateProvider from "@/lib/providers/state-provider";
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppStateProvider>
            <SupabaseUserProvider>
            <Toaster />
              {children}
            </SupabaseUserProvider>
          </AppStateProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
