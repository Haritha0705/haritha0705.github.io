'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '@/theme/theme';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within AppThemeProvider');
    }
    return context;
}

export default function AppThemeProvider({children,}: { children: React.ReactNode; }) {
    const [mode, setMode] = useState<ThemeMode>(() => {
        if (typeof window === 'undefined') return 'dark';
        try {
            const saved = localStorage.getItem('theme');
            if (saved === 'light' || saved === 'dark') return saved;
        } catch {
            // ignore localStorage errors
        }
        return 'dark';
    });

    // Sync html class for Tailwind
    useEffect(() => {
        document.documentElement.classList.toggle('dark', mode === 'dark');
        localStorage.setItem('theme', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const theme = useMemo(
        () => (mode === 'dark' ? darkTheme : lightTheme),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
