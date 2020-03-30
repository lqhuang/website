/** @jsx jsx */
import { jsx, BaseStyles } from 'theme-ui'
import { Link, graphql } from 'gatsby'

import Layout from 'src/components/layout'
import SEO from 'src/components/seo'

import 'katex/dist/katex.min.css'


function Pagination(props) {
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


function BlogPostTemplate(props) {
  const post = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext
  const { location } = props

  const { excerpt, html: postHtml, tableOfContents } = post
  const { title: postTitle, date: postDate, tags, modified } = post.frontmatter


  const genTagSection = (tagsArray) => {
    if (tagsArray === null || tagsArray === undefined) {
      return null
    }
    const tagsLink = tagsArray.map(
      (tag, i) => (
        <span key={tag}><Link to={tag}>{tags[i]}</Link></span>
      ),
    ).reduce((prev, curr) => [prev, ', ', curr])

    return (
      <span
        css={{
          fontStyle: 'normal',
          textAlign: 'left',
        }}
      >
        {' '}
        &middot; tags:
        {' '}
        {tagsLink}
      </span>
    )
  }
  const tagSection = genTagSection(post.fields.tagSlugs)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={postTitle} description={excerpt} />
      <BaseStyles>
        <h1>{postTitle}</h1>

        <p sx={{
          mb: 3,
          a: {
            textDecoration: 'underline 1px solid',
          },
        }}
        >
          {postDate !== null && postDate}
          {modified !== null && modified !== postDate && ` · ${modified}`}
          {tagSection !== null && tagSection}
        </p>

        {/* {tableOfContents !== ''
        && <p dangerouslySetInnerHTML={{ __html: tableOfContents }} />} */}

        {/* eslint-disable-next-line react/no-danger */}
        <p dangerouslySetInnerHTML={{ __html: postHtml }} />
        <hr />
      </BaseStyles>

      <Pagination previous={previous} next={next} />
    </Layout>
  )
}


export default BlogPostTemplate

export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
  site {
    siteMetadata {
      title
      author
    }
  }
  markdownRemark(fields: { slug: { eq: $slug } }) {
    id
    excerpt(pruneLength: 144)
    html
    fields {
      slug
      tagSlugs
    }
    tableOfContents
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      modified(formatString: "MMMM DD, YYYY")
      tags
    }
  }
}
`
