import type { ReactElement } from 'react'

export type Dirname = string
export type Slug = string

export type Metadata = {
  path: string
  stem: string
  ext: 'md' | 'mdx'
  slug: Slug
  isDir: boolean
  date: Date | null
  files?: string[]
}
export type Doc<T> = {
  metadata: Metadata
  frontmatter: T
  content: ReactElement
}
export type Content<T> = Doc<T>[]
