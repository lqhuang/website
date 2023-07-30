import type { ReactNode } from 'react'

import Head from 'next/head'

// import Meta from './meta'
import { useBlogContext } from './blog-context'
import { MDXTheme } from './mdx-theme'

export const IndexLayout = ({ children }: { children: ReactNode }) => {
  const { config, opts } = useBlogContext()
  const title = `${opts.title}${config.titleSuffix || ''}`

  return (
    <div className="container prose dark:prose-dark sm:prose-sm">
      <Head>
        <title>{title}</title>
        {config.head?.({ title, meta: opts.frontMatter })}
      </Head>
      <MDXTheme>{children}</MDXTheme>
    </div>
  )
}
