import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import AppThemeProvider from "@/theme/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haritha Wickremesinghe | Portfolio",
  description: "Full Stack Developer portfolio — React, TypeScript, and scalable systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
            <AppThemeProvider>
                {children}
            </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
