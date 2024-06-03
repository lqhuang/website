import type { ReactNode } from 'react'
import type { BlogPageOpts } from 'src/theme/types'

import { themeConfig } from 'src/theme-config'

import { PrevNextNav } from 'src/theme/components/pagination'

export default function AritcleLayout({
  params,
  children,
}: {
  params: { slug: string }
  children: ReactNode
}) {
  const { slug } = params
  return (
    <>
      <article
        className="dark:prose-dark container prose-sm md:prose"
        dir="ltr"
      >
        <h1>{slug}</h1>
        {/* <p>
          This is a blog post. To get started, head over to your site's
          <code>src/app/post</code> directory and edit the <code>.mdx</code>{' '}
          file there.
        </p> */}
        {children}
      </article>
      <PrevNextNav />
      {themeConfig.postFooter}
      {themeConfig.comments}
    </>
  )
}
