/** @jsxImportSource theme-ui */
import { graphql, PageProps } from 'gatsby'
import { Themed, Flex } from 'theme-ui'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { PostBlock } from 'src/components/block'
import type { Node, PaginationNode } from 'src/types'

import 'katex/dist/katex.min.css'

const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 144)
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        title
        created(formatString: "MMMM DD, YYYY")
        updated(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`

interface PageContext {
  slug: string
  previous: PaginationNode
  next: PaginationNode
}

function Pagination(props: { previous: PaginationNode; next: PaginationNode }) {
  const { previous, next } = props

  return (
    <Flex style={{ flexDirection: 'column' }}>
      {previous && (
        <Themed.a href={'/post' + previous.fields.slug} rel="prev">
          ← {previous.frontmatter.title}
        </Themed.a>
      )}
      {next && (
        <Themed.a
          style={{ alignSelf: 'flex-end' }}
          href={'/post' + next.fields.slug}
          rel="next"
        >
          {next.frontmatter.title} →
        </Themed.a>
      )}
    </Flex>
  )
}

function BlogPostTemplate({
  data,
  pageContext,
}: PageProps<{ mdx: Node }, PageContext>) {
  const post = data.mdx
  const { excerpt } = post
  const { title: postTitle } = post.frontmatter
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title={postTitle} description={excerpt} />

      <PostBlock node={post}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </PostBlock>

      <hr
        sx={{
          color: 'divider',
          height: '1px',
        }}
      />

      <Pagination previous={previous} next={next} />
    </Layout>
  )
}

export { pageQuery }
export default BlogPostTemplate
