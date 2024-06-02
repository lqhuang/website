import type { PageOpts } from 'nextra'
import type { ReactNode } from 'react'
import type { Components } from 'nextra/mdx'

export interface Persona {
  title?: string
  author?: string
  nickname?: string
  email?: string
  description?: string
  url?: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
    instgram?: string
  }
}

export interface ThemeConfig {
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
  site?: Persona
}

export type BlogPageOpts = PageOpts<BlogFrontMatter>

export type BlogFrontMatter = {
  author?: string
  date?: string
  created?: string
  updated?: string
  description?: string
  tags?: string[]
  title?: string
  type?: 'post' | 'page' | 'posts' | 'tags' | string
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
  frontMatter: {
    title: string
    // created: string
    // tags?: string[]
  }
}

export interface LayoutProps {
  config: ThemeConfig
  opts: BlogPageOpts
}
