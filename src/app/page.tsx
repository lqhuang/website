import { AboutMe } from 'src/components/about-me'

export default function Page() {
  return (
    <article className="prose prose-neutral dark:prose-invert">
      <div>Hi there 👋</div>
      <AboutMe />
    </article>
  )
}
