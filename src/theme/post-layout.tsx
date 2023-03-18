import type { ReactNode } from 'react'

import Head from 'next/head'

import { useBlogContext } from './blog-context'
import { MDXTheme } from './mdx-theme'

export const PostLayout = ({ children }: { children: ReactNode }) => {
  const { config, opts } = useBlogContext()
  const { frontMatter } = opts

  return (
    <article className="container prose-sm dark:prose-dark md:prose" dir="ltr">
      <Head>
        <title>{frontMatter.title}</title>
        {/* {config.head?.({ title, meta: opts.frontMatter })} */}
      </Head>
      <MDXTheme>
        {opts.hasJsxInH1 ? null : <h1>{frontMatter.title}</h1>}
        {children}
      </MDXTheme>
      {config.postFooter}
      {config.comments}
    </article>
  )
}
