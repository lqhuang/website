/** @jsxImportSource theme-ui */
import { graphql, PageProps } from 'gatsby'
import { Themed } from 'theme-ui'

import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { TagSection } from 'src/components/tags'

const pageQuery = graphql`
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
          excerpt
          fields {
            slug
            tagSlugs
          }
          frontmatter {
            title
            created(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`

interface PageData {
  allMdx: {
    edges: {
      node: {
        excerpt: string
        fields: {
          slug: string
          tagSlugs?: string[]
        }
        frontmatter: {
          title: string
          created: string
          tags?: string[]
        }
      }
    }[]
  }
}

const BlogIndex = ({ data }: PageProps<PageData>) => {
  const posts = data.allMdx.edges

  return (
    <Layout>
      <SEO title="All posts" keywords={['blog']} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const tags = node.frontmatter.tags
        const tagSlugs = node.fields.tagSlugs

        return (
          <div key={node.fields.slug} sx={{ marginBottom: 4 }}>
            <Themed.h1
              sx={{
                ':before': {
                  content: '"# "',
                  color: 'secondary',
                },
              }}
              id={node.fields.slug}
            >
              <Themed.a
                sx={{
                  color: 'black',
                  textDecoration: 'none',
                  ':hover': {
                    textDecoration: 'underline',
                    textDecorationSkip: 'ink',
                    textDecorationSkipInk: 'all',
                    textUnderlineOffset: '12%',
                  },
                }}
                href={node.fields.slug}
              >
                {title}
              </Themed.a>
            </Themed.h1>
            <small>
              {node.frontmatter.created &&
                `Created: ${node.frontmatter.created}`}
              {` · `}
              {tags && <TagSection tags={tags} tagSlugs={tagSlugs} />}
            </small>
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
