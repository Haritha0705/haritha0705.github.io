import dynamic from 'next/dynamic';
import { Box, Skeleton } from '@mui/material';
import Hero from '@/components/Hero';
import HashScrollHandler from '@/components/HashScrollHandler';

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
    return (
        <>
            <HashScrollHandler />

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
