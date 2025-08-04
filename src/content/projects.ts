import type { Doc } from 'src/lib/content/schema'

import { join } from 'node:path'
import { z } from 'zod'

import { env } from 'src/env/server'
import { defineDocs, defineOneDoc } from 'src/lib/content/local'

import { ProjectFrontMatter } from './schema'

const projectsDir = join(env.CONTENT_DIR, 'projects')

export const projects: Doc<ProjectFrontMatter>[] = await defineDocs(
  projectsDir,
  ProjectFrontMatter,
)
export const readme = await defineOneDoc(
  join(env.CONTENT_DIR, 'projects', 'README.md'),
  ProjectFrontMatter,
)
