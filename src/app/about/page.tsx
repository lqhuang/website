import { themeConfig } from 'src/theme-config'

export default function AboutMe() {
  const { site } = themeConfig
  if (!site) {
    return <p>Site config is missing</p>
  }
  const { author, nickname, email, social } = site

  return (
    <>
      <p>
        Who am I: {author} {nickname && <code>(@{nickname})</code>}, a simple
        and naïve guy, graduated from Physics.{' '}
      </p>
      <p>
        Coding in Python, Scala, Rust, sometimes Haskell. Learning on ML System,
        Streaming System, Distributed System, HPC (yeah, all about computing).
      </p>
      {social && (
        <p>
          Follow me on{' '}
          <a href={`https://github.com/${social.github}`}>Github</a>,{' '}
          <a href={`https://twitter.com/${social.twitter}`}>Twitter (X)</a>.
        </p>
      )}
      <p>Say hi to </p>
    </>
  )
}
