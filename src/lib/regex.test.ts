import { it, expect } from 'vitest'

import { REGEX_DATE_IN_TITLE, VIDEO_EXT_REGEX, IMAGE_EXT_REGEX } from './regex'

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

it('test regex `IMAGE_EXT_REGEX`', () => {
  expect(VIDEO_EXT_REGEX.test('.mp4')).toBe(true)
  expect(VIDEO_EXT_REGEX.test('mp4')).toBe(true)
  expect(VIDEO_EXT_REGEX.test('aaa')).toBe(false)
  expect(VIDEO_EXT_REGEX.test('.png')).toBe(false)
  expect(VIDEO_EXT_REGEX.test('webm')).toBe(true)
  expect(VIDEO_EXT_REGEX.test('.webm')).toBe(true)
})

it('test regex `VIDEO_EXT_REGEX`', () => {
  expect(IMAGE_EXT_REGEX.test('.png')).toBe(true)
  expect(IMAGE_EXT_REGEX.test('png')).toBe(true)
  expect(IMAGE_EXT_REGEX.test('.mp4')).toBe(false)
  expect(IMAGE_EXT_REGEX.test('mkv')).toBe(false)
  expect(IMAGE_EXT_REGEX.test('avif')).toBe(true)
  expect(IMAGE_EXT_REGEX.test('.avif')).toBe(true)
  expect(IMAGE_EXT_REGEX.test('.webp')).toBe(true)
})
