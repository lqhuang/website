import type { PageOpts } from 'nextra'
import type { ReactNode } from 'react'
import type { Components } from 'nextra/mdx'

export interface siteInfo {
  title?: string
  author?: string
  nickname?: string
  email?: string
  description?: string
  url?: string
  // social: {
  //   twitter: '_lqhuang'
  //   github: 'lqhuang'
  //   linkedin: 'lqhuang'
  //   instgram: 'lanqing.huang'
  // }
}

export interface NextraThemeConfig {
  logo?: ReactNode
  comments?: ReactNode
  components?: Components
  cusdis?: {
    appId: string
    host?: string
    lang: string
  }
  darkMode?: boolean
  footer?: ReactNode
  head?: ({
    meta,
    title,
  }: {
    meta: Record<string, any>
    title: string
  }) => ReactNode
  navs?: {
    name: string
    url: string
  }[]
  postFooter?: string
  readMore?: string
  titleSuffix?: string
  site?: siteInfo
}

export type BlogPageOpts = PageOpts<BlogFrontMatter>

export type BlogFrontMatter = {
  author?: string
  back?: string
  date?: string
  description?: string
  tag?: string | string[]
  title?: string
  type?: 'post' | 'page' | 'posts' | 'tag'
}

export interface LayoutProps {
  config: NextraThemeConfig
  opts: BlogPageOpts
}
