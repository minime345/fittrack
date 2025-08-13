/** @type {import('next').NextConfig} */
const nextConfig = {
  // This ensures output is always in the root `.next` folder for Vercel
  distDir: '.next',

  eslint: {
    // Don't block builds on ESLint errors
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Don't block builds on TypeScript errors (useful for early dev)
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;