import type { z } from 'zod'
import type { Doc, Metadata, Slug } from './schema'

import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import { glob } from 'glob'
import { VFile } from 'vfile'
import { compileMDX } from 'next-mdx-remote/rsc'

import { splitDateAndTitle } from 'src/lib/naming'
import { VALID_MD_EXT_REGEX, VALID_INDEX_REGEX } from 'src/constants'
import { defaultComponents } from 'src/theme/components'
import { defaultMdxOptions } from 'src/lib/markdown'

export const buildCollection = async <T extends Record<string, unknown>>(
  dir: string,
  schema: z.ZodSchema<T>,
): Promise<Doc<T>[]> => {
  const isDir = (await fs.stat(dir)).isDirectory()
  if (!isDir) {
    throw new Error(`Invalid input: ${dir} must be a directory`)
  }

  const dbSet = new Set<Slug>()
  const db: Doc<T>[] = []

  const validEntries = await collectDocs(dir)
  for (const entry of validEntries) {
    const metadata = genMetadata(entry)
    if (!dbSet.has(metadata.slug)) {
      const collection = await readContentAndFrontmatter<T>(metadata, schema)
      db.push(collection)
      dbSet.add(metadata.slug)
    }
  }

  return db
}

export const defineOneDoc = async <T extends Record<string, unknown>>(
  docPath: string,
  schema: z.ZodSchema<T>,
): Promise<Doc<T>> => {
  const fsStat = await fs.stat(docPath)
  if (!fsStat.isFile() && !fsStat.isDirectory()) {
    throw new Error(`Invalid input: ${docPath} must be a directory or a file`)
  }

  const entry = await collectDoc(docPath)
  const metadata = genMetadata(entry)

  return await readContentAndFrontmatter<T>(metadata, schema)
}

export const isValidExt = (ext: string): 'md' | 'mdx' => {
  if (!VALID_MD_EXT_REGEX.test(ext))
    throw Error("ext of file is not 'md' or 'mdx'")
  return ext as 'md' | 'mdx'
}

export const genMetadata = (entry: string): Metadata => {
  const fpath = path.resolve(entry)
  const extHolder = path.extname(fpath)
  const ext = isValidExt(extHolder.replace('.', ''))
  const stem = path.basename(fpath, extHolder)
  const parentDir = path.dirname(fpath)

  let slug = undefined
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
  if (!slug) throw new Error(`Invalid file name: ${stem}`)

  return {
    path: fpath,
    ext,
    stem,
    slug,
    isDir,
    date,
  }
}

export const readContentAndFrontmatter = async <
  T extends Record<string, unknown>,
>(
  metadata: Metadata,
  schema: z.ZodSchema<T>,
): Promise<Doc<T>> => {
  const raw = await fs.readFile(metadata.path, { encoding: 'utf-8' })
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { content, frontmatter } = await compileMDX<T>({
      source: new VFile({
        path: metadata.path,
        value: raw,
      }),
      options: {
        mdxOptions: {
          // elementAttributeNameCase: _metadata.ext == 'md' ? 'html' : 'react',
          format: metadata.ext,
          ...defaultMdxOptions,
        },
        parseFrontmatter: true,
      },
      components: defaultComponents,
    })
    return {
      metadata,
      frontmatter: schema.parse(frontmatter),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      content,
    }
  } catch (error) {
    console.error('Error compiling MDX for file', metadata)
    throw error
  }
}

const collectDocs = async (dir: string): Promise<string[]> => {
  const pattern = '**/*.{md,mdx}'
  const cwd = path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir)
  const validEntries = await glob(pattern, {
    cwd,
    ignore: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
    absolute: true,
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
    throw new Error(
      `No valid markdown/mdx file found in ${cwd} with pattern ${pattern}`,
    )
  }
  return validEntries
}

const collectDoc = async (docPath: string): Promise<string> => {
  if (docPath.endsWith('.md') || docPath.endsWith('.mdx')) {
    return docPath
  } else {
    const pattern = '**.{md,mdx}'
    const cwd = path.isAbsolute(docPath)
      ? docPath
      : path.resolve(process.cwd(), docPath)
    const validEntries = await glob(pattern, {
      cwd,
      ignore: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
      absolute: true,
    })

    if (validEntries.length == 0) {
      throw new Error(
        `No valid markdown/mdx file found in ${cwd} with pattern ${pattern}`,
      )
    }
    return validEntries[0]
  }
}
