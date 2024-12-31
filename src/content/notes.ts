import type { Doc } from './schema'

import { join, resolve } from 'path'
import { z } from 'zod'

import { env } from 'src/env/server'

import { buildCollection } from './local'

export const NoteFrontMatter = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()),
  draft: z.boolean().optional(),
  ref: z.string().optional(),
})
export type NoteFrontMatter = z.infer<typeof NoteFrontMatter>

const notesDir = join(env.CONTENT_DIR, 'notes')
// const notes = defineCollection({
//   name: 'notes',
//   directory: notesDir,
//   include: '**/*.md',
//   //   yaml: true,
//   schema: NoteFrontMatter,
//   transform: async (doc, context) => {
//     const fullPath = resolve(join(notesDIR, doc._meta.filePath))
//     const { metadata, frontmatter, content } =
//       await readContentAndFrontmatter(fullPath)
//     return {
//       ...doc,
//       // add metadata
//       collection: 'notes',
//       frontmatter,
//       content,
//       metadata: {
//         ...metadata,
//         date: null, // bugs in content-collections
//       },
//     }
//   },
// })

export const allNotes: Doc<NoteFrontMatter>[] = await buildCollection(notesDir)
