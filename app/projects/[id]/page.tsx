'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    Chip,
    Button,
    Stack,
    Divider,
    IconButton,
    useTheme,
    Paper,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CommitIcon from '@mui/icons-material/Update';
import CodeIcon from '@mui/icons-material/Code';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { projects } from '@/data/content';

const MotionBox = motion.create(Box);

/* ---------- Simple markdown-to-JSX renderer ---------- */
function MarkdownRenderer({ content, theme }: { content: string; theme: Theme }) {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let tableRows: string[][] = [];
    let tableHeaders: string[] = [];
    let inTable = false;
    let key = 0;
    let inList = false;
    let listItems: React.ReactNode[] = [];

    const flushList = () => {
        if (inList && listItems.length > 0) {
            elements.push(
                <Box key={key++} component="ul" sx={{ pl: 3, mb: 2, '& li': { mb: 0.5 } }}>
                    {listItems}
                </Box>
            );
            listItems = [];
            inList = false;
        }
    };

    const flushTable = () => {
        if (inTable && tableHeaders.length > 0) {
            elements.push(
                <Box key={key++} sx={{ overflowX: 'auto', mb: 3 }}>
                    <Box
                        component="table"
                        sx={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontFamily: 'monospace',
                            fontSize: { xs: 12, sm: 13 },
                            '& th, & td': {
                                border: `1px solid ${theme.palette.divider}`,
                                px: 2,
                                py: 1,
                                textAlign: 'left',
                            },
                            '& th': {
                                bgcolor: theme.palette.background.default,
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                            },
                            '& td': {
                                color: theme.palette.text.secondary,
                            },
                        }}
                    >
                        <thead>
                            <tr>{tableHeaders.map((h, i) => <th key={i}>{h.trim()}</th>)}</tr>
                        </thead>
                        <tbody>
                            {tableRows.map((row, ri) => (
                                <tr key={ri}>{row.map((c, ci) => <td key={ci}>{c.trim()}</td>)}</tr>
                            ))}
                        </tbody>
                    </Box>
                </Box>
            );
            tableHeaders = [];
            tableRows = [];
            inTable = false;
        }
    };

    const renderInline = (text: string) => {
        // Bold
        const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('`') && part.endsWith('`')) {
                return (
                    <Box
                        key={i}
                        component="code"
                        sx={{
                            bgcolor: theme.palette.background.default,
                            px: 0.75,
                            py: 0.25,
                            borderRadius: 0.5,
                            fontSize: '0.85em',
                            fontFamily: 'monospace',
                            color: theme.palette.secondary.main,
                        }}
                    >
                        {part.slice(1, -1)}
                    </Box>
                );
            }
            return part;
        });
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip empty lines
        if (trimmed === '') {
            flushList();
            continue;
        }

        // Table detection
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            flushList();
            const cells = trimmed.split('|').filter(Boolean);
            // Check if separator row
            if (cells.every(c => /^[\s:-]+$/.test(c))) {
                continue; // skip separator
            }
            if (!inTable) {
                inTable = true;
                tableHeaders = cells;
            } else {
                tableRows.push(cells);
            }
            continue;
        } else {
            flushTable();
        }

        // Headings
        if (trimmed.startsWith('### ')) {
            flushList();
            elements.push(
                <Typography key={key++} variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600, fontSize: { xs: 15, sm: 17 }, color: theme.palette.text.primary }}>
                    {trimmed.slice(4)}
                </Typography>
            );
            continue;
        }
        if (trimmed.startsWith('## ')) {
            flushList();
            elements.push(
                <Typography key={key++} variant="h5" sx={{ mt: 3, mb: 2, fontWeight: 700, fontSize: { xs: 18, sm: 22 }, color: theme.palette.text.primary }}>
                    {trimmed.slice(3)}
                </Typography>
            );
            continue;
        }

        // List items
        if (trimmed.startsWith('- ')) {
            inList = true;
            listItems.push(
                <li key={key++}>
                    <Typography component="span" sx={{ fontSize: { xs: 13, sm: 14 }, color: theme.palette.text.secondary, lineHeight: 1.7 }}>
                        {renderInline(trimmed.slice(2))}
                    </Typography>
                </li>
            );
            continue;
        }

        // Regular paragraph
        flushList();
        elements.push(
            <Typography key={key++} sx={{ mb: 1.5, fontSize: { xs: 13, sm: 14 }, color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                {renderInline(trimmed)}
            </Typography>
        );
    }

    flushList();
    flushTable();

    return <>{elements}</>;
}

