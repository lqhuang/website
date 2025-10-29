import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import type { UseMdxComponents } from '@mdx-js/mdx'

export type SiteConfig = {
  name: string
  nickname?: string
  email?: string
  url?: string
  meta: Metadata & {
    title: string
    description: string
    applicationName: string
  }
  social?: {
    x?: string
    github?: string
    telegram?: string
    linkedin?: string
    instgram?: string
    bluesky?: string
    retro?: string
  }
}

export type ThemeConfig = {
  logo?: ReactNode
  darkMode?: boolean
  footer?: ReactNode
  head?: ({
    meta,
    title,
  }: {
    meta: Record<string, string | undefined>
    title: string
  }) => ReactNode
  navs?: {
    name: string
    url: string
  }[]
  components?: ReturnType<UseMdxComponents>
  comments?: ReactNode
  cusdis?: {
    appId: string
    host?: string
    lang: string
  }
  postFooter?: string
  readMore?: string
  titleSuffix?: string
}

export type Node = {
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

export type PaginationNode = {
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
