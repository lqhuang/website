/** @jsxImportSource theme-ui */
import { graphql, PageProps, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Themed, Flex } from 'theme-ui'

import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { TagSection } from 'src/components/tags'

const pageQuery = graphql`
  query perPageSnapshotsQuery($limit: Int!, $skip: Int!) {
    allMdx(
      filter: {
        fields: { sourceInstanceName: { eq: "snapshots" } }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        body
        fields {
          slug
          tagSlugs
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          tags
        }
      }
    }
  }
`

interface PageData {
  allMdx: {
    nodes: {
      body: string
      fields: {
        slug: string
        tagSlugs: string[]
      }
      frontmatter: {
        title: string
        date: string
        tags: string[]
      }
    }[]
  }
}

interface PageContext {
  limit: number
  skip: number
  numPages: number
  currentPage: number
}

const BlogIndex = ({ data, pageContext }: PageProps<PageData, PageContext>) => {
  const snapshots = data.allMdx.nodes

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages

  return (
    <Layout>
      <SEO title="All snapshots" keywords={['digest', 'daily']} />
      {snapshots.map((node) => {
        const title = node.frontmatter.title || node.fields.slug
        const tags = node.frontmatter.tags
        const tagSlugs = node.fields.tagSlugs

        return (
          <div key={node.fields.slug} sx={{ mb: 4 }}>
            <Themed.h1
              sx={{
                ':before': {
                  content: '"> "',
                  color: 'secondary',
                },
              }}
            >
              {title}
            </Themed.h1>
            <small>
              {node.frontmatter.date && `Date: ${node.frontmatter.date}`}{' '}
              &middot; {tags && <TagSection tags={tags} tagSlugs={tagSlugs} />}
            </small>
            <MDXRenderer>{node.body}</MDXRenderer>
          </div>
        )
      })}
      <br />
      <Flex style={{ flexDirection: 'column' }}>
        {!isFirst && (
          <Themed.a href={`/snapshots/${currentPage - 1}`} as={Link} rel="prev">
            ← Previous Page
          </Themed.a>
        )}
        {!isLast && (
          <Themed.a
            style={{ alignSelf: 'flex-end' }}
            href={`/snapshots/${currentPage + 1}`}
            as={Link}
            rel="next"
          >
            Next Page →
          </Themed.a>
        )}
      </Flex>
    </Layout>
  )
}

export { pageQuery }
export default BlogIndex
