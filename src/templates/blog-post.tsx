import { BaseStyles } from 'theme-ui'
import { Link, graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from 'src/components/layout'
import SEO from 'src/components/seo'

import 'katex/dist/katex.min.css'

const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 144)
      body
      mdxAST
      fields {
        slug
        tagSlugs
      }
      tableOfContents
      frontmatter {
        title
        created(formatString: "MMMM DD, YYYY")
        # updated(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`

interface PageData {
  mdx: {
    id: number
    excerpt: string
    body: string
    mdxAST: unknown
    fields: {
      slug: string
      tagSlugs: string[]
    }
    tableOfContents: unknown
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
  }
  frontmatter: {
    title: string
    tags: string[] | undefined
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
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        listStyle: 'none',
        padding: 0,
      }}
    >
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            {`← ${previous.frontmatter.title}`}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {`${next.frontmatter.title} →`}
          </Link>
        )}
      </li>
    </ul>
  )
}

function BlogPostTemplate({
  data,
  pageContext,
}: PageProps<PageData, PageContext>) {
  const post = data.mdx
  const { previous, next } = pageContext

  const { excerpt, mdxAST, tableOfContents } = post
  const { title: postTitle, created, tags, updated } = post.frontmatter

  const genTagSection = (tagsArray: string[]) => {
    if (tagsArray === null || tagsArray === undefined) {
      return null
    }
    const tagsLink = tagsArray
      .map((tag, i) => (
        <span key={tag}>
          <Link to={tag}>{tag}</Link>
        </span>
      ))
      .reduce((prev, curr) => [prev, ', ', curr])

    return (
      <span
        css={{
          fontStyle: 'normal',
          textAlign: 'left',
        }}
      >
        {' '}
        &middot; tags: {tagsLink}
      </span>
    )
  }
  const tagSection = genTagSection(post.fields.tagSlugs)

  return (
    <Layout>
      <SEO title={postTitle} description={excerpt} />
      <BaseStyles>
        <h1>{postTitle}</h1>

        <p
          sx={{
            mb: 3,
            a: {
              textDecoration: 'underline 1px solid',
            },
          }}
        >
          {created !== null && created}
          {/* {modified !== null && modified !== created && ` · ${modified}`} */}
          {tagSection !== null && tagSection}
        </p>

        <MDXRenderer>{post.body}</MDXRenderer>
        <hr />
      </BaseStyles>

      <Pagination previous={previous} next={next} />
    </Layout>
  )
}

export { pageQuery }
export default BlogPostTemplate
