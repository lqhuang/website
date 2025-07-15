import { notFound } from 'next/navigation'

import { Meta } from 'src/components/meta'
import { PrevNextNav } from 'src/components/pagination'

import { Article } from 'src/components/article'
import { themeConfig } from 'src/theme-config'
import { allProjects } from 'src/content/projects'

type Params = {
  slug: string
}

export const dynamicParams = false
export const dynamic = 'force-static'
export const generateStaticParams = (): Params[] => {
  return allProjects.map(doc => ({ slug: doc.metadata.slug }))
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  const doc = allProjects.find(p => p.metadata.slug === slug)
  if (!doc) return notFound()

  const { title, tags, created, updated } = doc.frontmatter
  return (
    <Article>
      <h1 className="mt-3">{title}</h1>
      <Meta created={created} updated={updated} tags={tags} />
      {doc.content}
      <PrevNextNav />
      {themeConfig.postFooter}
      {themeConfig.comments}
    </Article>
  )
}
