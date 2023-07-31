// @ts-check
import withNextra from 'nextra'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    legacyBrowsers: false,
    // browsersListForSwc: true,
  },
}

/**
 * @type {import('nextra').NextraConfig}
 */
const nextraConfig = {
  theme: './src/theme/index.tsx',
  themeConfig: './theme.config.tsx',
  // defaultShowCopyCode: true,
  // staticImage: true,
  // codeHighlight: true,
}

export default withNextra(nextraConfig)(nextConfig)
