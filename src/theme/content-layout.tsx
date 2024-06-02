import type { ReactNode } from 'react'

import Head from 'next/head'

import { MDXTheme } from './mdx-theme'

export const IndexLayout = ({ children }: { children: ReactNode }) => {
  // const title = `${opts.title}${config.titleSuffix || ''}`

  return (
    <div className="dark:prose-dark container prose sm:prose-sm">
      {/* <Head>
        <title>{title}</title>
      </Head> */}
      <MDXTheme>{children}</MDXTheme>
    </div>
  )
}
