'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import Navigation from '@/components/Navigation';
import { useThemeContext } from '@/theme/ThemeProvider';

const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false });
const Toaster = dynamic(() => import('sonner').then((m) => m.Toaster), { ssr: false });

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { toggleTheme } = useThemeContext();
    const [enhancementsReady, setEnhancementsReady] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const idle = (globalThis as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
        const cancelIdle = (globalThis as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;

        const enable = () => {
            if (!cancelled) setEnhancementsReady(true);
        };

        if (typeof idle === 'function' && typeof cancelIdle === 'function') {
            const idleId = idle(enable, { timeout: 1200 });
            return () => {
                cancelled = true;
                cancelIdle(idleId);
            };
        }

        const timeout = setTimeout(enable, 600);
        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            {enhancementsReady && (
                <>
                    <Toaster position="top-right" theme="system" richColors closeButton />
                    <CommandPalette />
                </>
            )}
            <Navigation toggleThemeAction={toggleTheme} />
            {children}
        </Box>
    );
}
