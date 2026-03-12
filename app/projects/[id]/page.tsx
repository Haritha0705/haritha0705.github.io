import { projects } from '@/data/content';
import ProjectDetailClient from './ProjectDetailClient';
export function generateStaticParams() {
    return projects.map((p) => ({ id: String(p.id) }));
}
export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProjectDetailClient id={id} />;
}
