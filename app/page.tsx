'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Skeleton } from '@mui/material';
import Hero from '@/components/Hero';

// Minimal placeholder while lazy sections load
const SectionSkeleton = () => (
    <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <Skeleton variant="rectangular" width="80%" height={200} sx={{ borderRadius: 2 }} />
    </Box>
);

// Lazy-load below-fold sections — reduces initial JS bundle significantly
const About = dynamic(() => import('@/components/About'), { loading: SectionSkeleton });
const CodeSkills = dynamic(() => import('@/components/CodeSkills'), { loading: SectionSkeleton });
const DevProjects = dynamic(() => import('@/components/DevProjects'), { loading: SectionSkeleton });
const BlogPosts = dynamic(() => import('@/components/BlogPosts'), { loading: SectionSkeleton });
const GitHubActivity = dynamic(() => import('@/components/GitHubActivity'), { loading: SectionSkeleton });
const Experience = dynamic(() => import('@/components/Experience'), { loading: SectionSkeleton });
const Contact = dynamic(() => import('@/components/Contact'), { loading: SectionSkeleton });
const Footer = dynamic(() => import('@/components/Footer'));

export default function App() {
    // Handle hash-based scrolling when arriving from sub-pages (e.g., /projects/1 → /#projects)
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return;

        // Small delay to let lazy-loaded sections mount
        const timeout = setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
                window.scrollTo({
                    top: el.offsetTop - 80,
                    behavior: 'smooth',
                });
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>

            {/* Main Content */}
            <Box component="main">
                <Hero />
                <About />
                <CodeSkills />
                <DevProjects />
                <BlogPosts />
                <GitHubActivity />
                <Experience />
                <Contact />
            </Box>

            {/* Footer */}
            <Footer />
        </>
    );
}
