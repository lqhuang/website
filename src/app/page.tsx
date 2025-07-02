import Link from 'next/link'

import { Article } from 'src/components/article'
import { AboutMe } from 'src/components/about-me'

export const dynamicParams = false
export const dynamic = 'force-static'

export default function Page() {
  return (
    <Article>
      <p>Hi there 👋</p>
      <AboutMe />
      <p>Subjects:</p>
      <ul>
        <li>
          <Link href="/notes">Notes</Link>: My random thoughts or 2-cent
          comments while exploring.
        </li>
        <li>
          <Link href="/projects">Projects</Link>: My ongoing projects and
          progress.
        </li>
        or
        <li>
          <Link href="/tags">Tags</Link>
          {": Filter what you're interested in through tags."}
        </li>
      </ul>
    </Article>
  )
}
