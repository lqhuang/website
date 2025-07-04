import { notFound } from 'next/navigation'

import { Meta } from 'src/components/meta'
import { PrevNextNav } from 'src/components/pagination'
import { Article } from 'src/components/article'

import { allNotes } from 'src/content/notes'
import { themeConfig } from 'src/theme-config'

export const dynamicParams = false
export const dynamic = 'force-static'
export const generateStaticParams = () => {
  return allNotes.map(doc => ({ slug: doc.metadata.slug }))
}

type Params = { slug: string }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  const doc = allNotes.find(p => p.metadata.slug === slug)
  if (!doc) return notFound()
  const index = allNotes.indexOf(doc)
  const { title, tags, date } = doc.frontmatter
  const prev = allNotes.at(index - 1) ?? undefined
  const next = allNotes.at(index + 1) ?? undefined

  return (
    <>
      <Article>
        <h1>{title}</h1>
        <Meta date={date} tags={tags} />
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
