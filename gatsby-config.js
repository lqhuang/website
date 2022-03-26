module.exports = {
  siteMetadata: {
    title: 'lqhuang.io',
    author: 'Lanqing Huang',
    description: 'A blog to record life',
    siteUrl: 'https://lqhuang.github.io/',
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
        path: `${__dirname}/contents/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/contents/assets`,
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
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          // 'gatsby-remark-smartypants',
        ],
        remarkPlugins: [import('remark-math')],
        rehypePlugins: [
          import('rehype-slug'),
          [
            import('rehype-autolink-headings'),
            { behavior: 'prepend', content: { type: 'text', value: '#' } },
          ],
          [
            import('rehype-katex'),
            // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
            { strict: 'ignore' },
          ],
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
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
  ],
}
