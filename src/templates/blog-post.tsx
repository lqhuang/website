/** @jsxImportSource theme-ui */
import { graphql, PageProps } from 'gatsby'
import { Themed, Flex } from 'theme-ui'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { TagSection } from 'src/components/tags'

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

interface PageData {
  mdx: {
    body: string
    excerpt: string
    fields: {
      slug: string
      tagSlugs?: string[]
    }
    frontmatter: {
      title: string
      created: string
      updated?: string
      tags?: string[]
    }
  }
}

interface PaginationNode {
  fields: {
    slug: string
    // tagSlugs?: string[]
  }
  frontmatter: {
    title: string
    // created: string
    // tags?: string[]
  }
}

interface PaginationProps {
  previous: PaginationNode
  next: PaginationNode
}

interface PageContext {
  slug: string
  previous: PaginationNode
  next: PaginationNode
}

function Pagination(props: PaginationProps) {
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
}: PageProps<PageData, PageContext>) {
  const post = data.mdx
  const { previous, next } = pageContext

  const { excerpt } = post
  const { title: postTitle, created, tags, updated } = post.frontmatter
  const { tagSlugs } = post.fields

  return (
    <Layout>
      <SEO title={postTitle} description={excerpt} />

      <Themed.h1>{postTitle}</Themed.h1>

      <Themed.p
        sx={{
          fontSize: 'small',
          mb: 3,
          a: {
            textDecoration: 'underline 1px solid',
          },
        }}
      >
        {created && `Created: ${created}`}
        {updated && updated !== created && ` · Updated: ${updated}`}
        {tags && tags.length > 0 && (
          <>
            · <TagSection tags={tags} tagSlugs={tagSlugs} />
          </>
        )}
      </Themed.p>

      <MDXRenderer>{post.body}</MDXRenderer>

      <hr />

      <Pagination previous={previous} next={next} />
    </Layout>
  )
}

export { pageQuery }
export default BlogPostTemplate
