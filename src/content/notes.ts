import type { Doc } from 'src/lib/content/schema'

import { join } from 'node:path'
// import matter from 'gray-matter'

import { defineDocs } from 'src/lib/content/local'
import { env } from 'src/env/server'
import { sortDateAsc } from 'src/utils'

import { NoteFrontMatter } from './schema'
// import { notes as notesData } from '@/.source'

// export const notes = notesData
//   .map(doc => {
//     const metadata = genMetadata(doc._file.absolutePath)

//     return {
//       metadata,
//       frontmatter: NoteFrontMatter.parse(matter(doc.content).data),
//       Body: doc.body,
//     }
//   })
//   .sort((a, b) => sortDateAsc(a.frontmatter.date, b.frontmatter.date))

export const notes: Doc<NoteFrontMatter>[] = (
  await defineDocs(join(env.CONTENT_DIR, 'notes'), NoteFrontMatter)
).sort((a, b) => sortDateAsc(a.frontmatter.date, b.frontmatter.date))
