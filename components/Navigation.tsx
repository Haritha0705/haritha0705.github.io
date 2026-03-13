'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Typography,
    Button,
    Drawer,
    useTheme,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { navItems } from '@/data/navigation';

const MotionBox = motion.create(Box);

export default function Navigation({ toggleThemeAction }: { toggleThemeAction: () => void }) {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState('home');

    /* Scroll detection — throttled with rAF to avoid jank */
    useEffect(() => {
        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                setScrolled(window.scrollY > 50);

                const scrollY = window.scrollY;
                for (const item of navItems) {
                    const el = document.getElementById(item.id);
                    if (!el) continue;
                    const top = el.offsetTop - 100;
                    const bottom = top + el.offsetHeight;
                    if (scrollY >= top && scrollY < bottom) {
                        setActive(item.id);
                        break;
                    }
                }

                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id: string) => {
        setMobileOpen(false);

        // If we're not on the homepage, navigate there with hash
        if (pathname !== '/') {
            router.push(`/#${id}`);
            return;
        }

        const el = document.getElementById(id);
        if (!el) return;

        window.scrollTo({
            top: el.offsetTop - 80,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {/* Navbar */}
            <AppBar
                component={motion.nav}
                aria-label="Main navigation"
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                position="fixed"
                elevation={scrolled ? 4 : 0}
                color="transparent"
                sx={{
                    backdropFilter: scrolled ? 'blur(10px)' : 'none',
                    borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
                    px: 4,
                    py: 1,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 }, px: { xs: 0, sm: 1 } }}>
                    {/* Logo */}
                    <Typography
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => scrollTo('home')}
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: 14, sm: 16, md: 18 },
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none',
                            color: theme.custom.gradients.text,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        @Haritha0705
                    </Typography>

                    {/* Desktop Nav */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                sx={{
                                    color:
                                        active === item.id
                                            ? theme.palette.primary.main
                                            : theme.palette.text.secondary,
                                    fontWeight: active === item.id ? 600 : 400,
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Right actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* Theme toggle */}
                        <IconButton
                            onClick={toggleThemeAction}
                            aria-label={theme.palette.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            <AnimatePresence mode="wait">
                                <MotionBox
                                    key={theme.palette.mode}
                                    initial={{ rotate: theme.palette.mode === 'dark' ? 90 : -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: theme.palette.mode === 'dark' ? -90 : 90, opacity: 0 }}
                                >
                                    {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                                </MotionBox>
                            </AnimatePresence>
                        </IconButton>

                        {/* Mobile menu */}
                        <IconButton
                            sx={{ display: { md: 'none' } }}
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open navigation menu"
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-navigation-drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                id="mobile-navigation-drawer"
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: theme.palette.background.paper,
                            width: { xs: '100%', sm: 300 },
                            maxWidth: '100vw',
                        }
                    }
                }}
            >
                <Box sx={{ width: '100%', p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {navItems.map((item, i) => (
                            <Button
                                key={item.id}
                                component={motion.button}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => scrollTo(item.id)}
                                fullWidth
                                sx={{
                                    justifyContent: 'flex-start',
                                    fontSize: { xs: 16, sm: 18 },
                                    py: 1.5,
                                    color:
                                        active === item.id
                                            ? theme.palette.primary.main
                                            : theme.palette.text.primary,
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
