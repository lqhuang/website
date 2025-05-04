import type { BundledLanguage } from 'shiki'
import type { RehypeShikiOptions } from '@shikijs/rehype'

import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
} from '@shikijs/transformers'
import { bundledLanguages, createHighlighter } from 'shiki/bundle/full'

export const configuredLangs = [
  'asciidoc', // 'adoc',
  'bat', // 'batch',
  'bibtex',
  'c',
  'cmake',
  'cpp',
  'csv',
  'diff',
  'docker',
  'haskell',
  'ini', // 'properties',
  'javascript',
  'jinja',
  'json',
  'jsonc',
  'jsonl',
  'latex',
  'log',
  'lua',
  'make', // 'makefile',
  'markdown',
  'mermaid',
  'prisma',
  'proto',
  'python',
  'rst',
  'rust',
  'scala',
  'shellscript', // 'bash', 'sh', 'shell', 'zsh',
  'shellsession', // 'console'
  'sql',
  'systemd',
  'toml',
  'typescript',
  'typespec',
  'typst',
  'viml', // 'vim', 'vimscript',
  'yaml',
] satisfies BundledLanguage[]
export const shikiLightTheme = 'catppuccin-latte'
export const shikiDarkTheme = 'tokyo-night'

export const highlighter = await createHighlighter({
  themes: [shikiLightTheme, shikiDarkTheme],
  langs: [...Object.keys(bundledLanguages)],
})

export const rehypeShikiOptions = {
  defaultLanguage: 'plaintext',
  fallbackLanguage: 'plaintext',
  inline: 'tailing-curly-colon',
  themes: { light: shikiLightTheme, dark: shikiDarkTheme },
  transformers: [
    transformerNotationDiff({ matchAlgorithm: 'v3' }),
    transformerNotationHighlight({ matchAlgorithm: 'v3' }),
    transformerNotationErrorLevel(),
    transformerMetaHighlight(),
  ],
} satisfies RehypeShikiOptions
