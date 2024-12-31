import { notFound } from 'next/navigation'

import { Meta } from 'src/components/meta'
import { Markdown } from 'src/components/ui/markdown'
import { allPosts } from 'src/content/posts'

import { PrevNextNav } from 'src/components/pagination'
import { themeConfig } from 'src/theme-config'

export const dynamicParams = false

export async function generateStaticParams() {
  return allPosts.map(doc => {
    if (!doc) throw new Error('doc is undefined')
    return { params: { slug: doc.metadata.slug } }
  })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  const doc = allPosts.find(p => p.metadata.slug === slug)

  if (!doc) return notFound()

  const { title, tags, created, updated } = doc.frontmatter

  return (
    <>
      <h1 className="mt-3">{title}</h1>
      <Meta created={created} updated={updated} tags={tags} />
      <Markdown content={doc.content} />
      <PrevNextNav />
      {themeConfig.postFooter}
      {themeConfig.comments}
    </>
  )
}
