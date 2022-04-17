import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import { useSiteMetadata } from 'src/hooks/use-site-metadata'

const Index = () => {
  const { author } = useSiteMetadata()

  return (
    <Layout>
      <SEO title="Index" keywords={['index', 'blog', author]} />
    </Layout>
  )
}

export default Index
