import { notFound } from 'next/navigation'

import { Meta } from 'src/components/meta'
import { Markdown } from 'src/components/markdown'

import { allNotes } from 'src/content/notes'

// Let dynamic segments not included in `generateStaticParams` will return a 404.
export const dynamicParams = false

export async function generateStaticParams() {
  return allNotes.map(doc => {
    if (!doc) throw new Error('doc is undefined')
    return { params: { slug: doc.metadata.slug } }
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  const doc = allNotes.find(p => p.metadata.slug === slug)
  if (!doc) {
    return notFound()
  }

  const { title, tags, date } = doc.frontmatter
  return (
    <>
      <h1 className="mt-3">{title}</h1>
      <Meta date={date} tags={tags} />
      <Markdown content={doc.content} />
    </>
  )
}
