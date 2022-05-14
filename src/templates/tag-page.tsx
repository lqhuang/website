/** @jsxImportSource theme-ui */
import { Link, graphql, PageProps } from 'gatsby'

import { Layout } from 'src/components/layout'

const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___created], order: DESC }
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

interface PageData {
  allMdx: {
    totalCount: number
    edges: {
      node: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
        }
      }
    }[]
  }
}

interface ContextData {
  tag: string
}

function TagRoute({ data, pageContext }: PageProps<PageData, ContextData>) {
  const posts = data.allMdx.edges
  const postLinks = posts.map((post) => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
    </li>
  ))

  return (
    <Layout>
      <h1>
        {data.allMdx.totalCount}
        {` posts tagged with "${pageContext.tag}"`}
      </h1>
      <ul>{postLinks}</ul>
      <p>
        <Link to="/tags/">Browse all tags</Link>
      </p>
    </Layout>
  )
}

export { pageQuery }
export default TagRoute
