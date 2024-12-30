import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    optimizePackageImports: ['es-toolkit'],
    optimizeServerReact: true,
  },
  transpilePackages: ['next-mdx-remote'],
}

export default nextConfig
