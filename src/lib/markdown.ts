import type { CompileOptions } from '@mdx-js/mdx'
import type {
  RemarkHeadingOptions,
  // RemarkImageOptions,
  // RehypeCodeOptions,
} from 'fumadocs-core/mdx-plugins'

import {
  remarkGfm,
  remarkHeading,
  // remarkImage,
  // rehypeCode,
  // rehypeCodeDefaultOptions,
} from 'fumadocs-core/mdx-plugins'

import remarkMath from 'remark-math'
import remarkCjkFriendly from 'remark-cjk-friendly'

import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'

import { rehypeShiki } from 'src/lib/shiki'
import { remarkImageResolve } from 'src/lib/remark-image-resolve'

export const remarkPlugins: CompileOptions['remarkPlugins'] = [
  remarkGfm,
  [remarkHeading, { generateToc: false } satisfies RemarkHeadingOptions],
  remarkMath,
  remarkCjkFriendly,
  // [remarkImage, { useImport: false } satisfies RemarkImageOptions],
  remarkImageResolve,
]
export const rehypePlugins: CompileOptions['rehypePlugins'] = [
  rehypeRaw,
  rehypeKatex, // `rehypeKatex` should be executed before the syntax highlighter
  rehypeShiki,
  // [
  //   rehypeCode,
  //   {
  //     ...rehypeCodeDefaultOptions,
  //     ...rehypeShikiOptions,
  //     experimentalJSEngine: true,
  //   } satisfies RehypeCodeOptions,
  // ],
]

export const remarkRehypeOptions: CompileOptions['remarkRehypeOptions'] = {
  allowDangerousHtml: true, // Content is controlled by myself, but not work !!!
  footnoteLabelProperties: { className: '' },
  footnoteBackContent: '⤴',
  // `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  //    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  //  </svg>`,

  /**
   *  You need to pass through `html` to allow `rehypeRaw` to work or you would get an error like this:
   *
   * ```
   * Error: Cannot compile `mdxJsxFlowElement` node. It looks like you are using MDX nodes with
   *   `hast-util-raw` (or `rehype-raw`). If you use this because you are using remark or rehype
   *   plugins that inject `'html'` nodes, then please raise an issue with that plugin, as its
   *   a bad and slow idea. If you use this because you are using markdown syntax, then you have
   *   to configure this utility (or plugin) to pass through these nodes (see `passThrough` in docs),
   *   but you can also migrate to use the MDX syntax
   * ```
   *
   * Emm ...
   */
  passThrough: ['html'],
}

export const defaultMdxOptions: Pick<
  CompileOptions,
  'remarkPlugins' | 'rehypePlugins' | 'remarkRehypeOptions'
> = {
  remarkPlugins,
  rehypePlugins,
  remarkRehypeOptions,
}
