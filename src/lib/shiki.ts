import type { Root } from 'hast'
import type { Processor, Transformer } from 'unified'
import type { BundledLanguage } from 'shiki'
import type { RehypeShikiOptions } from '@shikijs/rehype'

import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerMetaHighlight,
} from '@shikijs/transformers'
import { bundledLanguages, createHighlighter } from 'shiki/bundle/full'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'

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

export const defaultShikiThemes = {
  light: shikiLightTheme,
  dark: shikiDarkTheme,
}

export const highlighter = await createHighlighter({
  themes: [defaultShikiThemes.light, defaultShikiThemes.dark],
  langs: [...Object.keys(bundledLanguages)],
})

/**
 * Get Shiki highlighter instance
 *
 * @param engineType
 *  engine type, the engine specified in `options` will only be effective when this is set to `custom`.
 * @param options
 *  Shiki options.
 */
export async function getHighlighter() {
  let engine
  if (engine === 'js') {
    engine = import('shiki/engine/javascript').then(res =>
      res.createJavaScriptRegexEngine(),
    )
  } else {
    engine = import('shiki/engine/oniguruma').then(res =>
      res.createOnigurumaEngine(import('shiki/wasm')),
    )
  }

  const { createHighlighter } = await import('shiki/bundle/full')
  const highlighter = await createHighlighter({
    engine,
    themes: [shikiLightTheme, shikiDarkTheme],
    langs: [...Object.keys(bundledLanguages)],
  })

  return highlighter
}

const globalForShiki = global as unknown as {
  shiki: ReturnType<typeof getHighlighter>
}

export const defaultRehypeShikiOptions = {
  defaultLanguage: 'plaintext',
  fallbackLanguage: 'plaintext',
  inline: 'tailing-curly-colon',
  themes: { light: shikiLightTheme, dark: shikiDarkTheme },
  transformers: [
    transformerNotationDiff({ matchAlgorithm: 'v3' }),
    transformerNotationErrorLevel({ matchAlgorithm: 'v3' }),
    transformerNotationFocus({ matchAlgorithm: 'v3' }),
    transformerNotationHighlight({ matchAlgorithm: 'v3' }),
    transformerNotationWordHighlight({ matchAlgorithm: 'v3' }),
    transformerMetaHighlight(),
  ],
} satisfies RehypeShikiOptions

/**
 * Handle codeblocks
 */
export function rehypeShiki(
  this: Processor,
  options: Partial<RehypeShikiOptions> = {},
): Transformer<Root, Root> {
  const _options: RehypeShikiOptions = {
    ...defaultRehypeShikiOptions,
    ...options,
  }

  return async (tree, file) => {
    const highlighter = await getHighlighter()

    /**
     * cache the highlighter instance globally
     * so that it can be reused in development mode
     * without re-initializing it every time.
     *
     * Avoids the following warning:
     *
     * ```
     * [Shiki] 10 instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call `highlighter.dispose()` to release unused instances.
     * ```
     */
    const shiki =
      globalForShiki.shiki ??
      (process.env.NODE_ENV === 'production'
        ? await getHighlighter()
        : await getHighlighter())
    if (process.env.NODE_ENV !== 'production') globalForShiki.shiki = shiki

    const transformer = rehypeShikiFromHighlighter(highlighter, _options)
    transformer(tree, file, () => {
      // nothing
    })
  }
}
