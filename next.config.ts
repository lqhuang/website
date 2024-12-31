import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    optimizePackageImports: ['es-toolkit'],
    optimizeServerReact: true,
  },
  // output: 'export',
}

export default nextConfig
