import { themeConfig } from 'src/theme-config'

export const AboutMe = () => {
  const { site } = themeConfig
  if (!site) {
    return <p>Site config is missing</p>
  }
  const { author, nickname, email, social } = site

  return (
    <>
      <p>
        Here is personal index of {author}{' '}
        {nickname && <code>(@{nickname})</code>}, a simple and naïve guy,
        graduated from Physics.
      </p>
      <p>Coding in Python, TypeScript, Scala, sometimes Haskell or Rust.</p>
      <p>
        Learning on Scientific Computing, Streaming System, Distributed System,
        HPC (yeah, all about computing).
      </p>
      <p>
        Perhaps an unqualified scientist, an overreacted engineer, an unskilled
        designer.
      </p>
      <p>
        Primarily, just a tireless researcher, a crafted coder, a trouble maker.
      </p>
      {social && (
        <p>
          Find me on{' '}
          <link href={`https://github.com/${social.github}`}>Github</link>,{' '}
          <link href={`https://x.com/${social.twitter}`}>X (Twitter)</link>.
        </p>
      )}
      {/* <p>Say hi to me@lqhuang.io</p> */}
    </>
  )
}
