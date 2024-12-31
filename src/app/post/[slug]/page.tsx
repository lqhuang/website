import { notFound } from 'next/navigation'

import { Meta } from 'src/components/meta'
import { Markdown } from 'src/components/ui/markdown'
import { allPosts } from 'src/content/posts'

import { PrevNextNav } from 'src/components/pagination'
import { themeConfig } from 'src/theme-config'

export const dynamicParams = false
export const dynamic = 'force-static'
export const generateStaticParams = () => {
  return allPosts.map(doc => ({ params: { slug: doc.metadata.slug } }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params

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
