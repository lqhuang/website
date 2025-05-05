import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

export async function compileAndRenderStatic({
  source,
  options,
  components,
}: MDXRemoteProps): Promise<string> {
  const mdxSource = await serialize(source, options)
  return renderToStaticMarkup(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <MDXRemote {...mdxSource} components={components} />,
  )
}
