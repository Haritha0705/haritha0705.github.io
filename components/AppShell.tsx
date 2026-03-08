'use client';

import { Box } from '@mui/material';
import { Toaster } from 'sonner';
import Navigation from '@/components/Navigation';
import CommandPalette from '@/components/CommandPalette';
import { useThemeContext } from '@/theme/ThemeProvider';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { toggleTheme } = useThemeContext();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Toaster
                position="top-right"
                theme="system"
                richColors
                closeButton
            />
            <CommandPalette />
            <Navigation toggleTheme={toggleTheme} />
            {children}
        </Box>
    );
}

