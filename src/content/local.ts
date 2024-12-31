import type { PathLike } from 'node:fs'
import type { Dirname, Doc, Metadata, Content, Slug } from './schema'

import * as path from 'path'
import * as fs from 'fs/promises'

import matter from 'gray-matter'
import { parse as parseYaml } from 'yaml'

import { MARKDOWN_EXTENSION_REGEX, VALID_INDEX_REGEX } from 'src/constants'

import { splitDateAndTitle } from 'src/utils/naming'

export const buildCollection = async <T>(dir: PathLike): Promise<Doc<T>[]> => {
  const isDir = (await fs.stat(dir)).isDirectory()

  if (!isDir) {
    throw new Error(`Invalid input: ${dir}, must be a directory`)
  }

  const dbSet = new Set<Slug>()
  const db: Doc<T>[] = []

  const files = await collectFiles(dir.toString())

  for (const fullPath of files) {
    const metadata = genMetadata(fullPath)
    if (!dbSet.has(metadata.slug)) {
      const source = await readContentAndFrontmatter(fullPath, metadata)
      db.push(source)
      dbSet.add(metadata.slug)
    }
  }

  return db
}

export const genMetadata = (fullPath: string): Metadata => {
  const fname = path.basename(fullPath, path.extname(fullPath))

  let slug = ''
  let isDir = false
  let date = null
  if (VALID_INDEX_REGEX.test(fname)) {
    /**
     * use the parent directory name as the slug and title
     */
    isDir = true
    const parentDir = path.basename(path.dirname(fullPath))
    const { date: d, title } = splitDateAndTitle(parentDir)
    slug = title
    date = d
  } else {
    /**
     * use the file name as the slug and title
     */
    isDir = false
    const { date: d, title } = splitDateAndTitle(fname)
    slug = title
    date = d
  }

  if (!slug) {
    throw new Error(`Invalid file name: ${fname}`)
  }

  return {
    fullPath,
    slug,
    isDir,
    date,
  }
}

export const readContentAndFrontmatter = async (
  fullPath: string,
  metadata: Metadata | undefined = undefined,
): Promise<Doc<any>> => {
  const _metadata = metadata || genMetadata(fullPath)
  const raw = await fs.readFile(fullPath)
  const { data: frontmatter, content } = matter(raw, {
    engines: {
      // Provide custom YAML engine to avoid parsing of date values https://github.com/jonschlinkert/gray-matter/issues/62)
      yaml: str => parseYaml(str),
    },
  })

  return {
    metadata: _metadata,
    frontmatter,
    content,
  }
}

const collectFiles = async (
  dir: string,
  regex_pattern: RegExp = MARKDOWN_EXTENSION_REGEX,
): Promise<string[]> => {
  const validFiles = (
    await fs.readdir(dir, {
      recursive: true,
    })
  )
    .filter(fname => {
      const isMdxFile = regex_pattern.test(fname.toString())
      return isMdxFile
    })
    .map(fname => path.join(dir, fname.toString()))

  if (validFiles.length == 0) {
    throw new Error(`No valid markdown/mdx file found in ${dir}`)
  }
  return validFiles
}
