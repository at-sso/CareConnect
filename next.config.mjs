/**
 * Next.js Configuration
 *
 * This file configures Next.js for the application.
 * It includes settings for output, experimental features, and build-time checks.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for better Docker compatibility
  output: "standalone",

  // Experimental features
  experimental: {
    serverActions: {
      // Allow server actions from specific origins
      allowedOrigins: ["localhost:3000"],
    },
  },

  // Temporarily ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Temporarily ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
