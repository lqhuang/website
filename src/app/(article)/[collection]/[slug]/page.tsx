import Head from 'next/head'

import { Meta } from 'src/components/meta'
import { Markdown } from 'src/components/markdown'

import type { Post, Snapshot } from 'content-collections'
import { allPosts, allSnapshots } from 'content-collections'

import { zip } from 'lodash'

// Let dynamic segments not included in `generateStaticParams` will return a 404.
export const dynamicParams = false

const allContents = [...allPosts, ...allSnapshots]

export async function generateStaticParams() {
  const lenPosts = allPosts.length
  const lenSnapshots = allSnapshots.length

  const collections = [
    Array(lenPosts).fill('post'),
    Array(lenSnapshots).fill('digest'),
  ]

  return zip(collections, allContents).map(([collection, doc]) => {
    if (!doc) throw new Error('doc is undefined')
    return {
      params: {
        collection,
        slug: doc.metadata.slug,
      },
    }
  })
}

const isPost = (doc: any, collection: string): doc is Post =>
  collection === 'post'
const isDigest = (doc: any, collection: string): doc is Snapshot =>
  collection === 'digest'

export default async function Page({
  params,
}: {
  params: {
    collection: string
    slug: string
  }
}) {
  const { collection, slug } = params

  const doc = allContents.find(p => p.metadata.slug === slug)

  if (!doc) {
    // This will never happen because of the `generateStaticParams` function.
    throw new Error('doc is not found')
  }

  if (!(isPost(doc, collection) || isDigest(doc, collection)))
    throw new Error('doc is not a post or a digest')

  const { title, tags } = doc
  const date = isPost(doc, collection) ? undefined : doc.date
  const created = isDigest(doc, collection) ? undefined : doc.created
  const updated = isDigest(doc, collection) ? undefined : doc.updated
  return (
    <>
      <article key={doc.metadata.slug}>
        <Head>
          <title>{title}</title>
        </Head>
        <h1> {title} </h1>
        <Meta date={date} created={created} updated={updated} tags={tags} />
        <Markdown content={doc.content} />
      </article>
    </>
  )
}
