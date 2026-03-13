import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",

    experimental: {
        optimizePackageImports: ["@mui/material", "@mui/icons-material", "framer-motion"],
    },

    // Smaller response headers
    poweredByHeader: false,

    // Enable gzip/brotli compression
    compress: true,

    // Static export requires unoptimized images (no server-side optimization)
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
