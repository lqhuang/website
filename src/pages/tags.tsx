import { Link, graphql, PageProps } from 'gatsby'
import kebabCase from 'lodash/kebabCase'

import Layout from 'src/components/layout'

const pageQuery = graphql`
  query {
    allMdx(
      limit: 30
      filter: { frontmatter: { draft: { ne: true }, example: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

interface PageData {
  allMdx: {
    group: {
      fieldValue: string
      totalCount: number
    }[]
  }
}

function TagsPageRoute({ data }: PageProps<PageData>) {
  const allTags = data.allMdx.group

  return (
    <Layout>
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

export { pageQuery }
export default TagsPageRoute
