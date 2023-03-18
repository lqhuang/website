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
  components?: Components
  comments?: ReactNode
  cusdis?: {
    appId: string
    host?: string
    lang: string
  }
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

export interface Node {
  id: string
  excerpt: string
  body: string
  fields: {
    sourceInstanceName: string
    slug: string
    tagSlugs?: string[]
  }
  frontmatter: {
    title: string
    created?: string
    updated?: string
    date?: string
    tags?: string[]
  }
  [key: string]: unknown
}

export interface PaginationNode {
  fields: {
    slug: string
    // tagSlugs?: string[]
  }
  frontmatter: {
    title: string
    // created: string
    // tags?: string[]
  }
}

export interface SiteMetadata {
  title: string
  author: string
  nickname?: string
  description?: string
  email?: string
  url?: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
    instgram?: string
  }
}

export interface LayoutProps {
  config: NextraThemeConfig
  opts: BlogPageOpts
}
