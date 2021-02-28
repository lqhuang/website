/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link, graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Layout from 'src/components/layout'

function TagsPageRoute(props) {
  const allTags = props.data.allMdx.group
  const { location } = props

  return (
    <Layout location={location}>
      <h2>Tags</h2>
      <ul>
        {allTags.map((tag) => (
          <li key={tag.fieldValue}>
            <Link
              style={{
                textDecoration: 'none',
              }}
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
            >
              {`${tag.fieldValue} (${tag.totalCount})`}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default TagsPageRoute

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 1000
      filter: { frontmatter: { draft: { ne: true }, example: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
