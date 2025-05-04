import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import { describe, it, expect, test } from 'vitest'

import { compileMDX } from 'next-mdx-remote/rsc'

import { Img, SVG, Picture } from 'src/theme/images'

import { compileAndRenderStatic } from './utils'

describe('next-mdx-remote -> `compileMDX`', () => {
  const fpath = path.join(import.meta.dirname, 'fixtures/simple-markdown.md')
  const realFrontmatter = {
    title: "Deep Dive into Flask's Application and Request Contexts",
    date: '2021-12-15',
    tags: ['python'],
  }

  it('should parse markdown (md) content', async () => {
    const source = await fs.readFile(fpath, { encoding: 'utf-8' })
    const { frontmatter } = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    })
    expect(frontmatter).not.empty
    expect(frontmatter).toStrictEqual(realFrontmatter)
  })

  it('cannot load markdown (md) file through VFile (directly)', async () => {
    const url = new URL('fixtures/simple-markdown.md', import.meta.url)
    const { frontmatter } = await compileMDX({
      source: url,
      options: { parseFrontmatter: true },
    })
    expect(frontmatter).empty
    const { frontmatter: another } = await compileMDX({
      source: { path: fpath },
      options: { parseFrontmatter: true },
    })
    expect(another).empty
  })

  it('pass corner case: `/` (U+002F) error', async () => {
    const fpath = path.join(
      import.meta.dirname,
      'fixtures/2022-05-01-trusted_proxies-in-caddy-2.5-release.md',
    )
    const source = await fs.readFile(fpath, { encoding: 'utf-8' })
    await compileMDX({
      source,
      // This file will fail if format is not set to md
      options: { mdxOptions: { format: 'md' } },
    })
  })

  // it('should local images for dir based document', async () => {
  //   const fpath = path.join(
  //     import.meta.dirname,
  //     'fixtures/dir-based-doc/index.md',
  //   )
  //   const source = await fs.readFile(fpath, { encoding: 'utf-8' })

  //   const htmlContent = await compileAndRenderStatic({
  //     source,
  //     options: { parseFrontmatter: true },
  //     components: { img: Img },
  //   })
  //   expect(htmlContent).toMatchInlineSnapshot()
  // })
  // it('should generate node for images', async () => {
  //   const fpath = path.join(
  //     import.meta.dirname,
  //     'fixtures/dir-based-doc/index.md',
  //   )
  //   const source = await fs.readFile(fpath, { encoding: 'utf-8' })

  //   const { content } = await compileMDX({
  //     source,
  //     options: { mdxOptions: { format: 'md' } },
  //     components: { img: Img, picture: Picture, svg: SVG },
  //   })
  // })
})
