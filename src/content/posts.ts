import type { Doc } from './schema'

import { join, resolve } from 'path'
import { z } from 'zod'

import { env } from 'src/env/server'

import { buildCollection } from './local'

export const PostFrontMatter = z.object({
  title: z.string(),
  created: z.coerce.string(),
  updated: z.coerce.string(),
  tags: z.string().array().optional(),
  draft: z.coerce.boolean().optional(),
})
export type PostFrontMatter = z.infer<typeof PostFrontMatter>

const postsDir = join(env.CONTENT_DIR, 'writings')
// const posts = defineCollection({
//   name: 'posts',
//   directory: postsDir,
//   include: '**/*.md',
//   schema: PostFrontMatter,
//   transform: async (doc, context) => {
//     const fullPath = resolve(join(postsDir, doc._meta.filePath))
//     const { metadata, frontmatter, content } =
//       await readContentAndFrontmatter(fullPath)
//     return {
//       ...doc,
//       // add metadata
//       collection: 'posts',
//       frontmatter,
//       content,
//       metadata: {
//         ...metadata,
//         date: null, // bugs in content-collections
//       },
//     }
//   },
// })

export const allPosts: Doc<PostFrontMatter>[] = await buildCollection(
  postsDir,
  PostFrontMatter,
)
