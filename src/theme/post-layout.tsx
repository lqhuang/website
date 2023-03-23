import type { ReactNode } from 'react'

import Head from 'next/head'

import { useBlogContext } from './blog-context'
import { Meta } from './components/meta'
import { PrevNextNav } from './components/pagination'
import { MDXTheme } from './mdx-theme'

export const PostLayout = ({ children }: { children: ReactNode }) => {
  const { config, opts } = useBlogContext()
  const { frontMatter } = opts

  const { date, created, updated, tags } = frontMatter

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        {/* {config.head?.({ title, meta: opts.frontMatter })} */}
      </Head>
      <article
        className="container prose-sm dark:prose-dark md:prose"
        dir="ltr"
      >
        <MDXTheme>
          {opts.hasJsxInH1 ? null : <h1>{frontMatter.title}</h1>}
          <Meta date={date} created={created} updated={updated} tags={tags} />
          {children}
        </MDXTheme>
        {config.postFooter}
      </article>
      <PrevNextNav />
      {config.comments}
    </>
  )
}
