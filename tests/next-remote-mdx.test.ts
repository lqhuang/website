import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import { compileMDX } from 'next-mdx-remote/rsc'
import { describe, it, expect, expectTypeOf } from 'vitest'

describe('next-mdx-remote', () => {
  it('should load markdown (md) file', async () => {
    const file = path.join(import.meta.dirname, 'samples/simple-markdown.md')
    const source = (await fs.readFile(file, { encoding: 'utf-8' })).toString()
    const { frontmatter } = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    })
    expect(frontmatter).not.empty
    expect(frontmatter).toStrictEqual({
      title: "Deep Dive into Flask's Application and Request Contexts",
      date: '2021-12-15',
      tags: ['python'],
    })
  })
})
