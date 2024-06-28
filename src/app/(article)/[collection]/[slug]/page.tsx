import { notFound } from 'next/navigation'

import { Meta } from 'src/components/meta'
import { Markdown } from 'src/components/markdown'

import type { Post, Note } from 'content-collections'
import { allPosts, allNotes } from 'content-collections'

// Let dynamic segments not included in `generateStaticParams` will return a 404.
export const dynamicParams = false

const allContents = [...allPosts, ...allNotes].filter(doc =>
  doc.draft === undefined ? true : !doc.draft,
)

export async function generateStaticParams() {
  return allContents.map(doc => {
    if (!doc) throw new Error('doc is undefined')
    return {
      params: {
        collection: doc.collection,
        slug: doc.metadata.slug,
      },
    }
  })
}

const isPost = (doc: any): doc is Post => doc.collection === 'posts'
const isNote = (doc: any): doc is Note => doc.collection === 'notes'

export default async function Page({
  params,
}: {
  params: {
    collection: string
    slug: string
  }
}) {
  const { slug } = params

  const doc = allContents.find(p => p.metadata.slug === slug)

  if (!doc) {
    return notFound()
  }

  if (!(isPost(doc) || isNote(doc)))
    throw new Error('doc is not a post or a note')

  const { title, tags } = doc
  const date = isPost(doc) ? undefined : doc.date
  const created = isNote(doc) ? undefined : doc.created
  const updated = isNote(doc) ? undefined : doc.updated
  return (
    <>
      <h1 className="mt-3">{title}</h1>
      <Meta date={date} created={created} updated={updated} tags={tags} />
      <Markdown content={doc.content} />
    </>
  )
}
