import { join, resolve } from 'node:path'

import { defineCollection, defineConfig } from '@content-collections/core'

import { readContentAndFrontmatter } from 'src/content/local'
import { contentDir } from 'src/config'

/**
 * The following `Meta` type is defined by 'content-collections'
 *
 * type Meta = {
 *     filePath: string;
 *     fileName: string;
 *     directory: string;
 *     path: string;
 *     extension: string;
 * }
 */

const postsDir = join(contentDir, 'writings')
const posts = defineCollection({
  name: 'posts',
  directory: postsDir,
  include: '**/*.md',
  schema: z => ({
    title: z.string(),
    created: z.string(),
    updated: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
  transform: async (doc, context) => {
    const fullPath = resolve(join(postsDir, doc._meta.filePath))
    const { metadata, frontmatter, content } =
      await readContentAndFrontmatter(fullPath)
    return {
      ...doc,
      // add metadata
      collection: 'posts',
      frontmatter,
      content,
      metadata: {
        ...metadata,
        date: null, // bugs in content-collections
      },
    }
  },
})

const snippetsDIR = join(contentDir, 'snippets')
const snippets = defineCollection({
  name: 'snippets',
  directory: snippetsDIR, // join(contentDir, 'snapshots'),
  include: '**/*.md',
  //   yaml: true,
  schema: z => ({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
  transform: async (doc, context) => {
    const fullPath = resolve(join(snippetsDIR, doc._meta.filePath))
    const { metadata, frontmatter, content } =
      await readContentAndFrontmatter(fullPath)
    return {
      ...doc,
      // add metadata
      collection: 'snippets',
      frontmatter,
      content,
      metadata: {
        ...metadata,
        date: null, // bugs in content-collections
      },
    }
  },
})

export default defineConfig({
  collections: [posts, snippets],
})