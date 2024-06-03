import type { Source } from 'src/content/local'

import { join } from 'path'

import Head from 'next/head'

import { Meta } from 'src/components/meta'
import { Markdown } from 'src/components/markdown'
import { buildLocalSource } from 'src/content/local'
import { contentDir } from 'src/config'

export async function generateStaticParams() {
  const db = await buildLocalSource(join(contentDir, 'snapshots'))
  return Array.from(db.keys()).map(slug => {
    return { params: { slug } }
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const db = await buildLocalSource(join(contentDir, 'snapshots'))
  const source = db.get(slug) as Source

  const { frontmatter, date } = source

  const title = frontmatter.title ? frontmatter.title : slug

  const { created, updated, tags } = frontmatter

  return (
    <>
      <article>
        <Head>
          <title>{title}</title>
        </Head>
        <h1> {title} </h1>
        <Meta date={date} created={created} updated={updated} tags={tags} />
        ---
        <Markdown content={source.content} />
      </article>
    </>
  )
}
