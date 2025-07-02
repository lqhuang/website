import Link from 'next/link'
import { notFound } from 'next/navigation'

import { format } from 'date-fns/format'

import { Tags } from 'src/components/meta'

import { allNotes } from 'src/content/notes'
import { sortDateDesc } from 'src/utils'
import { WellTyped } from 'src/components/well-typed'

export const dynamicParams = false
export const dynamic = 'force-static'

type Params = {
  tag: string
}

export const generateStaticParams = (): Params[] => {
  const tagSet = new Set<string>()
  allNotes.forEach(doc => doc.frontmatter.tags?.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet).map(tag => ({ tag }))
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tag } = await params

  const sortedNotes = allNotes
    .filter(doc => !doc.frontmatter.draft)
    .sort((a, b) => sortDateDesc(a.metadata.date, b.metadata.date))

  const docsByTag = sortedNotes.filter(doc =>
    doc.frontmatter.tags?.includes(tag),
  )
  if (docsByTag.length === 0) return notFound()

  return (
    <>
      <WellTyped className="mb-1 text-black">
        Things tagged with <span className="font-mono">`{tag}`</span> (
        {docsByTag.length} records).
      </WellTyped>
      <Link className="no-underline hover:underline" href={`/tags`}>
        <WellTyped className="mb-3 text-black">Go back ⤴</WellTyped>
      </Link>
      <div className="flex flex-col gap-3">
        {docsByTag.map(doc => {
          const fm = doc.frontmatter
          return (
            <WellTyped key={doc.metadata.slug}>
              <Link
                className="no-underline hover:underline"
                href={`/note/${doc.metadata.slug}`}
              >
                <h2 className="text-balance font-normal mt-2 mb-1">
                  {fm.title}
                </h2>
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
    </>
  )
}
