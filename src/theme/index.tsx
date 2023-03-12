import type { NextraThemeLayoutProps } from 'nextra'
import type { ReactElement, ReactNode } from 'react'
import type { LayoutProps, NextraThemeConfig } from './types'

import { ThemeProvider } from 'next-themes'

import { Header } from './header'
import { IndexLayout } from './index-layout'
import { ArticleLayout } from './post-layout'
import { BlogProvider } from './blog-context'
import { DEFAULT_THEME } from './constants'

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
  return (
    <BlogProvider opts={opts} config={config}>
      <main>
        <DelegateLayout>{children}</DelegateLayout>
      </main>
    </BlogProvider>
  )
}

const Layout = ({
  children,
  pageOpts,
  themeConfig,
}: NextraThemeLayoutProps) => {
  // const { title, frontMatter, headings } = pageOpts

  const extendedConfig: NextraThemeConfig = {
    ...DEFAULT_THEME,
    ...themeConfig,
  }
  const { footer, navs, site } = extendedConfig

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="container flex-col mx-auto">
        <Header site={site} navs={navs} />
        <BlogLayout config={extendedConfig} opts={pageOpts}>
          {children}
        </BlogLayout>
        {footer}
      </div>
    </ThemeProvider>
  )
}

export default Layout

export { useTheme } from 'next-themes'
export { useBlogContext } from './blog-context'
// export { getStaticTags } from './utils/get-tags'
export * from './types'
