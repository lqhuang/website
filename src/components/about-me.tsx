import Link from 'next/link'

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
        I'm probably an unqualified scientist, an overrated engineer, a pathetic
        designer.
      </p>
      <p>
        Mostly, just a tireless researcher, a crafted coder, an ideative
        creator.
      </p>
      {social && (
        <p>
          Find me on{' '}
          <Link href={`https://github.com/${social.github}`}>Github</Link>,{' '}
          <Link href={`https://x.com/${social.twitter}`}>X (Twitter)</Link>.
        </p>
      )}
      {/* <p>Say hi to me@lqhuang.io</p> */}
    </>
  )
}
