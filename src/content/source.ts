import { defineCollections, defineConfig } from 'fumadocs-mdx/config'

import { join } from 'node:path'

import { env } from '../env/server'
import { defaultMdxOptions } from '../lib/markdown'
import { NoteFrontMatter, PostFrontMatter } from './schema'

export const notes = defineCollections({
  type: 'doc',
  dir: join(env.CONTENT_DIR, 'notes'),
  schema: NoteFrontMatter,
})

export const posts = defineCollections({
  type: 'doc',
  dir: join(env.CONTENT_DIR, 'writings'),
  schema: PostFrontMatter,
})

export default defineConfig({
  mdxOptions: {
    preset: 'minimal',
    format: 'md',
    ...defaultMdxOptions,
  },
})
