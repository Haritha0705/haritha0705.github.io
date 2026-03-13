'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { terminalLines, socialLinks, SocialLink } from '@/data/hero';
import StatusBadge from '@/components/ui/BadgeN';
import Terminal from '@/components/ui/Terminal';

const TITLES = ['Full Stack Developer', 'Student', 'Tech Enthusiast'];
const MotionBox = motion(Box);

/* ---------------- Matrix data ---------------- */
const generateBinaryStrings = () =>
    Array.from({ length: 8 }, (_, i) => {
        let seed = i * 12345;
        return Array.from({ length: 12 }, () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed % 2 === 0 ? '1' : '0';
        }).join('');
    });
const BINARY_STRINGS = generateBinaryStrings();

const ANIMATION_CONFIG = Array.from({ length: 8 }, (_, i) => ({
    duration: 5 + (i % 5),
    delay: (i * 0.5) % 5,
}));

export default function Hero() {
    const theme = useTheme();

    const [displayedText, setDisplayedText] = useState('');
    const [titleIndex, setTitleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = window.setTimeout(() => setMounted(true), 0);
        return () => window.clearTimeout(id);
    }, []);

    useEffect(() => {
        if (isPaused) {
            const pauseTimer = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 2000);
            return () => clearTimeout(pauseTimer);
        }

        const currentTitle = TITLES[titleIndex];
        const typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayedText.length < currentTitle.length) {
                    setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
                } else {
                    setIsPaused(true);
                }
            } else {
                if (displayedText.length > 0) {
                    setDisplayedText(displayedText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setTitleIndex((prev) => (prev + 1) % TITLES.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, titleIndex, isPaused]);

    return (
        <Box
            component="section"
            id="home"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.default,
                px: { xs: 2.5, sm: 4 },
                pt: { xs: 10, sm: 4 },
                pb: { xs: 6, sm: 4 },
            }}
        >
            {/* ---------------- Matrix Background ---------------- */}
            {mounted && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        opacity: { xs: theme.matrixOpacity * 0.5, sm: theme.matrixOpacity },
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.5rem', sm: '0.75rem', md: '0.875rem' },
                    }}
                >
                    {BINARY_STRINGS.map((binary, i) => (
                        <MotionBox
                            key={i}
                            sx={{
                                position: 'absolute',
                                left: { xs: `${(i / BINARY_STRINGS.length) * 100}%`, sm: i * 150 },
                                color: theme.palette.primary.main,
                                willChange: 'transform',
                            }}
                            initial={{ y: -100 }}
                            animate={{ y: '100vh' }}
                            transition={{
                                duration: ANIMATION_CONFIG[i].duration,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: ANIMATION_CONFIG[i].delay,
                            }}
                        >
                            {binary}
                        </MotionBox>
                    ))}
                </Box>
            )}

            {/* ---------------- Particle Grid ---------------- */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: 0.1,
                    backgroundImage: `radial-gradient(circle, ${theme.palette.primary.main} 1px, transparent 1px)`,
                    backgroundSize: { xs: '24px 24px', sm: '30px 30px', md: '40px 40px' },
                }}
            />

            {/* ---------------- Content ---------------- */}
            <Box
                sx={{
                    maxWidth: '1280px',
                    mx: 'auto',
                    position: 'relative',
                    zIndex: 10,
                    width: '100%',
                    py: { xs: 4, sm: 8, md: 12 },
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                        gap: { xs: 4, sm: 6, lg: 8 },
                        alignItems: 'center',
                    }}
                >
                    {/* ---------------- Left Content ---------------- */}
                    <MotionBox
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        sx={{
                            textAlign: { xs: 'center', sm: 'center', lg: 'left' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', lg: 'flex-start' },
                        }}
                    >
                        <StatusBadge status="available" />

                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '4rem' },
                                lineHeight: { xs: 1.15, sm: 1.2, md: 1.3 },
                                background: theme.custom.gradients.text,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                wordBreak: 'break-word',
                            }}
                        >
                            Haritha Wickremesinghe
                        </Typography>

                        {/* Typing line */}
                        <Box
                            sx={{
                                mt: { xs: 1.5, sm: 2 },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: { xs: 'center', lg: 'flex-start' },
                                gap: { xs: 0.5, sm: 1 },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'monospace',
                                    fontSize: { xs: '0.9rem', sm: '1.25rem', md: '1.5rem' },
                                    color: theme.palette.secondary.main,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {'>'} {displayedText}
                            </Typography>

                            <MotionBox
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                                sx={{
                                    width: 2,
                                    height: { xs: 18, sm: 28 },
                                    backgroundColor: theme.palette.primary.main,
                                    flexShrink: 0,
                                }}
                            />
                        </Box>

                        {/* Paragraph */}
                        <Typography
                            sx={{
                                mt: { xs: 2, sm: 2 },
                                maxWidth: { xs: 380, sm: 500, md: 520 },
                                lineHeight: 1.7,
                                fontSize: { xs: 13, sm: 14, md: 16 },
                                color: theme.palette.text.secondary,
                            }}
                        >
                            Software Engineering undergraduate at IIT, currently interning as a React Developer.
                            Building scalable full-stack applications with React, Next.js, Node.js, and TypeScript.
                        </Typography>

                        {/* ---------------- CTA Buttons ---------------- */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'row', sm: 'row' },
                                gap: { xs: 1.5, sm: 2 },
                                mt: { xs: 3, sm: 4 },
                                width: { xs: '100%', sm: 'auto' },
                                justifyContent: { xs: 'center', lg: 'flex-start' },
                            }}
                        >
                            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} sx={{ flex: { xs: 1, sm: 'none' } }}>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowRightAltIcon />}
                                    fullWidth
                                    onClick={() => {
                                        const el = document.getElementById('projects');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    sx={{
                                        px: { xs: 2, sm: 4 },
                                        py: { xs: 1.5, sm: 1.5 },
                                        borderRadius: 2,
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.background.default,
                                        fontSize: { xs: 13, sm: 14 },
                                        fontWeight: 600,
                                        '&:hover': { backgroundColor: theme.palette.primary.dark },
                                    }}
                                >
                                    View Projects
                                </Button>
                            </MotionBox>

                            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} sx={{ flex: { xs: 1, sm: 'none' } }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<DownloadIcon />}
                                    fullWidth
                                    component="a"
                                    href="/Haritha _Wickremesinghe.pdf"
                                    download
                                    sx={{
                                        px: { xs: 2, sm: 4 },
                                        py: { xs: 1.5, sm: 1.5 },
                                        borderRadius: 2,
                                        borderColor: theme.palette.secondary.main,
                                        color: theme.palette.secondary.main,
                                        fontSize: { xs: 13, sm: 14 },
                                        fontWeight: 600,
                                        '&:hover': { backgroundColor: theme.palette.action.hover },
                                    }}
                                >
                                    Download CV
                                </Button>
                            </MotionBox>
                        </Box>

                        {/* ---------------- Social Links ---------------- */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: { xs: 1, sm: 1.5 },
                                mt: { xs: 3, sm: 4 },
                                justifyContent: { xs: 'center', lg: 'flex-start' },
                            }}
                        >
                            {socialLinks.map((link: SocialLink) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '8px 14px',
                                        borderRadius: 10,
                                        border: `1px solid ${theme.palette.divider}`,
                                        backgroundColor: theme.palette.background.paper,
                                        textDecoration: 'none',
                                    }}
                                >
                                    <link.icon style={{ fontSize: 18, color: theme.palette.primary.main }} />
                                    <Typography sx={{ fontSize: { xs: 12, sm: 13 }, color: theme.palette.text.primary }}>{link.label}</Typography>
                                </motion.a>
                            ))}
                        </Box>
                    </MotionBox>

                    {/* ---------------- Right Terminal ---------------- */}
                    <MotionBox
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        sx={{
                            maxWidth: { xs: '100%', lg: '100%' },
                            overflowX: 'hidden',
                        }}
                    >
                        <Terminal lines={terminalLines} />
                    </MotionBox>
                </Box>
            </Box>
        </Box>
    );
}
