import Link from 'next/link'

import { format } from 'date-fns/format'

import { WellTyped } from 'src/components/well-typed'
import { Tags } from 'src/components/meta'
import { PrevNextNav } from 'src/components/pagination'

import { datetimeBuckets } from 'src/lib/datetime-buckets'
import { notes } from 'src/content/notes'
import { sortDateDesc, getYearAndMonth } from 'src/utils'

const buckets = datetimeBuckets(
  notes.filter(doc => !doc.frontmatter.draft).map(n => n.frontmatter.date),
)

type Params = {
  yearAndMonth: string
}

export const dynamicParams = false
export const dynamic = 'force-static'
export const generateStaticParams = (): Params[] => {
  return buckets.map(each => ({ yearAndMonth: each }))
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { yearAndMonth } = await params
  const currPages = notes
    .filter(
      doc =>
        !doc.frontmatter.draft &&
        !doc.frontmatter.deprecated &&
        getYearAndMonth(doc.frontmatter.date) === yearAndMonth,
    )
    .sort((a, b) => sortDateDesc(a.metadata.date, b.metadata.date))

  const index = buckets.indexOf(yearAndMonth)
  if (index === -1)
    throw new Error('Invalid yearAndMonth or No notes found in current range')

  return (
    <>
      {currPages.map(post => {
        const fm = post.frontmatter
        return (
          <WellTyped key={post.metadata.slug}>
            <Link
              className="no-underline hover:underline"
              href={`/note/${post.metadata.slug}`}
            >
              <h1>{fm.title}</h1>
            </Link>
            <span>
              <span>date: {format(fm.date, 'yyyy-MM-dd')}</span>
              {fm.tags && fm.tags.length > 0 && <Tags tags={fm.tags} />}
            </span>
            <post.Body />
          </WellTyped>
        )
      })}
      <PrevNextNav
        className="pt-4"
        next={
          index == buckets.length - 1
            ? undefined
            : { text: buckets[index + 1], href: `/notes/${buckets[index + 1]}` }
        }
        prev={
          index == 0
            ? undefined
            : { text: buckets[index - 1], href: `/notes/${buckets[index - 1]}` }
        }
      />
    </>
  )
}
