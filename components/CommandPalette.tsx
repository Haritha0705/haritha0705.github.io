'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box,
    Paper,
    TextField,
    Typography,
    ButtonBase,
    IconButton,
    useTheme,
} from '@mui/material';
import { Search, Terminal, Close } from '@mui/icons-material';
import { commands } from '@/data/content';

const MotionBox = motion(Box);

export default function CommandPalette() {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(0);

    const filtered = commands.filter(
        (cmd) =>
            cmd.label.toLowerCase().includes(search.toLowerCase()) ||
            cmd.keywords.toLowerCase().includes(search.toLowerCase())
    );

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
        setSearch('');
    };

    /* ---------------- Keyboard shortcuts ---------------- */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen((p) => !p);
            }

            if (!open) return;

            if (e.key === 'Escape') setOpen(false);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelected((p) => (p + 1) % filtered.length);
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelected((p) => (p - 1 + filtered.length) % filtered.length);
            }

            if (e.key === 'Enter') {
                e.preventDefault();
                if (filtered[selected]) {
                    scrollTo(filtered[selected].action);
                }
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, selected, filtered]);

    useEffect(() => {
        const resetSelection = () => {
            setSelected(0);
        };
        resetSelection();
    }, [search]);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <>
                        {/* ---------------- Backdrop ---------------- */}
                        <MotionBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            sx={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 1200,
                                backdropFilter: theme.custom.glass.blur,
                                backgroundColor: 'rgba(0,0,0,0.45)',
                            }}
                        />

                        {/* ---------------- Palette ---------------- */}
                        <MotionBox
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            sx={{
                                position: 'fixed',
                                top: { xs: '10%', sm: '20%' },
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 1300,
                                width: { xs: '95%', sm: '90%' },
                                maxWidth: 640,
                            }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: { xs: 2, sm: 3 },
                                    overflow: 'hidden',
                                    background: theme.custom.glass.background,
                                    backdropFilter: theme.custom.glass.blur,
                                    border: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                {/* -------- Search -------- */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        px: { xs: 1.5, sm: 2 },
                                        py: { xs: 1, sm: 1.5 },
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                    }}
                                >
                                    <Search sx={{ fontSize: { xs: 18, sm: 20 } }} />

                                    <TextField
                                        variant="standard"
                                        placeholder="Type a command or search…"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        autoFocus
                                        slotProps={{
                                            input: { disableUnderline: true },
                                        }}
                                        sx={{
                                            ml: { xs: 1.5, sm: 2 },
                                            flex: 1,
                                            fontFamily: 'monospace',
                                            '& .MuiInputBase-input': {
                                                fontSize: { xs: 13, sm: 14 },
                                            },
                                        }}
                                    />

                                    <IconButton size="small" onClick={() => setOpen(false)}>
                                        <Close sx={{ fontSize: { xs: 18, sm: 20 } }} />
                                    </IconButton>
                                </Box>

                                {/* -------- Commands -------- */}
                                <Box sx={{ maxHeight: { xs: 280, sm: 360 }, overflowY: 'auto' }}>
                                    {filtered.length === 0 ? (
                                        <Typography
                                            sx={{
                                                textAlign: 'center',
                                                py: { xs: 3, sm: 4 },
                                                color: 'text.secondary',
                                                fontSize: { xs: 12, sm: 14 },
                                            }}
                                        >
                                            No commands found
                                        </Typography>
                                    ) : (
                                        filtered.map((cmd, i) => (
                                            <ButtonBase
                                                key={cmd.label}
                                                onClick={() => scrollTo(cmd.action)}
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: { xs: 1.5, sm: 2 },
                                                    px: { xs: 1.5, sm: 2 },
                                                    py: { xs: 1, sm: 1.5 },
                                                    textAlign: 'left',
                                                    backgroundColor:
                                                        i === selected
                                                            ? 'action.selected'
                                                            : 'transparent',
                                                    color:
                                                        i === selected
                                                            ? 'primary.main'
                                                            : 'text.primary',
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                    },
                                                }}
                                            >
                                                <Box sx={{ fontSize: { xs: 18, sm: 20 }, display: 'flex', alignItems: 'center' }}>{cmd.icon}</Box>
                                                <Typography fontSize={{ xs: 12, sm: 14 }}>{cmd.label}</Typography>
                                            </ButtonBase>
                                        ))
                                    )}
                                </Box>

                                {/* -------- Footer -------- */}
                                <Box
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: { xs: 0.75, sm: 1 },
                                        borderTop: `1px solid ${theme.palette.divider}`,
                                        display: { xs: 'none', sm: 'flex' },
                                        justifyContent: 'space-between',
                                        fontSize: { xs: 10, sm: 12 },
                                        color: 'text.secondary',
                                        fontFamily: 'monospace',
                                    }}
                                >
                                    <Typography fontSize={{ xs: 10, sm: 12 }}>↑↓ navigate</Typography>
                                    <Typography fontSize={{ xs: 10, sm: 12 }}>↵ select</Typography>
                                    <Typography fontSize={{ xs: 10, sm: 12 }}>ESC close</Typography>
                                </Box>
                            </Paper>
                        </MotionBox>
                    </>
                )}
            </AnimatePresence>

            {/* ---------------- Hint Button ---------------- */}
            <ButtonBase
                onClick={() => setOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    left: 24,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: 'background.paper',
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    gap: 1,
                    fontFamily: 'monospace',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <Terminal fontSize="small" />
                <Typography variant="caption">⌘ K</Typography>
            </ButtonBase>
        </>
    );
}
