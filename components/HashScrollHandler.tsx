'use client';

import { useEffect } from 'react';

export default function HashScrollHandler() {
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return;

        // Delay slightly so lazily loaded sections can mount first.
        const timeout = window.setTimeout(() => {
            const el = document.getElementById(hash);
            if (!el) return;

            window.scrollTo({
                top: el.offsetTop - 80,
                behavior: 'smooth',
            });
        }, 300);

        return () => window.clearTimeout(timeout);
    }, []);

    return null;
}