/* ---------- File tree items for decoration ---------- */
function FileTree({ files, theme }: { files: string[]; theme: Theme }) {
    return (
        <Box sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, overflow: 'hidden' }}>
            {files.map((file, i) => (
                <Stack
                    key={file}
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{
                        px: 2,
                        py: 1,
                        borderBottom: i < files.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                        '&:hover': { bgcolor: theme.palette.action.hover },
                        cursor: 'default',
                    }}
                >
                    {file.endsWith('/') ? (
                        <FolderOpenIcon sx={{ fontSize: 18, color: theme.palette.secondary.main }} />
                    ) : file === 'README.md' ? (
                        <DescriptionOutlinedIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                    ) : (
                        <InsertDriveFileOutlinedIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                    )}
                    <Typography sx={{ fontFamily: 'monospace', fontSize: { xs: 12, sm: 13 }, color: theme.palette.text.primary }}>
                        {file}
                    </Typography>
                </Stack>
            ))}
        </Box>
    );
}

/* ---------- Generate file tree from project tech ---------- */
function getFileTree(project: typeof projects[0]): string[] {
    const files: string[] = ['src/', 'public/'];
    if (project.tech.some(t => ['React', 'Next.js', 'Vite'].includes(t))) files.push('package.json');
    if (project.tech.includes('TypeScript')) files.push('tsconfig.json');
    if (project.tech.includes('Tailwind CSS')) files.push('tailwind.config.ts');
    if (project.tech.some(t => ['Docker'].includes(t))) files.push('Dockerfile');
    if (project.tech.some(t => ['Prisma'].includes(t) || t.includes('Prisma'))) files.push('prisma/');
    files.push('.gitignore');
    files.push('README.md');
    return files;
}

