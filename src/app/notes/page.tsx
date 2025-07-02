import Link from 'next/link'

import { format } from 'date-fns/format'
import { groupBy } from 'es-toolkit'

import { WellTyped } from 'src/components/well-typed'
import { Tags } from 'src/components/meta'
import { allNotes } from 'src/content/notes'
import { sortDateDesc, getYearAndMonth } from 'src/utils'

export const dynamicParams = false
export const dynamic = 'force-static'

export default async function Page() {
  const validNotes = allNotes
    .filter(doc => !doc.frontmatter.draft)
    .sort((a, b) => sortDateDesc(a.metadata.date, b.metadata.date))

  const monthGrouped = groupBy(validNotes, post =>
    getYearAndMonth(post.frontmatter.date),
  )

  return (
    <>
      <WellTyped className="mb-3 text-black">
        Record notes from my readings or what interesting things I learned
      </WellTyped>
      <div className="flex flex-col gap-4">
        {Object.entries(monthGrouped).map(([yearAndMonth, notes], i) => (
          <div key={yearAndMonth}>
            <Link
              className="no-underline hover:underline"
              href={`/notes/${yearAndMonth}`}
            >
              <h2 className="prose dark:prose-invert font-sans text-xl font-bold text-black mt-3 mb-1">
                {yearAndMonth}
              </h2>
            </Link>
            {notes.map(post => {
              const fm = post.frontmatter
              return (
                <WellTyped key={post.metadata.slug}>
                  <Link
                    className="no-underline hover:underline"
                    href={`/note/${post.metadata.slug}`}
                  >
                    <h3 className="text-balance font-normal mt-2 mb-1">
                      {fm.title}
                    </h3>
                  </Link>
                  <span>
                    <span className="text-gray-500 hover:text-black">
                      date: {format(fm.date, 'yyyy-MM-dd')}
                    </span>
                    {fm.tags && fm.tags.length > 0 && (
                      <Tags
                        className="text-gray-500 hover:text-black"
                        tags={fm.tags}
                      />
                    )}
                  </span>
                </WellTyped>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
