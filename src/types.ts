interface Node {
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

interface PaginationNode {
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

interface SiteMetadata {
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

export type { Node, PaginationNode, SiteMetadata }