/* ========== Main Page Component ========== */
export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const theme = useTheme();

    const project = useMemo(
        () => projects.find((p) => p.id === Number(params.id)),
        [params.id]
    );

    if (!project) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: theme.palette.background.default }}>
                <Stack alignItems="center" spacing={2}>
                    <Typography variant="h5" color="text.secondary">Project not found</Typography>
                    <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => router.push('/#projects')}>
                        Back to Projects
                    </Button>
                </Stack>
            </Box>
        );
    }

    const fileTree = getFileTree(project);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default, pb: { xs: 6, md: 10 } }}>
            {/* Top bar */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1100,
                    bgcolor: theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backdropFilter: 'blur(12px)',
                }}
            >
                <Container maxWidth="lg">
                    <Stack direction="row" alignItems="center" spacing={1.5} py={1.5}>
                        <IconButton onClick={() => router.push('/#projects')} size="small">
                            <ArrowBackIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                        <GitHubIcon sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
                        <Typography
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: { xs: 13, sm: 15 },
                                color: theme.palette.secondary.main,
                                fontWeight: 600,
                            }}
                        >
                            {project.githubRepo}
                        </Typography>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {/* Repo header */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    sx={{ pt: { xs: 3, md: 4 } }}
                >
                    {/* Title row */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={2}
                        mb={2}
                    >
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <FolderOpenIcon sx={{ color: theme.palette.secondary.main }} />
                            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: 20, sm: 26 } }}>
                                {project.title}
                            </Typography>
                            <Chip
                                label="Public"
                                size="small"
                                variant="outlined"
                                sx={{ fontFamily: 'monospace', fontSize: 11, borderColor: theme.palette.divider }}
                            />
                        </Stack>

                        <Stack direction="row" spacing={1}>
                            {project.demo && (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<OpenInNewIcon />}
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ fontFamily: 'monospace', fontSize: 12, textTransform: 'none' }}
                                >
                                    Live Demo
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<GitHubIcon />}
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontSize: 12,
                                    textTransform: 'none',
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.background.default,
                                    '&:hover': { bgcolor: theme.palette.primary.dark },
                                }}
                            >
                                View on GitHub
                            </Button>
                        </Stack>
                    </Stack>

                    {/* Description */}
                    <Typography sx={{ color: theme.palette.text.secondary, fontSize: { xs: 13, sm: 15 }, mb: 2, maxWidth: 700 }}>
                        {project.description}
                    </Typography>

                    {/* Stats bar */}
                    <Stack
                        direction="row"
                        spacing={{ xs: 2, sm: 3 }}
                        alignItems="center"
                        sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
                    >
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: project.languageColor }} />
                            <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: theme.palette.text.secondary }}>
                                {project.language}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <StarBorderIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                            <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: theme.palette.text.secondary }}>
                                {project.stars}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <CallSplitIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                            <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: theme.palette.text.secondary }}>
                                {project.forks}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <CommitIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                            <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: theme.palette.text.secondary }}>
                                {project.commits} commits
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <CodeIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                            <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: theme.palette.text.secondary }}>
                                {project.lines} lines
                            </Typography>
                        </Stack>
                    </Stack>

                    {/* Tech tags */}
                    <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
                        {project.tech.map((t) => (
                            <Chip
                                key={t}
                                label={t}
                                size="small"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontSize: { xs: 11, sm: 12 },
                                    bgcolor: theme.palette.primary.main + '18',
                                    color: theme.palette.primary.main,
                                    border: `1px solid ${theme.palette.primary.main}33`,
                                }}
                            />
                        ))}
                    </Stack>
                </MotionBox>

                <Divider sx={{ mb: 3 }} />

                {/* Two-column layout: file tree + README */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, gap: 3 }}>
                        {/* Sidebar — File tree */}
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: theme.palette.text.secondary, mb: 1.5, fontWeight: 600 }}>
                                Files
                            </Typography>
                            <FileTree files={fileTree} theme={theme} />
                        </Box>

                        {/* Main — README */}
                        <Paper
                            elevation={0}
                            sx={{
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 2,
                                overflow: 'hidden',
                            }}
                        >
                            {/* README header bar */}
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                sx={{
                                    px: { xs: 2, sm: 3 },
                                    py: 1.5,
                                    bgcolor: theme.palette.background.default,
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                <DescriptionOutlinedIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                                <Typography sx={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600 }}>
                                    README.md
                                </Typography>
                            </Stack>

                            {/* README content */}
                            <Box sx={{ px: { xs: 2.5, sm: 4 }, py: { xs: 3, sm: 4 } }}>
                                {/* Project images */}
                                {project.images.length > 0 && (
                                    <Stack spacing={2} mb={3}>
                                        {project.images.map((img, i) => (
                                            <Box
                                                key={i}
                                                component="img"
                                                src={img}
                                                alt={`${project.title} screenshot ${i + 1}`}
                                                sx={{
                                                    width: '100%',
                                                    borderRadius: 2,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                )}

                                {/* Rendered markdown */}
                                <MarkdownRenderer content={project.readme} theme={theme} />
                            </Box>
                        </Paper>
                    </Box>
                </MotionBox>

                {/* Bottom nav */}
                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    sx={{ mt: 5, textAlign: 'center' }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => router.push('/#projects')}
                        sx={{ fontFamily: 'monospace', fontSize: 13, textTransform: 'none' }}
                    >
                        Back to All Projects
                    </Button>
                </MotionBox>
            </Container>
        </Box>
    );
}




