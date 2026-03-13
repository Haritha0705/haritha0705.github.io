'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

interface TerminalLine {
    type: 'command' | 'output';
    text: string;
}

interface TerminalProps {
    lines?: TerminalLine[];
    autoPlay?: boolean;
    typingSpeed?: number;
}

export function Terminal({
                             lines = [],
                             autoPlay = true,
                             typingSpeed = 500,
                         }: TerminalProps) {
    const theme = useTheme();
    const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!autoPlay || currentIndex >= lines.length) return;

        let active = true;

        const typingIndicator = window.setTimeout(() => {
            if (!active) return;
            setIsTyping(true);
        }, 0);

        const timer = window.setTimeout(() => {
            if (!active) return;
            setDisplayedLines((prev) => [...prev, lines[currentIndex]]);
            setCurrentIndex((prev) => prev + 1);
            setIsTyping(false);
        }, typingSpeed);

        return () => {
            active = false;
            window.clearTimeout(typingIndicator);
            window.clearTimeout(timer);
        };
    }, [currentIndex, lines, autoPlay, typingSpeed]);

    const resetTerminal = useCallback(() => {
        setDisplayedLines([]);
        setCurrentIndex(0);
    }, []);

    return (
        <Box
            sx={{
                borderRadius: { xs: 2, sm: 4 },
                overflow: 'hidden',
                border: 1,
                borderColor: 'divider',
                backgroundColor: 'background.default',
                boxShadow: 6,
            }}
        >
            {/* Terminal Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.75, sm: 1 },
                    borderBottom: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                }}
            >
                <Box sx={{ display: 'flex', gap: { xs: 0.75, sm: 1 } }}>
                    <IconButton
                        onClick={resetTerminal}
                        aria-label="Reset terminal output"
                        sx={{
                            width: { xs: 10, sm: 12 },
                            height: { xs: 10, sm: 12 },
                            minWidth: 0,
                            p: 0,
                            borderRadius: '50%',
                            bgcolor: '#ff5f56',
                            '&:hover': { filter: 'brightness(1.2)' },
                        }}
                    />
                    <Box sx={{ width: { xs: 10, sm: 12 }, height: { xs: 10, sm: 12 }, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                    <Box
                        sx={{
                            width: { xs: 10, sm: 12 },
                            height: { xs: 10, sm: 12 },
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
                        }}
                    />
                </Box>

                <Typography
                    variant="caption"
                    sx={{
                        fontFamily: 'Monospace',
                        fontSize: { xs: 10, sm: 12 },
                        color: theme.palette.text.secondary,
                    }}
                >
                    haritha@dev:~
                </Typography>

                <Box sx={{ width: { xs: 40, sm: 52 } }} />
            </Box>

            {/* Terminal Content */}
            <Box
                sx={{
                    p: { xs: 1.5, sm: 2 },
                    minHeight: { xs: 180, sm: 240 },
                    overflowY: 'auto',
                    fontFamily: 'Monospace',
                    fontSize: { xs: 11, sm: 13 },
                }}
            >
                {displayedLines.map((line, i) => (
                        <Box
                            key={i}
                            sx={{
                                mb: 0.75,
                                opacity: 0,
                                animation: 'terminalLineIn 200ms ease-out forwards',
                                '@keyframes terminalLineIn': {
                                    from: { opacity: 0, transform: 'translateY(6px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' },
                                },
                            }}
                        >
                            {line.type === 'command' ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                    <Typography sx={{ color: theme.palette.primary.main, fontSize: { xs: 11, sm: 13 } }}>❯</Typography>
                                    <Typography sx={{ color: theme.palette.text.primary, fontSize: { xs: 11, sm: 13 } }}>
                                        {line.text}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography sx={{ pl: { xs: 2, sm: 3 }, color: theme.palette.text.secondary, fontSize: { xs: 11, sm: 13 } }}>
                                    {line.text}
                                </Typography>
                            )}
                        </Box>
                    ))}

                {/* Typing indicator */}
                {isTyping && currentIndex < lines.length && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5 }}>
                        <Typography sx={{ color: theme.palette.primary.main, fontSize: { xs: 11, sm: 13 } }}>❯</Typography>
                        <Box
                            sx={{
                                width: 8,
                                height: 14,
                                bgcolor: theme.palette.success.main,
                                animation: 'terminalBlink 0.8s infinite',
                                '@keyframes terminalBlink': {
                                    '0%, 100%': { opacity: 1 },
                                    '50%': { opacity: 0.5 },
                                },
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Terminal;
