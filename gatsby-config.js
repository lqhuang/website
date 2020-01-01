module.exports = {
  siteMetadata: {
    title: 'lqhuang.io',
    author: 'Lanqing Huang',
    description: 'A blog to record life',
    siteUrl: 'https://lqhuang.github.io/',
    social: {
      twitter: 'lqhuang1',
      github: 'lqhuang',
      linkedin: 'lqhuang',
      instgram: 'lanqing.huang',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/contents/blog`,
        name: 'blog',
      },
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/contents/assets`,
        name: 'assets',
      },
    }, {
      // markdown rendering
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          }, {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
      // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Lanqing Huang Blog',
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
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
