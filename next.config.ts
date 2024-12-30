import type { NextConfig } from 'next'

import { createContentCollectionPlugin } from '@content-collections/next'

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

const withContentCollections = createContentCollectionPlugin({
  configPath: './content-collections.ts',
})

export default withContentCollections(nextConfig)
