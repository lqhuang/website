import path from 'path'
import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  trailingSlash: 'ignore',
  siteMetadata: {
    title: 'lqhuang.io',
    author: 'Lanqing Huang',
    email: 'lqhuang@outlook.com',
    description: 'A blog to record life',
    url: 'https://lqhuang.github.io/',
    social: {
      twitter: '_lqhuang',
      github: 'lqhuang',
      linkedin: 'lqhuang',
      instgram: 'lanqing.huang',
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        // jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve('contents/blog'),
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve('contents/assets'),
        name: 'assets',
      },
    },
    {
      // markdown rendering
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          'gatsby-remark-images',
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
    'gatsby-plugin-sharp',
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     // trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    'gatsby-plugin-theme-ui',
    'gatsby-theme-style-guide',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Blog of Lanqing Huang',
        short_name: 'lqhuang-blog',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'contents/assets/gatsby-icon.svg',
      },
    },
    'gatsby-plugin-offline', // If you’re using this plugin with gatsby-plugin-manifest (recommended) this plugin should be listed after that plugin so the manifest file can be included in the service worker.
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-pnpm',
  ],
  jsxRuntime: 'automatic',
}

export default config
