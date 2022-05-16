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
export type { Node, PaginationNode }
