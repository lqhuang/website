/** @jsxImportSource theme-ui */
import { Link, graphql, PageProps } from 'gatsby'

import Layout from 'src/components/layout'
import SEO from 'src/components/seo'

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

interface PageData {
  site: {
    siteMetadata: {
      title: string
      author: string
    }
  }
  allMdx: {
    edges: {
      node: {
        excerpt: string
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          created: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data }: PageProps<PageData>) => {
  const { author } = data.site.siteMetadata
  const posts = data.allMdx.edges

  return (
    <Layout>
      <SEO title="All posts" keywords={['blog', author]} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug} sx={{ marginBottom: 4 }}>
            <h3
              sx={{
                ':before': {
                  content: '"# "',
                  color: 'secondary',
                },
              }}
            >
              <Link
                sx={{
                  textDecoration: 'none',
                  ':hover': {
                    textDecoration: 'underline',
                    textDecorationSkip: 'ink',
                    textDecorationSkipInk: 'all',
                    textUnderlineOffset: '12%',
                  },
                }}
                style={{ boxShadow: 'none' }}
                to={node.fields.slug}
              >
                {title}
              </Link>
            </h3>
            {node.frontmatter.created !== null && (
              <small>{node.frontmatter.created}</small>
            )}
            {/* eslint-disable-next-line react/no-danger */}
            <p
              sx={{ marginY: 1 }}
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export { pageQuery }
export default BlogIndex
