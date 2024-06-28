'use server'

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { useComponents } from 'src/theme/components'

import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import rehypeShiki from '@shikijs/rehype'
import { shikiDarkTheme, shikiLightTheme } from 'src/lib/shiki'

const serializeOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypeShiki,
        {
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

export const Markdown = ({ content }: { content: string }) => {
  return (
    <MDXRemote
      options={serializeOptions}
      components={useComponents()}
      source={content}
    />
  )
}
