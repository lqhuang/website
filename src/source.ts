import type { PathLike } from 'node:fs'

import * as path from 'node:path'
import * as fs from 'node:fs'

import { MARKDOWN_EXTENSION_REGEX, INDEX_FNAME_REGEX } from './constants'

function separateDateAndTitle(str: string): { date: string; title: string } {
  const date = str.split('-', 3).join('-')
  // const date = new Date(dateString).toISOString().split('T')[0]
  const title = str.slice(date.length + 1)
  return { date, title }
}

export const buildLocalSource = (dir: PathLike) => {
  const files = fs.readdirSync(dir)
  const db = new Map<string, string>(
    files.map(fname => {
      const { title } = separateDateAndTitle(fname)
      return [title, path.join(dir.toString(), fname.toString())]
    }),
  )
  return db
}

const findSubMdxFile = (dir: string): string => {
  const validFiles = fs.readdirSync(dir).filter((fname: string) => {
    const fullPath = path.join(dir, fname)
    const isDirectory = fs.statSync(fullPath).isDirectory()
    const isMdxFile = MARKDOWN_EXTENSION_REGEX.test(fname)
    const isIndexFile = INDEX_FNAME_REGEX.test(fname)
    return !isDirectory && isMdxFile && isIndexFile
  })

  if (validFiles.length == 0) {
    throw new Error(`No valid mdx file found in ${dir}`)
  }

  return validFiles[0]
}

// const findSubMdxFile = (p: string): string => {
//   const files = path.

export const readMdxContent = (fullPath: string): string => {
  console.log(fullPath)
  const isMdxFile = MARKDOWN_EXTENSION_REGEX.test(fullPath)
  const isDirectory = fs.statSync(fullPath).isDirectory()
  const realFilePath =
    !isDirectory && isMdxFile
      ? fullPath
      : path.join(fullPath, findSubMdxFile(fullPath))
  return fs.readFileSync(realFilePath, 'utf-8')
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('test `separateDateAndTitle`', () => {
    expect(separateDateAndTitle('2016-04-15-markdown-example')).toStrictEqual({
      date: '2016-04-15',
      title: 'markdown-example',
    })

    expect(
      separateDateAndTitle('2017-04-04-code-and-syntax-highlighting'),
    ).toStrictEqual({
      date: '2017-04-04',
      title: 'code-and-syntax-highlighting',
    })

    expect(separateDateAndTitle('2017-08-07-katex')).toStrictEqual({
      date: '2017-08-07',
      title: 'katex',
    })
  })
}
