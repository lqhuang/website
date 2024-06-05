import type { ReactNode } from 'react'
import type { BlogPageOpts } from 'src/theme/types'

import { themeConfig } from 'src/theme-config'

import { PrevNextNav } from 'src/theme/components/pagination'

export default function AritcleLayout({
  children,
  params,
}: {
  params: { collection: string; slug: string }
  children: ReactNode
}) {
  const { slug } = params
  return (
    <>
      <article
        className="dark:prose-dark container prose-sm md:prose"
        dir="ltr"
      >
        {children}
      </article>
      <PrevNextNav />
      {themeConfig.postFooter}
      {themeConfig.comments}
    </>
  )
}
