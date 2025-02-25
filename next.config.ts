import type { NextConfig } from 'next'

import createMDX from '@next/mdx'

// const now = new Date()
// const buildId = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    // optimizePackageImports: ['es-toolkit'],
    optimizeServerReact: true,
    mdxRs: true,
  },
  output: 'export',
  // distDir: `dist/out-${buildId}`,
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)
