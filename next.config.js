// @ts-check

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

export default nextConfig
