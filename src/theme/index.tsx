import type { NextraThemeLayoutProps } from 'nextra'
import type { ReactElement, ReactNode } from 'react'
import type { LayoutProps, NextraThemeConfig } from './types'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import { BlogProvider } from './blog-context'
import { DEFAULT_THEME } from './constants'
import { Header } from './header'
import { IndexLayout } from './index-layout'
import { ArticleLayout } from './post-layout'

const layoutMap = {
  index: IndexLayout,
  post: ArticleLayout,
  // page: PageLayout,
  // posts: PostsLayout,
  // tag: PostsLayout,
}

const BlogLayout = ({
  config,
  children,
  opts,
}: LayoutProps & { children: ReactNode }): ReactElement => {
  const type = opts.frontMatter.type || 'index'
  const DelegateLayout = layoutMap['index']
  if (!DelegateLayout) {
    throw new Error(
      `nextra-theme-blog does not support the layout type "${type}" It only supports "post", "page", "posts" and "tag"`,
    )
  }
  const { footer, navs, site, logo } = config

  return (
    <BlogProvider opts={opts} config={config}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        {/* <title>{title}</title> */}
        {/* {config.head?.({ title, meta: opts.frontMatter })} */}
      </Head>
      <div className="flex-col mx-auto prose">
        <Header logo={logo} site={site} navs={navs} />
        <main>
          <DelegateLayout>{children}</DelegateLayout>
        </main>
        {footer}
      </div>
    </BlogProvider>
  )
}

const Layout = ({
  children,
  pageOpts,
  themeConfig,
}: NextraThemeLayoutProps) => {
  const extendedConfig: NextraThemeConfig = {
    ...DEFAULT_THEME,
    ...themeConfig,
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BlogLayout config={extendedConfig} opts={pageOpts}>
        {children}
      </BlogLayout>
    </ThemeProvider>
  )
}

export default Layout

export { useTheme } from 'next-themes'
export { useBlogContext } from './blog-context'
// export { getStaticTags } from './utils/get-tags'
export * from './types'
