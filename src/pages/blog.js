/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from 'src/components/layout'
import SEO from 'src/components/seo'


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
            title
            date(formatString: "MMMM DD, YYYY")
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
          <div key={node.fields.slug} sx={{ marginBottom: 4 }}>
            <h3 sx={{ marginBottom: 1 }}>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            {node.frontmatter.date !== null && <small>{node.frontmatter.date}</small>}
            <p sx={{ marginY: 1 }} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex
