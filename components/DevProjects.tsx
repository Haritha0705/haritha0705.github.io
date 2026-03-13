"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box,
    Container,
    Typography,
    Grid,
    Chip,
    Button,
    Stack,
    Divider,
    IconButton,
    useTheme,
} from '@mui/material';

import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import TerminalIcon from '@mui/icons-material/Terminal';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { filters, projects } from '@/data/content';

const MotionBox = motion.create(Box);

export default function DevProjects() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [hovered, setHovered] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
    const theme = useTheme();

    const INITIAL_COUNT = 6;

    const filtered =
        activeFilter === 'all'
            ? projects
            : projects.filter((p) => p.category.includes(activeFilter));

    const displayProjects = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
    const hasMore = filtered.length > INITIAL_COUNT;

    return (
        <Box
            component="section"
            id="projects"
            py={{ xs: 4, sm: 6, md: 8 }}
            px={{ xs: 1.5, sm: 2 }}
            bgcolor={theme.palette.background.default}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <MotionBox initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        fontWeight="bold"
                        mb={1}
                        sx={{
                            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                            background: theme.custom.gradients.text,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {'<'}Featured Projects{' />'}
                    </Typography>

                    <Typography align="center" fontFamily="monospace" color="text.secondary" mb={{ xs: 3, sm: 4 }} fontSize={{ xs: 12, sm: 14 }}>
                        {"// Building cool stuff, one commit at a time"}
                    </Typography>
                </MotionBox>

                {/* Filters */}
                <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={{ xs: 1, sm: 1.5 }} mb={{ xs: 3, sm: 5 }}>
                    {filters.map((f) => (
                        <MotionBox key={f.id} whileHover={{ scale: 1.05 }}>
                            <Button
                                onClick={() => { setActiveFilter(f.id); setShowAll(false); }}
                                size="small"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontSize: { xs: 11, sm: 13 },
                                    px: { xs: 1.5, sm: 2 },
                                    py: { xs: 0.5, sm: 0.75 },
                                    backgroundColor:
                                        activeFilter === f.id
                                            ? theme.palette.primary.main
                                            : theme.palette.background.paper,
                                    color:
                                        activeFilter === f.id
                                            ? theme.palette.background.paper
                                            : theme.palette.text.secondary,
                                }}
                            >
                                {f.label}
                            </Button>
                        </MotionBox>
                    ))}
                </Stack>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <MotionBox
                        key={activeFilter}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Grid container spacing={3}>
                            {displayProjects.map((p, i) => (
                                <Grid size={{xs: 12 ,sm: 6 ,lg: 4}} key={p.id}>
                                    <MotionBox
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        onHoverStart={() => setHovered(p.id)}
                                        onHoverEnd={() => setHovered(null)}
                                        onClick={() => router.push(`/projects/${p.id}`)}
                                    >
                                        <Box
                                            borderRadius={2}
                                            border="2px solid"
                                            borderColor={hovered === p.id ? theme.palette.primary.main : theme.palette.divider}
                                            bgcolor={theme.palette.background.paper}
                                            sx={{ cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.2s' }}
                                        >
                                            {/* Header */}
                                            <Stack direction="row" justifyContent="space-between" p={2} borderBottom="1px solid" borderColor={theme.palette.divider}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <FolderIcon fontSize="small" />
                                                    <Typography fontFamily="monospace" fontSize={12}>{p.language}</Typography>
                                                </Stack>

                                                <Stack direction="row" spacing={1}>
                                                    {p.demo && (
                                                        <IconButton
                                                            size="small"
                                                            href={p.demo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={`Open live demo for ${p.title}`}
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <OpenInNewIcon fontSize="small" />
                                                        </IconButton>
                                                    )}
                                                    <IconButton
                                                        size="small"
                                                        href={p.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`Open GitHub repository for ${p.title}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <GitHubIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                            </Stack>

                                            {/* Content */}
                                            <Box p={3}>
                                                <Stack direction="row" spacing={1} mb={1}>
                                                    <DescriptionIcon fontSize="small" />
                                                    <Typography fontWeight="600" noWrap>{p.title}</Typography>
                                                </Stack>

                                                <Typography fontSize={13} color="text.secondary" mb={2} sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {p.description}
                                                </Typography>

                                                <Stack direction="row" flexWrap="wrap" gap={0.5} mb={2}>
                                                    {p.tech.slice(0, 3).map((t) => (
                                                        <Chip key={t} label={t} size="small" sx={{ fontFamily: 'monospace', fontSize: { xs: 10, sm: 12 } }} />
                                                    ))}
                                                    {p.tech.length > 3 && <Chip size="small" label={`+${p.tech.length - 3}`} sx={{ fontSize: { xs: 10, sm: 12 } }} />}
                                                </Stack>

                                                <Divider />

                                                <Stack direction="row" spacing={2} mt={2} fontFamily="monospace" fontSize={{ xs: 14, sm: 18 }} color="text.secondary">
                                                    <Stack direction="row" spacing={0.5}>
                                                        <StarIcon fontSize="inherit" />
                                                        <Typography component={"span"} fontSize={{ xs: 10, sm: 12 }}>{p.stars}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={0.5}>
                                                        <CallSplitIcon fontSize="inherit" />
                                                        <Typography component={"span"} fontSize={{ xs: 10, sm: 12 }}>{p.forks}</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Box>

                                            {/* Footer */}
                                            <Stack direction="row" alignItems="center" px={{ xs: 1.5, sm: 2 }} py={1} borderTop="1px solid" borderColor={theme.palette.divider} fontFamily="monospace" fontSize={{ xs: 9, sm: 11 }} color="text.secondary">
                                                Lines: {p.lines}
                                                <Box flexGrow={1} />
                                                <TerminalIcon fontSize="inherit" />
                                            </Stack>
                                        </Box>
                                    </MotionBox>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Project count & Show More/Less */}
                        <Stack alignItems="center" spacing={2} mt={4}>
                            <Typography fontFamily="monospace" fontSize={{ xs: 11, sm: 13 }} color="text.secondary">
                                Showing {displayProjects.length} of {filtered.length} projects
                            </Typography>

                            {hasMore && (
                                <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        onClick={() => setShowAll(!showAll)}
                                        variant="outlined"
                                        endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        sx={{
                                            fontFamily: 'monospace',
                                            fontSize: { xs: 12, sm: 13 },
                                            textTransform: 'none',
                                            px: 3,
                                            py: 1,
                                            borderColor: theme.palette.primary.main,
                                            color: theme.palette.primary.main,
                                            '&:hover': {
                                                borderColor: theme.palette.primary.main,
                                                bgcolor: theme.palette.primary.main + '12',
                                            },
                                        }}
                                    >
                                        {showAll ? 'Show Less' : `View All ${filtered.length} Projects`}
                                    </Button>
                                </MotionBox>
                            )}
                        </Stack>
                    </MotionBox>
                </AnimatePresence>
            </Container>
        </Box>
    );
}
