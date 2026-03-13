import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import AppThemeProvider from "@/theme/ThemeProvider";
import AppShell from "@/components/AppShell";
import "./globals.css";

const SITE_URL = "https://haritha0705.github.io";
const SITE_NAME = "Haritha Wickremesinghe — Full Stack Developer Portfolio";
const SITE_DESCRIPTION =
    "Haritha Wickremesinghe is a Full Stack Developer & Software Engineering undergraduate specializing in React, Next.js, TypeScript, Node.js, NestJS, Spring Boot, Docker, and Kubernetes. Explore projects, skills, blog posts, and experience.";

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#0B0B11' },
        { media: '(prefers-color-scheme: light)', color: '#F5F5F5' },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),

    title: {
        default: "Haritha Wickremesinghe | Full Stack Developer",
        template: "%s | Haritha Wickremesinghe",
    },
    description: SITE_DESCRIPTION,
    keywords: [
        'Haritha Wickremesinghe',
        'Full Stack Developer',
        'Software Engineer',
        'React Developer',
        'Next.js Developer',
        'TypeScript Developer',
        'Node.js Developer',
        'NestJS',
        'Spring Boot',
        'Docker',
        'Kubernetes',
        'DevOps',
        'Frontend Developer',
        'Backend Developer',
        'Web Developer',
        'Sri Lanka Developer',
        'Portfolio',
        'Software Engineering Undergraduate',
        'University of Westminster',
        'React Native',
        'Flutter',
        'GraphQL',
        'PostgreSQL',
        'MongoDB',
    ],
    authors: [{ name: 'Haritha Wickremesinghe', url: SITE_URL }],
    creator: 'Haritha Wickremesinghe',
    publisher: 'Haritha Wickremesinghe',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: SITE_URL,
    },
    openGraph: {
        title: "Haritha Wickremesinghe | Full Stack Developer & Software Engineer",
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        siteName: SITE_NAME,
        type: "website",
        locale: "en_US",
        images: [
            {
                url: `${SITE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Haritha Wickremesinghe — Full Stack Developer Portfolio",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Haritha Wickremesinghe | Full Stack Developer",
        description: SITE_DESCRIPTION,
        images: [`${SITE_URL}/og-image.png`],
        creator: "@haritha_dev",
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
    },
    manifest: '/manifest.json',
    category: 'technology',
    verification: {
        google: 'googleb2f98c5ca5b4445a',
    },
};

/* ── JSON-LD Structured Data ── */
const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Haritha Wickremesinghe",
    url: SITE_URL,
    image: `${SITE_URL}/haritha.jpg`,
    jobTitle: "Full Stack Developer",
    description: SITE_DESCRIPTION,
    email: "harithawikramasinha2003@gmail.com",
    telephone: "+94785156282",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Colombo",
        addressCountry: "LK",
    },
    alumniOf: [
        {
            "@type": "CollegeOrUniversity",
            name: "University of Westminster",
        },
        {
            "@type": "CollegeOrUniversity",
            name: "Informatics Institute of Technology",
        },
    ],
    knowsAbout: [
        "React", "Next.js", "TypeScript", "Node.js", "NestJS", "Spring Boot",
        "Docker", "Kubernetes", "AWS", "PostgreSQL", "MongoDB", "GraphQL",
        "Flutter", "React Native", "REST API", "DevOps", "CI/CD",
    ],
    sameAs: [
        "https://github.com/Haritha0705",
        "https://www.linkedin.com/in/haritha-wickremesinghe-11ab05271/",
        "https://medium.com/@harithawikramasinha2003",
        "https://web.facebook.com/haritha.wickremesinghe/",
        "https://www.instagram.com/haritha_wickremesinghe/",
    ],
};

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: {
        "@type": "Person",
        name: "Haritha Wickremesinghe",
    },
    potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/#projects`,
        "query-input": "required name=search_term_string",
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/#about` },
        { "@type": "ListItem", position: 3, name: "Skills", item: `${SITE_URL}/#skills` },
        { "@type": "ListItem", position: 4, name: "Projects", item: `${SITE_URL}/#projects` },
        { "@type": "ListItem", position: 5, name: "Blog", item: `${SITE_URL}/#blog` },
        { "@type": "ListItem", position: 6, name: "Experience", item: `${SITE_URL}/#experience` },
        { "@type": "ListItem", position: 7, name: "Contact", item: `${SITE_URL}/#contact` },
    ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        {/* JSON-LD Structured Data for SEO */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body>
        <AppRouterCacheProvider>
            <AppThemeProvider>
                <AppShell>
                    {children}
                </AppShell>
            </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
