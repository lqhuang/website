import { useBlogContext } from '../blog-context'

export const AboutMe = () => {
  const {
    config: { site },
  } = useBlogContext()

  if (!site) return null

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
        <>
          Follow me on{' '}
          <a href={`https://github.com/${social.github}`}>Github</a>,{' '}
          <a href={`https://twitter.com/${social.twitter}`}>Twitter (X)</a>.
        </>
      )}
      <p>Say hi to {email}</p>
    </>
  )
}
