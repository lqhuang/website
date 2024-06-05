import { join, resolve } from 'node:path'

import { defineCollection, defineConfig } from '@content-collections/core'

import { readContentAndFrontmatter } from 'src/content/local'

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

const posts = defineCollection({
  name: 'posts',
  directory: 'examples/articles', // join(contentDir, 'articles'),
  include: '**/*.md',
  //   yaml: true,
  schema: z => ({
    title: z.string(),
    created: z.string(),
    updated: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
  transform: async (doc, context) => {
    const fullPath = resolve(join('examples/articles', doc._meta.filePath))
    const { metadata, frontmatter, content } =
      await readContentAndFrontmatter(fullPath)
    return {
      ...doc,
      // add metadata
      frontmatter,
      content,
      metadata: {
        ...metadata,
        date: null, // bugs in content-collections
      },
    }
  },
})

const DIGESTS_DIR = 'blog/snapshots'
const digests = defineCollection({
  name: 'snapshots',
  directory: DIGESTS_DIR, // join(contentDir, 'snapshots'),
  include: '**/*.md',
  //   yaml: true,
  schema: z => ({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
  }),
  transform: async (doc, context) => {
    const fullPath = resolve(join(DIGESTS_DIR, doc._meta.filePath))
    const { metadata, frontmatter, content } =
      await readContentAndFrontmatter(fullPath)
    return {
      ...doc,
      // add metadata
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
  collections: [posts, digests],
})
