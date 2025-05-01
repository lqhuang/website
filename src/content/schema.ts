import type { CompileMDXResult } from 'next-mdx-remote/rsc'

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
  content: CompileMDXResult<T>['content']
}
export type Content<T> = Doc<T>[]
