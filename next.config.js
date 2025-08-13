/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Allow production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Allow production builds to complete even if there are TypeScript errors.
    //    Use with caution — better to fix errors when possible.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;