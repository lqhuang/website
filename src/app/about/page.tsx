import { themeConfig } from 'src/theme-config'

export default function AboutMe() {
  const { site } = themeConfig
  if (!site) {
    return <p>Site config is missing</p>
  }
  const { author, nickname, email, social } = site

  return (
    <article>
      <p className="my-1">
        Who am I: {author} {nickname && <code>(@{nickname})</code>}, a simple
        and naïve guy, graduated from Physics.
      </p>
      <p className="my-1">
        Coding in Python, Scala, Rust, sometimes Haskell. Learning on Scientific
        Computing, Streaming System, Distributed System, HPC (yeah, all about
        computing).
      </p>
      <p>
        I'm a not qualified scientist, an overrated engineer, a pathetic
        designer. Mostly, just a tireless researcher, a crafted coder, an
        ideative creator.
      </p>
      {social && (
        <p className="my-1">
          Find me on <a href={`https://github.com/${social.github}`}>Github</a>,{' '}
          <a href={`https://twitter.com/${social.twitter}`}>Twitter (X)</a>.
        </p>
      )}
      {/* <p>Say hi to me@lqhuang.io </p> */}
    </article>
  )
}
