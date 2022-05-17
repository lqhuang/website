/** @jsxImportSource theme-ui */
import { graphql, PageProps, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Themed, Flex } from 'theme-ui'

import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { PostBlock } from 'src/components/block'
import type { Node } from 'src/types'

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
    nodes: Node[]
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

      {snapshots.map((node) => (
        <PostBlock
          node={node}
          beforeMarker={'>'}
          title={node.frontmatter.title || node.fields.slug}
        >
          <MDXRenderer>{node.body}</MDXRenderer>
        </PostBlock>
      ))}

      <br />

      <Flex style={{ flexDirection: 'column' }}>
        {!isFirst && (
          <Themed.a
            as={Link}
            href={`/snapshots/${currentPage - 1}`}
            to={`/snapshots/${currentPage - 1}`}
            rel="prev"
          >
            ← Previous Page
          </Themed.a>
        )}
        {!isLast && (
          <Themed.a
            style={{ alignSelf: 'flex-end' }}
            as={Link}
            href={`/snapshots/${currentPage + 1}`}
            to={`/snapshots/${currentPage + 1}`}
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
