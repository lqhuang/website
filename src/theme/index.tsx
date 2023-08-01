import type { NextraThemeLayoutProps } from 'nextra'
import type { ReactElement, ReactNode } from 'react'
import type { LayoutProps, NextraThemeConfig } from './types'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { ContextProvider } from './blog-context'
import { DEFAULT_THEME } from './constants'
import { Header } from './header'
import { IndexLayout } from './index-layout'
import { PostLayout } from './post-layout'
import { MDXTheme } from './mdx-theme'
import { ListLayout } from './list-layout'

// eslint-disable-next-line no-unused-vars
const layoutMap: Record<string, (_: { children: ReactNode }) => JSX.Element> = {
  index: IndexLayout,
  post: PostLayout,
  posts: ListLayout,
  digest: PostLayout,
  digests: ListLayout,
  // tag: PostsLayout,
}

const BlogLayout = ({
  config,
  children,
  opts,
}: LayoutProps & { children: ReactNode }): ReactElement => {
  const router = useRouter()
  let type: string
  if (opts.frontMatter.type) {
    type = opts.frontMatter.type
  } else {
    const route = router.route
    // Or we could get the type from the `_meta.json`, but it's stored in `PageMap`.
    const startWithSlash = route.startsWith('/')
    const routeArr = route.split('/')
    type = startWithSlash ? routeArr[1] : routeArr[0]
    // console.log(router.route, opts.route, routeArr, type)
  }
  const ConcreteLayout =
    layoutMap[type] ??
    (({ children }) => (
      <div className="prose-sm">
        <MDXTheme>{children}</MDXTheme>
      </div>
    ))

  const { footer, navs, site, logo } = config
  return (
    <ContextProvider opts={opts} config={config}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        {/* <title>{title}</title> */}
        {/* {config.head?.({ title, meta: opts.frontMatter })} */}
      </Head>
      <div className="prose mx-auto flex flex-col">
        <Header logo={logo} site={site} navs={navs} />
        <main>
          <ConcreteLayout>{children}</ConcreteLayout>
        </main>
        {footer}
      </div>
    </ContextProvider>
  )
}

const Layout = ({
  children,
  pageOpts,
  // pageProps,
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
