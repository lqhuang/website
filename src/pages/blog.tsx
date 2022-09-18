/** @jsxImportSource theme-ui */
import { graphql, PageProps } from 'gatsby'
import { Themed } from 'theme-ui'

import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { PostBlock } from 'src/components/block'
import type { Node } from 'src/types'

const pageQuery = graphql`
  query {
    allMdx(
      filter: {
        fields: {
          sourceInstanceName: { in: ["articles", "writings", "translations"] }
        }
        frontmatter: { draft: { ne: true }, title: { ne: "" } }
      }
      sort: { fields: [frontmatter___created], order: DESC }
    ) {
      nodes {
        excerpt(pruneLength: 144)
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
`

const BlogIndex = ({ data }: PageProps<{ allMdx: { nodes: Node[] } }>) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="All posts" keywords={['blog']} />
      {posts.map((node) => {
        const title = node.frontmatter.title || node.fields.slug

        return (
          <PostBlock
            node={node}
            beforeMarker="#"
            title={
              <Themed.a
                sx={{ color: 'text', textDecoration: 'none' }}
                href={'/post' + node.fields.slug}
                rel={node.fields.slug}
              >
                {title}
              </Themed.a>
            }
          >
            {/* eslint-disable-next-line react/no-danger */}
            <Themed.p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </PostBlock>
        )
      })}
    </Layout>
  )
}

export { pageQuery }
export default BlogIndex
