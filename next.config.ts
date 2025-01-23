import type { NextConfig } from 'next'

const now = new Date()
const buildId = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    // optimizePackageImports: ['es-toolkit'],
    optimizeServerReact: true,
  },
  output: 'export',
  distDir: `dist/out-${buildId}`,
}

export default nextConfig
