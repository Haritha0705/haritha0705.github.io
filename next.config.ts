import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",

    // Smaller response headers
    poweredByHeader: false,

    // Enable gzip/brotli compression
    compress: true,

    // Image optimization — allow Medium CDN for blog thumbnails
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn-images-1.medium.com' },
        ],
        formats: ['image/avif', 'image/webp'],
    },

    // Security + caching headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
            {
                // Aggressively cache static assets (images, fonts, icons)
                source: '/:path*.(ico|png|jpg|jpeg|svg|webp|avif|woff|woff2|ttf)',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                // Cache PDF resume for 1 day
                source: '/:path*.pdf',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
                ],
            },
        ];
    },
};

export default nextConfig;
