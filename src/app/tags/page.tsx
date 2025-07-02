import Link from 'next/link'
import { countBy } from 'es-toolkit'

import { WellTyped } from 'src/components/well-typed'
import { allNotes } from 'src/content/notes'
import { sortDateDesc } from 'src/utils'

export const dynamicParams = false
export const dynamic = 'force-static'

export default async function Page() {
  const validNotes = allNotes
    .filter(doc => !doc.frontmatter.draft)
    .sort((a, b) => sortDateDesc(a.metadata.date, b.metadata.date))

  const flattenTags = new Array(
    ...validNotes.flatMap(doc => doc.frontmatter.tags ?? []),
  )
  const sortedEntries = Object.entries(countBy(flattenTags, tag => tag)).sort(
    ([, countA], [, countB]) => countB - countA,
  )

  return (
    <>
      <WellTyped className="mb-3">Tag list</WellTyped>
      <div className="flex flex-col">
        {sortedEntries.map(([tag, count], i) => (
          <Link
            key={tag}
            className="no-underline text-gray-400 group hover:text-black dark:hover:text-white  flex flex-row justify-between gap-1"
            href={`/tag/${tag}`}
          >
            <span className="grow text-nowrap">{tag}</span>
            <span className="invisible group-hover:visible overflow-hidden">
              {'.'.repeat(1000)}
            </span>
            <span>{count}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
