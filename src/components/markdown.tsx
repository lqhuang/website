import type { FC } from 'react'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

import { MDXRemote } from 'next-mdx-remote/rsc'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypeShiki from '@shikijs/rehype'

import { shikiDarkTheme, shikiLightTheme, configuredLangs } from 'src/lib/shiki'
import { useComponents } from 'src/theme/components'

const serializeOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypeShiki,
        {
          langs: configuredLangs,
          themes: {
            light: shikiLightTheme,
            dark: shikiDarkTheme,
          },
        },
      ],
    ],
    format: 'md',
  },
  parseFrontmatter: false,
}

export const Markdown: FC<{ content: string }> = ({ content }) => {
  return (
    <MDXRemote
      options={serializeOptions}
      components={useComponents()}
      source={content}
    />
  )
}
