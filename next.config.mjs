// @ts-check
import withNextra from 'nextra'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  legacyBrowsers: false,
  poweredByHeader: false,

  experimental: {
    // legacyBrowsers: false,
    // browsersListForSwc: true,
  },
}

/**
 * @type {import('nextra').NextraConfig}
 */
const nextraConfig = {
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.tsx',
}

export default withNextra(nextraConfig)(nextConfig)
