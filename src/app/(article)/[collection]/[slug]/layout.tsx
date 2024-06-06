import type { ReactNode } from 'react'
import type { BlogPageOpts } from 'src/theme/types'

import { themeConfig } from 'src/theme-config'

import { PrevNextNav } from 'src/components/pagination'

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
      <article>{children}</article>
      <PrevNextNav />
      {themeConfig.postFooter}
      {themeConfig.comments}
    </>
  )
}
