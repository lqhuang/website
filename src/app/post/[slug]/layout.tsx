import type { ReactNode } from 'react'

import { themeConfig } from 'src/theme-config'

import { PrevNextNav } from 'src/components/pagination'

export default function AritcleLayout({
  children,
  params,
}: {
  params: { slug: string }
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
