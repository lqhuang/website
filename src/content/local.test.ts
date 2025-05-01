import type { Metadata } from './schema'

import { describe, it, expect } from 'vitest'

import { genMetadata } from './local'

describe('tests `genMetadata` function', () => {
  it('should handle dir based document', () => {
    expect(genMetadata('/whatever/2022-03-03-ok-yes/index.mdx')).toStrictEqual({
      path: '/whatever/2022-03-03-ok-yes/index.mdx',
      stem: 'index',
      ext: 'mdx',
      slug: 'ok-yes',
      date: new Date('2022-03-03'),
      isDir: true,
    } satisfies Metadata)
    expect(genMetadata('nothing/2024-02-01-my-title/readme.md')).toStrictEqual({
      path: 'nothing/2024-02-01-my-title/readme.md',
      stem: 'readme',
      ext: 'md',
      slug: 'my-title',
      date: new Date('2024-02-01'),
      isDir: true,
    } satisfies Metadata)
  })

  it('should handle single file document', () => {
    expect(genMetadata('a/2021-01-01-hello-world.mdx')).toStrictEqual({
      path: 'a/2021-01-01-hello-world.mdx',
      stem: '2021-01-01-hello-world',
      ext: 'mdx',
      slug: 'hello-world',
      date: new Date('2021-01-01'),
      isDir: false,
    } satisfies Metadata)
    expect(genMetadata('nothing/2024-02-01-a-title.md')).toStrictEqual({
      path: 'nothing/2024-02-01-a-title.md',
      stem: '2024-02-01-a-title',
      ext: 'md',
      slug: 'a-title',
      date: new Date('2024-02-01'),
      isDir: false,
    } satisfies Metadata)
  })

  it('should handle only date document', () => {
    expect(genMetadata('nothing/2024-02-01.md')).toStrictEqual({
      path: 'nothing/2024-02-01.md',
      stem: '2024-02-01',
      ext: 'md',
      slug: '2024-02-01',
      date: new Date('2024-02-01'),
      isDir: false,
    } satisfies Metadata)
  })

  it('should handle no date document', () => {
    expect(genMetadata('a/index.mdx')).toStrictEqual({
      path: 'a/index.mdx',
      stem: 'index',
      ext: 'mdx',
      slug: 'a',
      date: null,
      isDir: true,
    } satisfies Metadata)
    expect(genMetadata('single-article/README.md')).toStrictEqual({
      path: 'single-article/README.md',
      stem: 'README',
      ext: 'md',
      slug: 'single-article',
      date: null,
      isDir: true,
    } satisfies Metadata)
    expect(genMetadata('single-article.md')).toStrictEqual({
      path: 'single-article.md',
      stem: 'single-article',
      ext: 'md',
      slug: 'single-article',
      date: null,
      isDir: false,
    } satisfies Metadata)
  })
})
