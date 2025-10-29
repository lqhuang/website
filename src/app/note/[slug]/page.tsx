import { notFound } from 'next/navigation'
import { format } from 'date-fns/format'

import { Meta } from 'src/components/meta'
import { PrevNextNav } from 'src/components/pagination'
import { Article } from 'src/components/article'

import { notes } from 'src/content/notes'
import { themeConfig } from 'src/config'

export const dynamicParams = false
export const dynamic = 'force-static'
export const generateStaticParams = () => {
  return notes
    .filter(doc => !doc.frontmatter.draft && !doc.frontmatter.deprecated)
    .map(doc => ({ slug: doc.metadata.slug }))
}

type Params = { slug: string }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  const doc = notes.find(p => p.metadata.slug === slug)
  if (!doc) return notFound()

  const index = notes.indexOf(doc)
  const { title, tags, date } = doc.frontmatter
  const prev = notes.at(index - 1) ?? undefined
  const next = notes.at(index + 1) ?? undefined

  return (
    <>
      <Article>
        <h1>{title}</h1>
        <Meta date={format(date, 'MMM dd, yyyy')} tags={tags} />
        {doc.content}
      </Article>
      <PrevNextNav
        className="pt-4"
        next={
          next === undefined
            ? undefined
            : {
                text: next.frontmatter.title,
                href: `/note/${next.metadata.slug}`,
              }
        }
        prev={
          prev === undefined
            ? undefined
            : {
                text: prev.frontmatter.title,
                href: `/note/${prev.metadata.slug}`,
              }
        }
      />
      {themeConfig.postFooter}
      {themeConfig.comments}
    </>
  )
}
