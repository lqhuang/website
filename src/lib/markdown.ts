import type { CompileOptions } from '@mdx-js/mdx'
import type { RemarkHeadingOptions } from 'fumadocs-core/mdx-plugins'
import type { RehypeShikiOptions } from '@shikijs/rehype'

import { remarkGfm, remarkHeading } from 'fumadocs-core/mdx-plugins'
import remarkMath from 'remark-math'
import remarkCjkFriendly from 'remark-cjk-friendly'

import rehypeKatex from 'rehype-katex'
import rehypeShiki from '@shikijs/rehype'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
} from '@shikijs/transformers'
import { shikiDarkTheme, shikiLightTheme, configuredLangs } from 'src/lib/shiki'

import { remarkImageResolve } from 'src/lib/remark-image-resolve'

export const remarkPlugins: CompileOptions['remarkPlugins'] = [
  remarkGfm,
  [remarkHeading, { generateToc: false } satisfies RemarkHeadingOptions],
  remarkCjkFriendly,
  remarkMath,
  remarkImageResolve,
]
export const rehypePlugins: CompileOptions['rehypePlugins'] = [
  // `rehypeKatex` should be executed before the syntax highlighter
  rehypeKatex,
  [
    rehypeShiki,
    {
      langs: configuredLangs,
      defaultLanguage: 'plaintext',
      fallbackLanguage: 'plaintext',
      themes: { light: shikiLightTheme, dark: shikiDarkTheme },
      inline: 'tailing-curly-colon',
      transformers: [
        transformerNotationDiff({ matchAlgorithm: 'v3' }),
        transformerNotationHighlight({ matchAlgorithm: 'v3' }),
        transformerNotationErrorLevel(),
        transformerMetaHighlight(),
      ],
    } satisfies RehypeShikiOptions,
  ],
]

export const remarkRehypeOptions: CompileOptions['remarkRehypeOptions'] = {
  allowDangerousHtml: true, // Content is controlled by myself
  footnoteLabelProperties: { className: '' },
  footnoteBackContent: '⤴',
  // `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  //    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  //  </svg>`,
}

export const defaultMdxOptions: CompileOptions = {
  remarkPlugins,
  rehypePlugins,
  remarkRehypeOptions,
}
