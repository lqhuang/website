import { it, expect } from 'vitest'

import { splitDateAndTitle, REGEX_DATE_IN_TITLE } from './naming'

it('test regex `REGEX_DATE_IN_TITLE`', () => {
  expect(REGEX_DATE_IN_TITLE.test('2016-04-15-markdown-example')).toBe(true)
  expect(REGEX_DATE_IN_TITLE.test('2016-04-15-markdown')).toBe(true)
  expect(REGEX_DATE_IN_TITLE.test('2016-04-15---mark____down')).toBe(true)

  expect(REGEX_DATE_IN_TITLE.test('2016-04-15-')).toBe(true)
  expect(REGEX_DATE_IN_TITLE.test('2016-04-15')).toBe(true)

  expect(REGEX_DATE_IN_TITLE.test('2016-04-15markdown-example')).toBe(true)
  expect(REGEX_DATE_IN_TITLE.test('2016-04a-15')).toBe(false)
  expect(REGEX_DATE_IN_TITLE.test('2016-043-15')).toBe(false)
  expect(REGEX_DATE_IN_TITLE.test('2016-0a-15')).toBe(false)
  expect(REGEX_DATE_IN_TITLE.test('20116-01-15')).toBe(false)
  expect(REGEX_DATE_IN_TITLE.test('2016-04-015')).toBe(false)
})

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
