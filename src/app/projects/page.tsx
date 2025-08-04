import { Article } from 'src/components/article'

import { readme } from 'src/content/projects'

export const dynamicParams = false
export const dynamic = 'force-static'

export default function Page({}) {
  const { metadata, frontmatter, content } = readme

  return (
    <Article key={metadata.slug}>
      {frontmatter.title && <h1 id="title">{frontmatter.title}</h1>}
      {content}
    </Article>
  )
}
