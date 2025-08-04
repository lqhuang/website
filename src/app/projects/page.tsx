import { Article } from 'src/components/article'

import { readme } from 'src/content/projects'

export const dynamicParams = false
export const dynamic = 'force-static'

export default function Page({}) {
  const { metadata, content } = readme

  return (
    <Article key={metadata.slug}>
      <h1 className="no-underline hover:underline">
        The Projects I{"'"}m Working on
      </h1>
      {content}
    </Article>
  )
}
