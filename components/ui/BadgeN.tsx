'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

interface StatusBadgeProps {
    status: 'available' | 'busy' | 'unavailable';
    label?: string;
}

/* ---------------- Animation ---------------- */
const ping = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

/* ---------------- Component ---------------- */
export default function StatusBadge({ status, label }: StatusBadgeProps) {
    const theme = useTheme();

    const statusConfig = {
        available: {
            color: theme.palette.success.main,
            bg: theme.palette.success.main + '1A',
            border: theme.palette.success.main + '33',
            defaultLabel: 'Available for work',
        },
        busy: {
            color: theme.palette.warning.main,
            bg: theme.palette.warning.main + '1A',
            border: theme.palette.warning.main + '33',
            defaultLabel: 'Currently busy',
        },
        unavailable: {
            color: theme.palette.error.main,
            bg: theme.palette.error.main + '1A',
            border: theme.palette.error.main + '33',
            defaultLabel: 'Unavailable',
        },
    };

    const config = statusConfig[status];

    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.5,
                borderRadius: 999,
                border: `1px solid ${config.border}`,
                backgroundColor: config.bg,
                backdropFilter: theme.custom?.glass?.blur,
            }}
        >
            {/* ---------------- Status Dot ---------------- */}
            <Box sx={{ position: 'relative', width: 8, height: 8 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        backgroundColor: config.color,
                        opacity: 0.75,
                        animation: `${ping} 1.5s infinite`,
                    }}
                />
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: config.color,
                    }}
                />
            </Box>

            {/* ---------------- Label ---------------- */}
            <Typography
                variant="body2"
                sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    background: theme.custom.gradients.text,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    whiteSpace: 'nowrap',
                }}
            >
                {label || config.defaultLabel}
            </Typography>
        </Box>
    );
}
