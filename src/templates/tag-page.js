import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from 'src/components/layout'

function TagRoute(props) {
  const posts = props.data.allMarkdownRemark.edges
  const postLinks = posts.map((post) => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
    </li>
  ))

  return (
    <Layout location={props.location}>
      <h1>
        {props.data.allMarkdownRemark.totalCount}
        {` posts tagged with "${props.pageContext.tag}"`}
      </h1>
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
    allMarkdownRemark(
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
