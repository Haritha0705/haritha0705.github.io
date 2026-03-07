import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import AppThemeProvider from "@/theme/ThemeProvider";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#0B0B11' },
        { media: '(prefers-color-scheme: light)', color: '#F5F5F5' },
    ],
};

export const metadata: Metadata = {
    title: "Haritha Wickremesinghe | Full Stack Developer",
    description: "Full Stack Developer portfolio — React, Next.js, TypeScript, Node.js. View projects, skills, and experience.",
    keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio', 'Haritha Wickremesinghe'],
    authors: [{ name: 'Haritha Wickremesinghe' }],
    robots: 'index, follow',
    openGraph: {
        title: "Haritha Wickremesinghe | Full Stack Developer",
        description: "Full Stack Developer portfolio — React, Next.js, TypeScript, Node.js.",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Haritha Wickremesinghe | Full Stack Developer",
        description: "Full Stack Developer portfolio — React, Next.js, TypeScript, Node.js.",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external APIs — browser resolves DNS early */}
        <link rel="dns-prefetch" href="https://github-contributions-api.jogruber.de" />
        <link rel="dns-prefetch" href="https://cdn-images-1.medium.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AppRouterCacheProvider>
            <AppThemeProvider>
                {children}
            </AppThemeProvider>
            <Analytics />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
