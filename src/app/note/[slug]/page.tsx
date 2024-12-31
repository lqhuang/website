import { notFound } from 'next/navigation'

import { Meta } from 'src/components/meta'
import { Markdown } from 'src/components/ui/markdown'
import { PrevNextNav } from 'src/components/pagination'
import { Article } from 'src/components/ui/article'

import { allNotes } from 'src/content/notes'
import { themeConfig } from 'src/theme-config'

export const dynamicParams = false
export const dynamic = 'force-static'
export const generateStaticParams = () => {
  return allNotes.map(doc => {
    if (!doc) throw new Error('doc is undefined')
    return { params: { slug: doc.metadata.slug } }
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params

  const doc = allNotes.find(p => p.metadata.slug === slug)
  if (!doc) {
    return notFound()
  }

  const { title, tags, date } = doc.frontmatter
  return (
    <>
      <Article>
        <h1>{title}</h1>
        <Meta date={date} tags={tags} />
        <Markdown content={doc.content} />
      </Article>
      {/* <PrevNextNav /> */}
      {themeConfig.postFooter}
      {themeConfig.comments}
    </>
  )
}
