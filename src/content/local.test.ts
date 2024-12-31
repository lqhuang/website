import { expect, it } from 'vitest'
import { genMetadata } from './local'

it('tests `genMetadata` function', () => {
  expect(genMetadata('a/2021-01-01-hello-world.mdx')).toStrictEqual({
    fullPath: 'a/2021-01-01-hello-world.mdx',
    slug: 'hello-world',
    date: new Date('2021-01-01'),
    isDir: false,
  })
  expect(genMetadata('a/index.mdx')).toStrictEqual({
    fullPath: 'a/index.mdx',
    slug: 'a',
    date: null,
    isDir: true,
  })
  expect(genMetadata('/whatever/2022-03-03-ok-yes/index.mdx')).toStrictEqual({
    fullPath: '/whatever/2022-03-03-ok-yes/index.mdx',
    slug: 'ok-yes',
    date: new Date('2022-03-03'),
    isDir: true,
  })
  expect(genMetadata('nothing/2024-02-01-my-title/README.md')).toStrictEqual({
    fullPath: 'nothing/2024-02-01-my-title/README.md',
    slug: 'my-title',
    date: new Date('2024-02-01'),
    isDir: true,
  })
  expect(genMetadata('nothing/2024-02-01-a-title.md')).toStrictEqual({
    fullPath: 'nothing/2024-02-01-a-title.md',
    slug: 'a-title',
    date: new Date('2024-02-01'),
    isDir: false,
  })

  expect(genMetadata('nothing/2024-02-01.md')).toStrictEqual({
    fullPath: 'nothing/2024-02-01.md',
    slug: '2024-02-01',
    date: new Date('2024-02-01'),
    isDir: false,
  })
})
