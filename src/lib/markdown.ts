import type { CompileOptions } from '@mdx-js/mdx'
import type { RemarkHeadingOptions } from 'fumadocs-core/mdx-plugins'

import { remarkGfm, remarkHeading } from 'fumadocs-core/mdx-plugins'
import remarkMath from 'remark-math'

import rehypeKatex from 'rehype-katex'

// import rehypeShiki from '@shikijs/rehype'

import { shikiDarkTheme, shikiLightTheme, configuredLangs } from 'src/lib/shiki'

import { remarkImageResolve } from 'src/lib/remark-image-resolve'

export const remarkPlugins: CompileOptions['remarkPlugins'] = [
  remarkGfm,
  // remarkMath,
  remarkImageResolve,
  [remarkHeading, { generateToc: false } satisfies RemarkHeadingOptions],
]
export const rehypePlugins: CompileOptions['rehypePlugins'] = [
  // `rehypeKatex` should be executed before the syntax highlighter
  rehypeKatex,
  // [
  //   rehypeShiki,
  //   {
  //     langs: configuredLangs,
  //     themes: {
  //       light: shikiLightTheme,
  //       dark: shikiDarkTheme,
  //     },
  //   },
  // ],
  // [
  //   rehypeMdxImportMedia,
  //   {
  //     attributes: defaultImportMediaAttributes,
  //   } satisfies RehypeMdxImportMediaOptions,
  // ],
]

export const mdxOptions: CompileOptions = {
  remarkPlugins,
  rehypePlugins,
}
