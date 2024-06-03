import type { Source } from 'src/content/local'

import { join } from 'path'

import { Markdown } from 'src/components/markdown'
import { buildLocalSource } from 'src/content/local'
import { contentDir } from 'src/config'

export async function generateStaticParams() {
  const db = await buildLocalSource(join(contentDir, 'articles'))
  return Array.from(db.keys()).map(slug => {
    return { params: { slug } }
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const db = await buildLocalSource(join(contentDir, 'articles'))
  const source = db.get(slug) as Source

  return (
    <>
      <article>
        <Markdown content={source.content} />
      </article>
    </>
  )
}
