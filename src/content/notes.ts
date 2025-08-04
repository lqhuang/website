import matter from 'gray-matter'

import { genMetadata } from 'src/lib/content/local'
import { sortDateAsc } from 'src/utils'

import { NoteFrontMatter } from './schema'
import { notes as notesData } from './data'

export const notes = notesData
  .map(doc => {
    const metadata = genMetadata(doc._file.absolutePath)

    return {
      metadata,
      frontmatter: NoteFrontMatter.parse(matter(doc.content).data),
      Body: doc.body,
    }
  })
  .sort((a, b) => sortDateAsc(a.frontmatter.date, b.frontmatter.date))
