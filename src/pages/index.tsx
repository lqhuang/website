import { graphql, useStaticQuery, PageProps } from 'gatsby'

import Layout from 'src/components/layout'
import SEO from 'src/components/seo'

type DataProps = {
  site: {
    siteMetadata: {
      title: string
      author: string
    }
  }
}

const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`

const Index = ({ location }: PageProps) => {
  const data = useStaticQuery<DataProps>(pageQuery)
  const { title, author } = data.site.siteMetadata

  return (
    <Layout>
      <SEO title="Index" keywords={['blog', author]} />
    </Layout>
  )
}

export default Index
