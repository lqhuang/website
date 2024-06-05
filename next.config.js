// @ts-check
import { createContentCollectionPlugin } from '@content-collections/next'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    // browsersListForSwc: true,
  },
}

const withContentCollections = createContentCollectionPlugin({
  configPath: './content-collections.ts',
})

export default withContentCollections(nextConfig)
