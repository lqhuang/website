import path from 'path'
import type { GatsbyConfig } from 'gatsby'

import { appleLight } from './src/gatsby-plugin-theme-ui/colors'

const contentsDir = process.env.CONTENTS_DIR
  ? process.env.CONTENTS_DIR
  : 'examples'

const siteMetadata = {
  title: 'lqhuang.io',
  author: 'Lanqing Huang',
  nickname: 'lqhuang',
  email: 'lqhuang@outlook.com',
  description: 'A blog to record coding life',
  url: 'https://lqhuang.github.io/',
  social: {
    twitter: '_lqhuang',
    github: 'lqhuang',
    linkedin: 'lqhuang',
    instgram: 'lanqing.huang',
  },
}

const config: GatsbyConfig = {
  trailingSlash: 'ignore',
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        // jsxPragma: 'jsx', // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(`${contentsDir}/assets`),
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(`${contentsDir}/articles`),
        name: 'articles',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(`${contentsDir}/snapshots`),
        name: 'snapshots',
      },
    },
    {
      // markdown rendering
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              // maxWidth: 400,
              // backgroundColor: 'transparent',
              // quality: 90,
              // wrapperStyle: "width: '90%'",
            },
          },
          // 'gatsby-remark-copy-linked-files',
          // 'gatsby-remark-katex',
        ],
        remarkPlugins: [],
        rehypePlugins: [
          // import('rehype-slug'),
        ],
      },
    },
    'gatsby-transformer-sharp',
    // 'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-theme-ui',
    'gatsby-theme-style-guide',
    /**
     * For `gatsby-plugin-offline`:
     * If you’re using this plugin with`gatsby-plugin-manifest`
     * (recommended) this plugin should be listed after that plugin
     * so the manifest file can be included in the service worker.
     */
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.description,
        short_name: siteMetadata.title,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: appleLight.primary,
        display: 'minimal-ui',
        icon: path.resolve('static/favicon.svg'),
        legacy: false, // this will not add apple-touch-icon links to <head>
        cache_busting_mode: 'none', // for 'gatsby-plugin-offline'
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/icon-path*'],
        },
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-pnpm',
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     // trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
  ],
  jsxRuntime: 'automatic',
}

export default config
