/** @jsxImportSource theme-ui */
import { Themed } from 'theme-ui'
import { PageProps } from 'gatsby'

import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import { useSiteMetadata } from 'src/hooks/use-site-metadata'

const NotFoundPage = (props: PageProps) => {
  const { location } = props
  const { title: siteTitle } = useSiteMetadata()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <Themed.h1>Not Found</Themed.h1>
      <Themed.p>
        You just hit a route that doesn&#39;t exist... the sadness.
      </Themed.p>
    </Layout>
  )
}

export default NotFoundPage
