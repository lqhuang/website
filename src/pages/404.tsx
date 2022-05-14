/** @jsxImportSource theme-ui */
import { Themed } from 'theme-ui'

import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <Themed.h1>Not Found</Themed.h1>
      <Themed.p>
        You just hit a route that doesn&#39;t exist... the sadness.
      </Themed.p>
    </Layout>
  )
}

export default NotFoundPage
