/** @jsx jsx */
import { jsx } from 'theme-ui'

import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import { useSiteMetadata } from 'src/hooks/use-site-metadata'


function About(props) {
  const { location } = props
  const { title: siteTitle, author, social } = useSiteMetadata()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <h3>{author}</h3>
      <p>
        A young, simple and naïve guy. Follow him on
        {' '}
        <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
        {', '}
        <a href={`https://github.com/${social.github}`}>Github</a>
        .
      </p>

    </Layout>
  )
}


export default About
