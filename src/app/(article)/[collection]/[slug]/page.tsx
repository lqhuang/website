import { notFound } from 'next/navigation'

import { Meta } from 'src/components/meta'
import { Markdown } from 'src/components/markdown'

import type { Post, Snippet } from 'content-collections'
import { allPosts, allSnippets } from 'content-collections'

// Let dynamic segments not included in `generateStaticParams` will return a 404.
export const dynamicParams = false

const allContents = [...allPosts, ...allSnippets].filter(doc =>
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
const isSnippet = (doc: any): doc is Snippet => doc.collection === 'snippets'

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

  if (!(isPost(doc) || isSnippet(doc)))
    throw new Error('doc is not a post or a snippet')

  const { title, tags } = doc
  const date = isPost(doc) ? undefined : doc.date
  const created = isSnippet(doc) ? undefined : doc.created
  const updated = isSnippet(doc) ? undefined : doc.updated
  return (
    <>
      <h1 className="mt-3">{title}</h1>
      <Meta date={date} created={created} updated={updated} tags={tags} />
      <Markdown content={doc.content} />
    </>
  )
}
