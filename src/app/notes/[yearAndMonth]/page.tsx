import Link from 'next/link'

import { format } from 'date-fns/format'

import { Markdown } from 'src/components/ui/markdown'
import { WellTyped } from 'src/components/ui/well-typed'
import { Tags } from 'src/components/meta'
import { PrevNextNav } from 'src/components/pagination'

import { datetimeBuckets } from 'src/lib/datetime-buckets'

import { allNotes } from 'src/content/notes'
import { sortDateDesc, getYearAndMonth } from 'src/utils'

export const dynamicParams = false

const buckets = datetimeBuckets(
  allNotes
    .filter(predicate => !predicate.frontmatter.draft)
    .map(n => n.frontmatter.date),
)

export const generateStaticParams = async () => {
  return Array.from({ length: buckets.length }).map(each => {
    return { params: { yearAndMonth: each } }
  })
}

export default async function Page({
  params,
}: {
  params: { yearAndMonth: string }
}) {
  const { yearAndMonth } = await params
  const currPages = allNotes
    .filter(
      doc =>
        !doc.frontmatter.draft &&
        getYearAndMonth(doc.frontmatter.date) === yearAndMonth,
    )
    .sort((a, b) => sortDateDesc(a.metadata.date, b.metadata.date))

  const index = buckets.indexOf(yearAndMonth)
  if (index === -1) throw new Error('Invalid yearAndMonth')

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
            <Markdown content={post.content} />
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
