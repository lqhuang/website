// import Link from 'next/link'

import { Article } from 'src/components/ui/article'
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
          <link href="/notes">Notes</link>: My random thoughts or 2-cent
          comments while exploring.
        </li>
      </ul>
    </Article>
  )
}
