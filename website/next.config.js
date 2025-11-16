/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds, not for development
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Optimize bundle
  experimental: {
    optimizePackageImports: ['react-syntax-highlighter'],
  },
  // Reduce JavaScript bundle size
  swcMinify: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig

