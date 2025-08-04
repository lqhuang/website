import type { NextConfig } from 'next'

// import { createMDX } from 'fumadocs-mdx/next'

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

// const withMDX = createMDX({
//   configPath: `${import.meta.dirname}/src/content/source.ts`,
//   outDir: `${import.meta.dirname}/src/content/data/`,
// })

const nextConfig: NextConfig = {
  // Dev
  reactStrictMode: true,
  allowedDevOrigins: ['*'],

  pageExtensions: ['ts', 'tsx', 'mdx'],
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  transpilePackages: ['next-mdx-remote', 'shiki'],
  experimental: {
    // typedRoutes: true, // conflict with `--turbopack` now
    viewTransition: true,
    useCache: true,
    // useLightningcss: true,
  },
  output: 'export',
  // distDir: `dist/out-${buildId}`,

  /**
   * ....
   *
   * Warn: Specified "headers" will not automatically work with "output: export".
   *       See more info here: https://nextjs.org/docs/messages/export-no-custom-routes
   */
  // headers: async () => [
  //   {
  //     source: '/(.*)',
  //     headers: [
  //       {
  //         key: 'Content-Security-Policy',
  //         value: cspHeader.replace(/\s+/g, ' ').trim(),
  //       },
  //       {
  //         key: 'Permissions-Policy',
  //         value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  //       },
  //       {
  //         key: 'Referrer-Policy',
  //         value: 'origin-when-cross-origin',
  //       },
  //       {
  //         key: 'X-Content-Type-Options',
  //         value: 'nosniff',
  //       },
  //       {
  //         key: 'X-DNS-Prefetch-Control',
  //         value: 'on',
  //       },
  //       {
  //         key: 'X-Frame-Options',
  //         value: 'SAMEORIGIN',
  //       },
  //     ],
  //   },
  // ],
}

// export default withMDX(nextConfig)
export default nextConfig
