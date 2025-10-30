import Link from 'next/link'

import { format } from 'date-fns/format'
import { groupBy } from 'es-toolkit'

import { Tags } from 'src/components/meta'
import { notes } from 'src/content/notes'
import { wellTypedClassName } from 'src/styles/constants'
import { sortDateDesc, getYearAndMonth } from 'src/utils'

export const dynamicParams = false
export const dynamic = 'force-static'

export default async function Page() {
  const validNotes = notes
    .filter(doc => !doc.frontmatter.draft && !doc.frontmatter.deprecated)
    .sort((a, b) => sortDateDesc(a.metadata.date, b.metadata.date))

  const monthGrouped = groupBy(validNotes, post =>
    getYearAndMonth(post.frontmatter.date),
  )

  return (
    <>
      <div className={wellTypedClassName + 'mb-3 text-black dark:text-white'}>
        Record notes from my readings or what interesting things I learned
      </div>
      <div className="flex flex-col gap-4">
        {Object.entries(monthGrouped).map(([yearAndMonth, notes], i) => (
          <div key={yearAndMonth}>
            <Link
              className="no-underline hover:underline"
              href={`/notes/${yearAndMonth}`}
            >
              <h2 className="prose dark:prose-invert text-black dark:text-white font-sans text-xl font-bold mt-3 mb-1">
                {yearAndMonth}
              </h2>
            </Link>
            {notes.map(post => {
              const fm = post.frontmatter
              return (
                <section
                  key={post.metadata.slug}
                  className={wellTypedClassName}
                  aria-labelledby={post.metadata.stem}
                >
                  <Link
                    className="no-underline hover:underline"
                    href={`/note/${post.metadata.slug}`}
                  >
                    <h3
                      id={post.metadata.stem}
                      className="text-balance font-normal mt-2 mb-0"
                    >
                      {fm.title}
                    </h3>
                  </Link>
                  <span>
                    <span className="text-gray-500 hover:text-black dark:hover:text-white">
                      date: {format(fm.date, 'yyyy-MM-dd')}
                    </span>
                    {fm.tags && fm.tags.length > 0 && (
                      <Tags
                        className="text-gray-500 hover:text-black dark:hover:text-white"
                        tags={fm.tags}
                      />
                    )}
                  </span>
                </section>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
