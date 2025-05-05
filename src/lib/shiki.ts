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
  'css',
  'csv',
  'cypher',
  'diff',
  'docker',
  'dotenv',
  'git-commit',
  'git-rebase',
  'haskell',
  'hcl',
  'html',
  'ini', // 'properties',
  'javascript',
  'jinja',
  'json',
  'jsonc',
  'jsonl',
  'jsx',
  'latex',
  'lean',
  'llvm',
  'log',
  'lua',
  'make', // 'makefile',
  'markdown',
  'matlab',
  'mdc',
  'mdx',
  'mermaid',
  'nginx',
  'nix',
  'prisma',
  'proto',
  'python',
  'regexp',
  'rst',
  'rust',
  'scala',
  'shellscript', // 'bash', 'sh', 'shell', 'zsh',
  'shellsession', // 'console'
  'sql',
  'systemd',
  'tex',
  'toml',
  'tsv',
  'tsx',
  'typescript',
  'typespec',
  'typst',
  'viml', // 'vim', 'vimscript',
  'wasm',
  'wikitext',
  'wit',
  'wolfram',
  'xml',
  'yaml',
  'zig',
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
