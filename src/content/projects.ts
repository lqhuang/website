import type { Doc } from 'src/lib/content/schema'

import { join } from 'node:path'
import { z } from 'zod'

import { env } from 'src/env/server'

import { buildCollection } from 'src/lib/content/local'

export const ProjectFrontMatter = z.object({})
export type ProjectFrontMatter = z.infer<typeof ProjectFrontMatter>

const projectsDir = join(env.CONTENT_DIR, 'projects')
// const projects = defineCollection({
//   name: 'projects',
//   directory: projectsDir,
//   include: '**/*.md',
//   //   yaml: true,
//   schema: ProjectFrontMatter,
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

export const allProjects: Doc<ProjectFrontMatter>[] = await buildCollection(
  projectsDir,
  ProjectFrontMatter,
)
