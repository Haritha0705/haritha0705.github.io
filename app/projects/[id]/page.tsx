import type { Metadata } from 'next';
import { projects } from '@/data/content';
import ProjectDetailClient from './ProjectDetailClient';

const SITE_URL = 'https://haritha0705.github.io';

export function generateStaticParams() {
    return projects.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((p) => String(p.id) === id);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    const title = `${project.title} — Project by Haritha Wickremesinghe`;
    const description = project.description;
    const url = `${SITE_URL}/projects/${project.id}`;

    return {
        title,
        description,
        keywords: [
            ...project.tech,
            project.language,
            'Haritha Wickremesinghe',
            'Portfolio Project',
            'Full Stack Developer',
        ],
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: 'article',
            siteName: 'Haritha Wickremesinghe — Full Stack Developer Portfolio',
            images: [
                {
                    url: `${SITE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${SITE_URL}/og-image.png`],
        },
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects.find((p) => String(p.id) === id);

    // JSON-LD for individual project
    const projectJsonLd = project
        ? {
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: project.title,
            description: project.description,
            programmingLanguage: project.language,
            codeRepository: project.github,
            author: {
                "@type": "Person",
                name: "Haritha Wickremesinghe",
                url: SITE_URL,
            },
            url: `${SITE_URL}/projects/${project.id}`,
        }
        : null;

    return (
        <>
            {projectJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
                />
            )}
            <ProjectDetailClient id={id} />
        </>
    );
}
