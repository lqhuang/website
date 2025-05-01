import { join } from 'path'

export const MARKDOWN_EXTENSION_REGEX = /\.mdx?$/i
export const MARKDOWN_URL_EXTENSION_REGEX = /\.mdx?(?:(?=[#?])|$)/
export const MARKDOWN_EXTENSIONS = ['md', 'mdx'] as const

export const VALID_EXT_REGEX = /^(md|mdx)$/i
export const VALID_INDEX_REGEX = /^(index|readme)$/i

export const LOCALE_REGEX = /\.([a-z]{2}(-[A-Z]{2})?)$/
export const DEFAULT_LOCALE = 'en-US'

export const DEFAULT_CONTENT_DIR = 'content'
export const PUBLIC_DIR = join(process.cwd(), 'public')
