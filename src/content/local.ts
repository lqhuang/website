import type { z } from 'zod'
import type { PathLike } from 'node:fs'
import type { GlobEntry } from 'globby'
import type { Doc, Metadata, Slug } from './schema'

import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import { globby } from 'globby'
import * as matter from 'gray-matter'
import { parse as parseYaml } from 'yaml'

import { VALID_EXT_REGEX, VALID_INDEX_REGEX } from 'src/constants'

import { splitDateAndTitle } from 'src/utils/naming'

export const buildCollection = async <T>(
  dir: PathLike,
  schema: z.ZodSchema<T>,
): Promise<Doc<T>[]> => {
  const isDir = (await fs.stat(dir)).isDirectory()
  if (!isDir) {
    throw new Error(`Invalid input: ${dir.toString()}, must be a directory`)
  }

  const dbSet = new Set<Slug>()
  const db: Doc<T>[] = []

  const validEntries = await collectFiles(dir.toString())

  for (const entry of validEntries) {
    const metadata = genMetadata(entry.path)
    if (!dbSet.has(metadata.slug)) {
      const collection = await readContentAndFrontmatter<T>(
        entry,
        metadata,
        schema,
      )
      db.push(collection)
      dbSet.add(metadata.slug)
    }
  }

  return db
}

export const isValidExt = (ext: string): 'md' | 'mdx' => {
  if (!VALID_EXT_REGEX.test(ext))
    throw Error("ext of file is not 'md' or 'mdx'")
  return ext as 'md' | 'mdx'
}

export const genMetadata = (filePath: string): Metadata => {
  const extHolder = path.extname(filePath)
  const ext = isValidExt(extHolder.replace('.', ''))
  const stem = path.basename(filePath, extHolder)
  const parentDir = path.dirname(filePath)

  let slug = ''
  let isDir = false
  let date = null
  if (VALID_INDEX_REGEX.test(stem)) {
    /**
     * the content file is readme or index.
     * Use the parent directory name as the slug and title
     */
    isDir = true
    const parentName = path.basename(parentDir)
    const { date: d, title } = splitDateAndTitle(parentName)
    slug = title
    date = d
  } else {
    /**
     * use the file name as the slug and title
     */
    isDir = false
    const { date: d, title } = splitDateAndTitle(stem)
    slug = title
    date = d
  }

  if (!slug) {
    throw new Error(`Invalid file name: ${stem}`)
  }

  return {
    path: filePath,
    ext,
    stem,
    slug,
    isDir,
    date,
  }
}

export const readContentAndFrontmatter = async <T>(
  entry: GlobEntry,
  metadata: Metadata | undefined = undefined,
  schema: z.ZodSchema<T>,
): Promise<Doc<T>> => {
  const _metadata = metadata ?? genMetadata(entry.path)
  // const raw = await fs.readFile(fullPath)
  // const { data: frontmatter, content } = matter(raw, {
  //   engines: {
  //     // Provide custom YAML engine to avoid parsing of date values https://github.com/jonschlinkert/gray-matter/issues/62)
  //     yaml: str => schema.parse(parseYaml(str)) as object,
  //   },
  // })

  const prefix = path.dirname(_metadata.path)

  if (_metadata.ext === 'md') {
    console.log(prefix + '/' + _metadata.stem + '.md')
    const { default: MDXContent, metadata: frontmatter } = await import(
      prefix + '/' + _metadata.stem + '.md'
    )
    return {
      metadata: _metadata,
      frontmatter: schema.parse(frontmatter),
      MDXContent,
    }
  } else if (_metadata.ext === 'mdx') {
    console.log(prefix + '/' + _metadata.stem + '.mdx')
    const { default: MDXContent, metadata: frontmatter } = await import(
      prefix + '/' + _metadata.stem + '.mdx'
    )

    return {
      metadata: _metadata,
      frontmatter: schema.parse(frontmatter),
      MDXContent,
    }
  } else throw Error('unreachable path')
}

const collectFiles = async (dir: string): Promise<GlobEntry[]> => {
  const pattern = path.join(path.normalize(dir), '**/', '*.{md,mdx}')
  const validEntries = await globby(pattern, {
    gitignore: true,
    objectMode: true,
  })
  // const validFiles = (
  //   await fs.readdir(dir, {
  //     recursive: true,
  //   })
  // )
  //   .filter(fname => {
  //     const isMdxFile = regex_pattern.test(fname.toString())
  //     return isMdxFile
  //   })
  //   .map(fname => path.join(dir, fname.toString()))

  if (validEntries.length == 0) {
    throw new Error(`No valid markdown/mdx file found in ${dir}`)
  }
  return validEntries
}
