import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  transpilePackages: ['next-mdx-remote', 'shiki'],
  experimental: { viewTransition: true, useCache: true },
  output: 'export',
  // distDir: `dist/out-${buildId}`,
}

export default nextConfig
