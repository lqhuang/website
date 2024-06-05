import type { PathLike } from 'node:fs'

import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import matter from 'gray-matter'
import { parse as parseYaml } from 'yaml'

import { MARKDOWN_EXTENSION_REGEX, VALID_INDEX_REGEX } from 'src/constants'

import { splitDateAndTitle } from 'src/utils/naming'

export interface Metadata {
  fullPath: string
  single: boolean
  slug: string
  date: Date | null
}

export interface Source {
  metadata: Metadata
  frontmatter: Record<string, string>
  content: string
}

export type Dirname = string
export type Slug = string
export type Content = Map<Slug, Source>
const globalSource = new Map<Dirname, Content>()

export const buildLocalSource = async (
  dir: PathLike,
): Promise<Map<Slug, Source>> => {
  const isDir = (await fs.stat(dir)).isDirectory()

  if (!isDir) {
    throw new Error(`Invalid input: ${dir}, must be a directory`)
  }

  const db = globalSource.get(dir.toString()) ?? new Map()

  const files = await collectFiles(dir.toString())
  // const pairs: [string, Source][] = await Promise.all(
  //   files
  //     .map(fullPath => genMetadata(fullPath))
  //     .map(async metadata => {
  //       const source = await readContentAndFrontmatter(metadata)
  //       return [metadata.slug, source]
  //     }),
  // )

  for (const fullPath of files) {
    const metadata = genMetadata(fullPath)
    if (process.env.NODE_ENV === 'development' || !db.has(metadata.slug)) {
      const source = await readContentAndFrontmatter(fullPath, metadata)
      db.set(metadata.slug, source)
    }
  }

  if (!globalSource.has(dir.toString())) {
    globalSource.set(dir.toString(), db)
  }
  return db
}

export const genMetadata = (fullPath: string): Metadata => {
  const fname = path.basename(fullPath, path.extname(fullPath))

  let slug = ''
  let single = false
  let date = null
  if (VALID_INDEX_REGEX.test(fname)) {
    /**
     * use the parent directory name as the slug and title
     */
    single = false
    const parentDir = path.basename(path.dirname(fullPath))
    const { date: d, title } = splitDateAndTitle(parentDir)
    date = d
    slug = title
  } else {
    /**
     * use the file name as the slug and title
     */
    single = true
    const { date: d, title } = splitDateAndTitle(fname)
    date = d
    slug = title
  }

  if (!slug) {
    throw new Error(`Invalid file name: ${fname}`)
  }

  return {
    fullPath,
    slug,
    date,
    single,
  }
}

export const readContentAndFrontmatter = async (
  fullPath: string,
  metadata: Metadata | undefined = undefined,
): Promise<Source> => {
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

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('tests `genMetadata` function', () => {
    expect(genMetadata('a/2021-01-01-hello-world.mdx')).toStrictEqual({
      fullPath: 'a/2021-01-01-hello-world.mdx',
      slug: 'hello-world',
      date: new Date('2021-01-01'),
      single: true,
    })
    expect(genMetadata('a/index.mdx')).toStrictEqual({
      fullPath: 'a/index.mdx',
      slug: 'a',
      date: null,
      single: false,
    })
    expect(genMetadata('/whatever/2022-03-03-ok-yes/index.mdx')).toStrictEqual({
      fullPath: '/whatever/2022-03-03-ok-yes/index.mdx',
      slug: 'ok-yes',
      date: new Date('2022-03-03'),
      single: false,
    })
    expect(genMetadata('nothing/2024-02-01-my-title/README.md')).toStrictEqual({
      fullPath: 'nothing/2024-02-01-my-title/README.md',
      slug: 'my-title',
      date: new Date('2024-02-01'),
      single: false,
    })
    expect(genMetadata('nothing/2024-02-01-a-title.md')).toStrictEqual({
      fullPath: 'nothing/2024-02-01-a-title.md',
      slug: 'a-title',
      date: new Date('2024-02-01'),
      single: true,
    })

    expect(genMetadata('nothing/2024-02-01.md')).toStrictEqual({
      fullPath: 'nothing/2024-02-01.md',
      slug: '2024-02-01',
      date: new Date('2024-02-01'),
      single: true,
    })
  })
}
