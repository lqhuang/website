import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Bio from 'src/components/bio'
import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import { rhythm } from 'src/utils/typography'

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`

const BlogIndex = (props) => {
  const data = useStaticQuery(pageQuery)
  const { site: siteTitle, author } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges
  const { location } = props

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={['blog', author]}
      />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            {node.frontmatter.date !== null && <small>{node.frontmatter.date}</small>}
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex
