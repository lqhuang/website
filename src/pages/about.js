import React from 'react'

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
        Who is a young, simple and naïve guy. Follow him on
        {' '}
        <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>, <a href={`https://twitter.com/${social.github}`}>Github</a>.
      </p>
    </Layout>
  )
}


export default About
