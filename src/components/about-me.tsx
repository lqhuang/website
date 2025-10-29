import Link from 'next/link'

import { site } from 'src/config'

export const AboutMe = () => {
  const { name, nickname, social } = site

  return (
    <>
      <p>
        Here is the personal index of {name}{' '}
        {nickname && <code>(@{nickname})</code>}, a simple and naïve guy,
        graduated from Physics.
      </p>
      <p>Coding in Python, TypeScript, Scala, sometimes Cpp or Haskell.</p>
      <p>
        Learning on Scientific Computing, Streaming System, Distributed System,
        HPC, Machine Learning Algorithms (yeah, all about computing).
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
          <Link href={social.github ?? 'https://github.com'}>Github</Link>,{' '}
          <Link href={social.x ?? 'https://x.com'}>X (Twitter)</Link>{' '}
          <Link href={social.bluesky ?? 'https://bsky.app'}>Bluesky</Link>.
        </p>
      )}
    </>
  )
}
