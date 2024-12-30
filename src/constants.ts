import { join } from 'path'

export const MARKDOWN_EXTENSION_REGEX = /\.mdx?$/i
export const MARKDOWN_URL_EXTENSION_REGEX = /\.mdx?(?:(?=[#?])|$)/
export const MARKDOWN_EXTENSIONS = ['md', 'mdx'] as const

export const VALID_INDEX_REGEX = /^(index|readme)$/i

export const LOCALE_REGEX = /\.([a-z]{2}(-[A-Z]{2})?)$/
export const DEFAULT_LOCALE = 'en-US'

export const DEFAULT_CONTENT_DIR = 'content'
export const PUBLIC_DIR = join(process.cwd(), 'public')

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('test `MARKDOWN_EXTENSION_REGEX`', () => {
    expect(MARKDOWN_EXTENSION_REGEX.test('2016-04-15-markdown-example')).toBe(
      false,
    )
    expect(
      MARKDOWN_EXTENSION_REGEX.test('2016-04-15-markdown-example.md'),
    ).toBe(true)
    expect(
      MARKDOWN_EXTENSION_REGEX.test('2016-04-15-markdown-example.mdx'),
    ).toBe(true)
    expect(
      MARKDOWN_EXTENSION_REGEX.test('2016-04-15-markdown-example.json'),
    ).toBe(false)
  })

  it('test `VALID_INDEX_REGEX`', () => {
    expect(VALID_INDEX_REGEX.test('index')).toBe(true)
    expect(VALID_INDEX_REGEX.test('Index')).toBe(true)
    expect(VALID_INDEX_REGEX.test('INDEX')).toBe(true)
    expect(VALID_INDEX_REGEX.test('readme')).toBe(true)
    expect(VALID_INDEX_REGEX.test('Readme')).toBe(true)
    expect(VALID_INDEX_REGEX.test('README')).toBe(true)

    expect(VALID_INDEX_REGEX.test('xREADME')).toBe(false)
    expect(VALID_INDEX_REGEX.test('xREADMEE')).toBe(false)
    expect(VALID_INDEX_REGEX.test('.READMEE.')).toBe(false)
    expect(VALID_INDEX_REGEX.test('xindex')).toBe(false)
    expect(VALID_INDEX_REGEX.test('indexx')).toBe(false)
    expect(VALID_INDEX_REGEX.test('aindexb')).toBe(false)

    expect(VALID_INDEX_REGEX.test('index.mdx')).toBe(false)
    expect(VALID_INDEX_REGEX.test('README.md')).toBe(false)

    expect(VALID_INDEX_REGEX.test('2021-01-01-hello-world.mdx')).toBe(false)
  })
}
