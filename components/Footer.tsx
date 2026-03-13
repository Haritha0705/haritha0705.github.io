"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box,
    Container,
    Typography,
    Stack,
    IconButton,
    Divider,
    Button,
    useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { footerLinks, socialLinksFooter } from '@/data/content';

const MotionBox = motion.create(Box);

export default function Footer() {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        if (pathname !== '/') {
            router.push('/');
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (href: string) => {
        const sectionId = href.replace('#', '');

        // If we're not on the homepage, navigate there with hash
        if (pathname !== '/') {
            router.push(`/#${sectionId}`);
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
    };

    return (
        <Box
            component="footer"
            bgcolor={theme.palette.background.default}
            borderTop={1}
            borderColor={theme.palette.divider}
            position="relative"
            pt={{ xs: 4, sm: 6, md: 8 }}
            pb={{ xs: 4, sm: 5, md: 6 }}
            px={{ xs: 1.5, sm: 2 }}
        >
            <Container maxWidth="lg">
                {/* Main Content */}
                <Box
                    display="grid"
                    gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }}
                    gap={{ xs: 3, sm: 4, md: 6 }}
                    mb={{ xs: 3, sm: 4, md: 6 }}
                >
                    {/* Brand & Social */}
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            mb={{ xs: 1.5, sm: 2 }}
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                                background: theme.custom.gradients.text,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Haritha Wickremesinghe
                        </Typography>
                        <Typography fontSize={{ xs: 12, sm: 14 }} mb={{ xs: 1.5, sm: 2 }} color="text.secondary">
                            Full Stack Developer passionate about creating elegant solutions to complex problems.
                        </Typography>
                        <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} flexWrap="wrap">
                            {socialLinksFooter.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <MotionBox
                                        key={s.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <IconButton
                                            component="a"
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit Haritha Wickremesinghe on ${s.label}`}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: theme.palette.divider,
                                                backgroundColor: theme.palette.background.paper,
                                                width: { xs: 36, sm: 40 },
                                                height: { xs: 36, sm: 40 },
                                                '&:hover': { backgroundColor: theme.palette.primary.main, color: '#fff' },
                                            }}
                                        >
                                            <Icon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                                        </IconButton>
                                    </MotionBox>
                                );
                            })}
                        </Stack>
                    </MotionBox>

                    {/* Quick Links */}
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Typography fontWeight="bold" mb={{ xs: 1, sm: 1.5 }} fontSize={{ xs: 14, sm: 16 }}>
                            Quick Links
                        </Typography>
                        <Stack spacing={{ xs: 0.5, sm: 1 }}>
                            {footerLinks.map((link, i) => (
                                <MotionBox
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Button
                                        onClick={() => scrollToSection(link.href)}
                                        sx={{
                                            textTransform: 'none',
                                            color: theme.palette.text.secondary,
                                            fontSize: { xs: 12, sm: 14 },
                                            '&:hover': {
                                                color: theme.palette.primary.main,
                                                backgroundColor: 'transparent',
                                            },
                                            p: 0,
                                            minWidth: 0,
                                        }}
                                    >
                                        {link.label}
                                    </Button>
                                </MotionBox>
                            ))}
                        </Stack>
                    </MotionBox>

                    {/* Contact Info */}
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Typography fontWeight="bold" mb={{ xs: 1, sm: 1.5 }} fontSize={{ xs: 14, sm: 16 }}>
                            Get in Touch
                        </Typography>
                        <Stack
                            spacing={0.5}
                            color="text.secondary"
                            sx={{ alignItems: 'flex-start' }}
                        >
                            <Button
                                component="a"
                                href="mailto:harithawikramasinha2003@gmail.com"
                                sx={{ textTransform: 'none', p: 0, minWidth: 0, color: 'inherit', justifyContent: 'flex-start', fontSize: { xs: 12, sm: 14 } }}
                            >
                                harithawikramasinha2003@gmail.com
                            </Button>

                            <Button
                                component="a"
                                href="tel:+94785156282"
                                sx={{ textTransform: 'none', p: 0, minWidth: 0, color: 'inherit', justifyContent: 'flex-start', fontSize: { xs: 12, sm: 14 } }}
                            >
                                +94 785 156 282
                            </Button>

                            <Typography fontSize={{ xs: 12, sm: 14 }}>
                                Colombo, Sri Lanka
                            </Typography>
                        </Stack>
                    </MotionBox>
                </Box>

                <Divider sx={{ my: { xs: 2, sm: 3 } }} />

                {/* Bottom */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={{ xs: 0.5, sm: 1 }}
                >
                    <MotionBox initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <Typography fontSize={{ xs: 10, sm: 12 }} textAlign={{ xs: 'center', sm: 'left' }}>
                            © {currentYear} Haritha Wickremesinghe. All rights reserved.
                        </Typography>
                    </MotionBox>

                    <MotionBox
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                    >
                        <Typography fontSize={{ xs: 10, sm: 12 }}>Built with</Typography>
                        <FavoriteIcon sx={{ fontSize: { xs: 14, sm: 18 }, animation: 'pulse 1.5s infinite' }} color="primary" />
                        <Typography fontSize={{ xs: 10, sm: 12 }}>and</Typography>
                        <Typography fontSize={{ xs: 10, sm: 12 }} fontWeight="medium" color="primary">
                            Next JS
                        </Typography>
                    </MotionBox>
                </Stack>
            </Container>

            {/* Back to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <MotionBox
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{
                            position: 'fixed',
                            bottom: { xs: 12, sm: 16 },
                            right: { xs: 12, sm: 16 },
                            zIndex: 1100,
                        }}
                    >
                        <IconButton
                            onClick={scrollToTop}
                            aria-label="Scroll back to top"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: '#fff',
                                width: { xs: 40, sm: 48 },
                                height: { xs: 40, sm: 48 },
                                '&:hover': { backgroundColor: theme.palette.primary.dark },
                            }}
                        >
                            <ArrowUpwardIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                        </IconButton>
                    </MotionBox>
                )}
            </AnimatePresence>
        </Box>
    );
}
