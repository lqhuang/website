import type { Doc } from './schema'

import { join, resolve } from 'path'
import { z } from 'zod'

import { env } from 'src/env/server'

import { buildCollection } from './local'

export const NoteFrontMatter = z.object({})
export type NoteFrontMatter = z.infer<typeof NoteFrontMatter>

const projectsDir = join(env.CONTENT_DIR, 'projects')
// const projects = defineCollection({
//   name: 'projects',
//   directory: projectsDir,
//   include: '**/*.md',
//   //   yaml: true,
//   schema: NoteFrontMatter,
//   transform: async (doc, context) => {
//     const fullPath = resolve(join(projectsDIR, doc._meta.filePath))
//     const { metadata, frontmatter, content } =
//       await readContentAndFrontmatter(fullPath)
//     return {
//       ...doc,
//       // add metadata
//       collection: 'projects',
//       frontmatter,
//       content,
//       metadata: {
//         ...metadata,
//         date: null, // bugs in content-collections
//       },
//     }
//   },
// })

export const allProjects: Doc<NoteFrontMatter>[] = await buildCollection(
  projectsDir,
  NoteFrontMatter,
)
