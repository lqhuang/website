import { WellTyped } from 'src/components/ui/well-typed'

import { allProjects } from 'src/content/projects'

export const dynamicParams = false
export const dynamic = 'force-static'

export default function Page({}) {
  const post = allProjects[0]
  const { metadata, content } = post

  return (
    <WellTyped key={metadata.slug}>
      <h1 className="no-underline hover:underline">
        The Projects I{"'"}m Working on
      </h1>
      {content}
    </WellTyped>
  )
}
