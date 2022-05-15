/** @jsxImportSource theme-ui */
import { Themed } from 'theme-ui'

import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { useSiteMetadata } from 'src/hooks/use-site-metadata'

function About() {
  const { author, nickname, social, email } = useSiteMetadata()

  return (
    <Layout>
      <SEO title="About" keywords={[author, 'about']} />
      <h3>
        Who am I: {author} {nickname && <code>(@{nickname})</code>}
      </h3>
      <Themed.p>
        A simple and naïve guy. Graduated from Physics. Coding in Python, Scala,
        Rust, sometimes Haskell.{' '}
        {social && (
          <>
            Follow him on{' '}
            <Themed.a href={`https://twitter.com/${social.twitter}`}>
              Twitter
            </Themed.a>
            {', '}
            <Themed.a href={`https://github.com/${social.github}`}>
              Github
            </Themed.a>
            .{' '}
          </>
        )}
        Say hi to {email}
      </Themed.p>
    </Layout>
  )
}

export default About
