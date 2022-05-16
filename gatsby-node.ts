import kebabCase from 'lodash/kebabCase'
import path from 'path'

import type { GatsbyNode, CreateNodeArgs } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'

import { Node as UserNode, PaginationNode } from './src/types'

const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  const postTemplate = path.resolve('src/templates/blog-post.tsx')
  const snapshotsTemplate = path.resolve('src/templates/snapshots.tsx')
  // const tagPage = path.resolve('src/templates/tag-page.tsx')
  const [articlesQuery, snapshotsQuery] = await Promise.all([
    // articles
    graphql<{
      allMdx: {
        edges: {
          previous: PaginationNode
          next: PaginationNode
          node: UserNode
        }[]
      }
    }>(`
      query {
        allMdx(
          filter: {
            fields: { sourceInstanceName: { eq: "articles" } }
            frontmatter: { draft: { ne: true } }
          }
          sort: { fields: [frontmatter___created], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                created
                tags
              }
            }
            previous {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
            next {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `),
    // snapshots
    graphql<{ allMdx: { nodes: UserNode[] } }>(`
      query {
        allMdx(
          filter: {
            fields: { sourceInstanceName: { eq: "snapshots" } }
            frontmatter: { draft: { ne: true } }
          }
        ) {
          nodes {
            id
          }
        }
      }
    `),
  ])

  if (articlesQuery.errors || snapshotsQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      articlesQuery.errors + snapshotsQuery.errors,
    )
    return
  }

  // Create blog posts pages.
  const articles = articlesQuery.data.allMdx.edges
  articles.length > 0
    ? articles.forEach(({ previous, node, next }) => {
        createPage({
          path: '/post' + node.fields.slug,
          component: postTemplate,
          context: {
            slug: node.fields.slug,
            previous,
            next,
          },
        })
      })
    : console.error('No node found for articles!')

  // Create paginated snapshot pages.
  const itemsPerPage = 10
  const digests = snapshotsQuery.data.allMdx.nodes
  const numPages = Math.ceil(digests.length / itemsPerPage)
  digests.length > 0
    ? (createPage({
        path: '/snapshots/',
        component: snapshotsTemplate,
        context: {
          limit: itemsPerPage,
          skip: 0,
          numPages,
          currentPage: 1,
        },
      }),
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: `/snapshots/${i + 1}`,
          component: snapshotsTemplate,
          context: {
            limit: itemsPerPage,
            skip: i * itemsPerPage,
            numPages,
            currentPage: i + 1,
          },
        })
      }))
    : console.error('No node found for snapshots!')

  // Create tag pages.
  // if (articles.length > 0 || digests.length > 0) {
  //   let tags = []
  //   articles.forEach((edge) => {
  //     if (_.get(edge, 'node.frontmatter.tags')) {
  //       tags = tags.concat(edge.node.frontmatter.tags)
  //     }
  //   })
  //   tags = _.uniq(tags)
  //   tags.forEach((tag) => {
  //     const tagPath = `/tags/${_.kebabCase(tag)}/`
  //     createPage({
  //       path: tagPath,
  //       component: tagPage,
  //       context: {
  //         tag,
  //       },
  //     })
  //   })
  // }
}

/**
 * https://www.gatsbyjs.org/docs/creating-slugs-for-pages/#create-slugs-in-gatsby-nodejs
 * https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#generate-slugs
 */
const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  getNode,
  actions,
}: CreateNodeArgs<UserNode>) => {
  // Actually, `UserNode` !== `Node` here, we just reuse some common fields
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode, trailingSlash: false })
    createNodeField({ node, name: 'slug', value: slug })
    // Inspired from <https://github.com/kbravh/gatsby-plugin-mdx-source-name/blob/master/gatsby-node.js>
    // the source name will be on this parent node
    const { sourceInstanceName } = getNode(node.parent)
    createNodeField({
      node,
      name: 'sourceInstanceName',
      value: sourceInstanceName,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map((tag) => '/' + kebabCase(tag))
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }
  }
}

// https://dev.to/mmz001/migrating-gatsby-remark-blog-to-mdx-59oc
const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
}) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/articles" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      title: String!
      author: String!
      nickname: String
      description: String
      url: String!
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
      instagram: String
    }
    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String!
      description: String
      date: Date @dateformat
      created: Date @dateformat
      updated: Date @dateformat
      tags: [String!]
      draft: Boolean
    }
    type Fields {
      slug: String!
      sourceInstanceName: String!
      tagSlugs: [String!]
    }
  `)
}

const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  getConfig,
}) => {
  const config = getConfig()
  const contextSrc = path.join(config.context, 'src')
  // https://webpack.js.org/configuration/resolve/#resolvealias
  // https://webpack.js.org/configuration/resolve/#resolvemodules
  actions.setWebpackConfig({
    resolve: {
      alias: { src: contextSrc },
    },
  })
}

export {
  createPages,
  onCreateNode,
  createSchemaCustomization,
  onCreateWebpackConfig,
}
