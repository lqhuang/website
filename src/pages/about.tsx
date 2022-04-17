/** @jsxImportSource theme-ui */
import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import { useSiteMetadata } from 'src/hooks/use-site-metadata'

function About() {
  const { author, social, email } = useSiteMetadata()

  return (
    <Layout>
      <SEO title="About" keywords={[author, 'about']} />
      <h3>{author}</h3>
      <p>
        A simple and naïve guy. Follow him on{' '}
        <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
        {', '}
        <a href={`https://github.com/${social.github}`}>Github</a>. Say hi to{' '}
        {email}
      </p>
    </Layout>
  )
}

export default About
