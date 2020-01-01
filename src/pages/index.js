import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

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
  }
`

const Index = (props) => {
  const data = useStaticQuery(pageQuery)
  const { siteTitle, author } = data.site.siteMetadata.title
  const { location } = props

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="Index"
        keywords={['blog', author]}
      />
    </Layout>
  )
}

export default Index
