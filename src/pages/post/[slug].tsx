import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'

import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import type { BlogPageOpts, NextraThemeConfig } from 'src/theme/types'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { useMDXComponents } from 'nextra/mdx'

import Layout from 'src/theme'

import { buildLocalSource, readMdxContent } from 'src/source'

interface Props {
  mdxSource: MDXRemoteSerializeResult
  opts: BlogPageOpts
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { slug, fullPath },
}) => {
  console.log(slug, '->', fullPath)
  const dir = process.env.LOCAL_PATH_FOR_POSTS

  if (!dir) {
    throw new Error(
      `Error while fetch data from local source.\nLOCAL_PATH_FOR_POSTS=${dir}`,
    )
  }
  const content = readMdxContent(fullPath)

  const mdxSource = await serialize(content, { parseFrontmatter: true })
  const { frontmatter } = mdxSource

  return {
    props: {
      mdxSource,
      opts: { frontMatter: frontmatter },
      themeConfig: {},
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const dir = process.env.LOCAL_PATH_FOR_POSTS
  if (!dir) {
    return { paths: [], fallback: 'blocking' }
  }

  const db = buildLocalSource(dir)
  // console.log(db)
  // Array.from(db.entries()).forEach(([slug, fpath]) => console.log(slug, fpath))

  return {
    paths: Array.from(db.entries()).map(([slug, fullPath]) => ({
      params: { slug, fullPath },
    })),
    fallback: 'blocking',
  }
}

export default function Page({ mdxSource, opts }: Props) {
  const components = useMDXComponents()

  return (
    <Layout pageOpts={opts} themeConfig={themeConfig}>
      <MDXRemote {...mdxSource} components={{ ...components }} />
    </Layout>
  )
}
