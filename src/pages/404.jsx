/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import { useSiteMetadata } from 'src/hooks/use-site-metadata'

const NotFoundPage = (props) => {
  const { location } = props
  const { title: siteTitle } = useSiteMetadata()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <Styled.h1>Not Found</Styled.h1>
      <Styled.p>You just hit a route that doesn&#39;t exist... the sadness.</Styled.p>
    </Layout>
  )
}

export default NotFoundPage
