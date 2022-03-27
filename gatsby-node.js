const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#removing-trailing-slashes
const replacePath = (pagePath) =>
  pagePath === '/' ? pagePath : pagePath.replace(/\/$/, '')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPost = path.resolve('src/templates/blog-post.jsx')
  const tagPage = path.resolve('src/templates/tag-page.jsx')
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { draft: { ne: true } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `,
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    )
    return
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  posts.length > 0 &&
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: replacePath(post.node.fields.slug),
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

  // Create tag pages.
  if (posts.length > 0) {
    let tags = []
    posts.forEach((edge) => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    tags = _.uniq(tags)
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`
      createPage({
        path: tagPath,
        component: tagPage,
        context: {
          tag,
        },
      })
    })
  }
}

/**
 * https://www.gatsbyjs.org/docs/creating-slugs-for-pages/#create-slugs-in-gatsby-nodejs
 * https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#generate-slugs
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        (tag) => `/tags/${_.kebabCase(tag)}/`,
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }
  }
}

// https://dev.to/mmz001/migrating-gatsby-remark-blog-to-mdx-59oc
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      title: String
      author: String # Author
      siteUrl: String
      social: Social
    }
    # type Author {
    #   name: String
    #   summary: String
    # }
    type Social {
      twitter: String
      github: String
      linkedin: String
    }
    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }
    type Fields {
      slug: String
    }
  `)
}

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()
  const contextSrc = path.join(config.context, 'src')
  // https://webpack.js.org/configuration/resolve/#resolvealias
  // https://webpack.js.org/configuration/resolve/#resolvemodules
  actions.setWebpackConfig({
    resolve: {
      alias: { src: contextSrc },
      // modules: [path.resolve(__dirname), "node_modules"],
    },
  })
}
