import { notFound } from 'next/navigation'

import { Meta } from 'src/components/meta'
import { PrevNextNav } from 'src/components/pagination'

import { Article } from 'src/components/article'
import { themeConfig } from 'src/config'
import { projects } from 'src/content/projects'

type Params = {
  slug: string
}

export const dynamicParams = false
export const dynamic = 'force-static'
export const generateStaticParams = (): Params[] => {
  return projects.map(doc => ({ slug: doc.metadata.slug }))
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  const doc = projects.find(p => p.metadata.slug === slug)
  if (!doc) return notFound()

  const { title, tags, date } = doc.frontmatter
  return (
    <Article>
      {title && <h1 className="mt-3">{title}</h1>}
      {date && tags && tags.length > 0 && <Meta date={date} tags={tags} />}
      {doc.content}
      <PrevNextNav />
      {themeConfig.postFooter}
      {themeConfig.comments}
    </Article>
  )
}
