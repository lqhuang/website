/** @jsxImportSource theme-ui */
import { jsx, Styled } from 'theme-ui'
import { Link, graphql } from 'gatsby'

import Layout from 'src/components/layout'

function TagRoute(props) {
  const { data, pageContext, location } = props
  const posts = data.allMdx.edges
  const postLinks = posts.map((post) => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
    </li>
  ))

  return (
    <Layout location={location}>
      <Styled.h1>
        {data.allMdx.totalCount}
        {` posts tagged with "${pageContext.tag}"`}
      </Styled.h1>
      <ul>{postLinks}</ul>
      <p>
        <Link to="/tags/">Browse all tags</Link>
      </p>
    </Layout>
  )
}

export default TagRoute

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
