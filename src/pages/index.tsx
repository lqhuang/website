/** @jsxImportSource theme-ui */
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Themed } from 'theme-ui'

import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import concat from 'lodash/concat'

import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { PostBlock } from 'src/components/block'
import { useSiteMetadata } from 'src/hooks/use-site-metadata'
import type { Node } from 'src/types'

const pageQuery = graphql`
  query {
    allMdx(
      filter: { frontmatter: { draft: { ne: true }, title: { ne: "" } } }
      sort: {
        fields: [frontmatter___created, frontmatter___date]
        order: [DESC, DESC]
      }
    ) {
      group(field: fields___sourceInstanceName, limit: 3) {
        fieldValue
        nodes {
          excerpt(pruneLength: 144)
          body
          fields {
            sourceInstanceName
            slug
            tagSlugs
          }
          frontmatter {
            title
            created(formatString: "MMMM DD, YYYY")
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

interface PageData {
  allMdx: {
    group: {
      fieldValue: string
      nodes: Node[]
    }[]
  }
}

const Index = ({ data }: PageProps<PageData>) => {
  const { author } = useSiteMetadata()

  const { group } = data.allMdx
  const validPostDirs = ['articles', 'writings', 'translations']
  const groupedMdx = mapValues(
    groupBy(group, 'fieldValue'),
    (arr) => arr[0].nodes,
  )
  let snapshots: Node[] = groupedMdx['snapshots']
  let allPosts: Node[] = concat(
    ...validPostDirs.map((x) => (groupedMdx[x] ? groupedMdx[x] : [])),
  )
  const posts = allPosts
    .sort((a, b) => {
      const { created: aCreated, date: aDate } = a.frontmatter
      const { created: bCreated, date: bDate } = b.frontmatter
      const x = aCreated || aDate
      const y = bCreated || bDate
      // make newer date in the prior order
      return Date.parse(y as string) - Date.parse(x as string)
    })
    .slice(0, 3)

  return (
    <Layout>
      <SEO title="Index" keywords={['index', 'blog', author]} />

      <div>
        <Themed.h2>Posts:</Themed.h2>
        {posts.map((node) => {
          const title = node.frontmatter.title || node.fields.slug

          return (
            <PostBlock
              node={node}
              beforeMarker="#"
              title={
                <Themed.a
                  sx={{ color: 'text', textDecoration: 'none' }}
                  href={'/post' + node.fields.slug}
                  rel={node.fields.slug}
                >
                  {title}
                </Themed.a>
              }
              HeadingType={Themed.h3}
            />
          )
        })}
      </div>
      <br />
      <div>
        <Themed.h2>Digests:</Themed.h2>
        {snapshots.map((node) => (
          <PostBlock
            node={node}
            beforeMarker={'>'}
            title={node.frontmatter.title || node.fields.slug}
            HeadingType={Themed.h3}
          >
            <MDXRenderer>{node.body}</MDXRenderer>
          </PostBlock>
        ))}
      </div>
    </Layout>
  )
}

export { pageQuery }
export default Index
