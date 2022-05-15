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

interface PageData {
  allMdx: {
    nodes: {
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
    }[]
  }
}

const BlogIndex = ({ data }: PageProps<PageData>) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="All posts" keywords={['blog']} />
      {posts.map((node) => {
        const title = node.frontmatter.title || node.fields.slug
        const tags = node.frontmatter.tags
        const tagSlugs = node.fields.tagSlugs

        return (
          <div key={node.fields.slug} sx={{ mb: 3 }}>
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
                sx={{ color: 'text', textDecoration: 'none' }}
                href={'/post' + node.fields.slug}
                rel={node.fields.slug}
              >
                {title}
              </Themed.a>
            </Themed.h1>
            <Themed.p sx={{ fontSize: 'small', mb: 2 }}>
              {node.frontmatter.created &&
                `Created: ${node.frontmatter.created}`}
              {` · `}
              {tags && <TagSection tags={tags} tagSlugs={tagSlugs} />}
            </Themed.p>
            {/* eslint-disable-next-line react/no-danger */}
            <Themed.p
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
