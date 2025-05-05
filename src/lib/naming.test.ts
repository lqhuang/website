import { it, expect } from 'vitest'

import { splitDateAndTitle } from './naming'

it('test function `splitDateAndTitle`', () => {
  expect(splitDateAndTitle('2016-04-15-markdown-example')).toStrictEqual({
    date: new Date('2016-04-15'),
    title: 'markdown-example',
  })

  expect(
    splitDateAndTitle('2017-04-04-code-and-syntax-highlighting'),
  ).toStrictEqual({
    date: new Date('2017-04-04'),
    title: 'code-and-syntax-highlighting',
  })

  expect(splitDateAndTitle('2016-04-15_-')).toStrictEqual({
    date: null,
    title: '',
  })

  expect(splitDateAndTitle('2017-08-07-katex')).toStrictEqual({
    date: new Date('2017-08-07'),
    title: 'katex',
  })

  expect(splitDateAndTitle('2016-04-15-')).toStrictEqual({
    date: new Date('2016-04-15'),
    title: '2016-04-15', // '',
  })
  expect(splitDateAndTitle('2016-04-15---')).toStrictEqual({
    date: new Date('2016-04-15'),
    title: '2016-04-15', // '',
  })
  expect(splitDateAndTitle('2016-04-15-____')).toStrictEqual({
    date: new Date('2016-04-15'),
    title: '2016-04-15', // '',
  })
  expect(splitDateAndTitle('2016-04-15')).toStrictEqual({
    date: new Date('2016-04-15'),
    title: '2016-04-15',
  })

  expect(splitDateAndTitle('-')).toStrictEqual({
    date: null,
    title: '',
  })
  expect(splitDateAndTitle('_')).toStrictEqual({
    date: null,
    title: '',
  })
  expect(splitDateAndTitle('-_asdf')).toStrictEqual({
    date: null,
    title: 'asdf',
  })
  expect(splitDateAndTitle('_asdf--_')).toStrictEqual({
    date: null,
    title: 'asdf',
  })

  expect(splitDateAndTitle('2021-01-01-hello-world')).toStrictEqual({
    date: new Date('2021-01-01'),
    title: 'hello-world',
  })
})
