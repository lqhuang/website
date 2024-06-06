import { getHighlighter, bundledLanguages } from 'shiki/bundle/full'

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
]
export const shikiLightTheme = 'catppuccin-latte'
export const shikiDarkTheme = 'tokyo-night'

export const highlighter = await getHighlighter({
  themes: [shikiLightTheme, shikiDarkTheme],
  langs: [...Object.keys(bundledLanguages)],
})
