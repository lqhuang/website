export type Metadata = {
  fullPath: string
  slug: string
  isDir: boolean
  // files: string[]
  date: Date | null
}

export type Doc<T> = {
  metadata: Metadata
  frontmatter: T
  content: string
}

export type Dirname = string
export type Slug = string
export type Content<T> = Doc<T>[]
