import { REGEX_DATE_IN_TITLE, STRIP } from './regex'

export const splitDateAndTitle = (
  str: string,
): { date: Date | null; title: string } => {
  const hasDatePrefix = REGEX_DATE_IN_TITLE.test(str)

  if (!hasDatePrefix) {
    return { date: null, title: str.replace(STRIP, '') }
  }

  const dateOnlyString = str.split('-', 3).join('-')
  const title = str.slice(dateOnlyString.length).replace(STRIP, '').trim()

  try {
    const date = new Date(dateOnlyString)
    if (isNaN(date.getTime())) return { date: null, title }
    return { date, title: title === '' ? dateOnlyString : title }
  } catch {
    throw new Error(`Invalid date string: ${dateOnlyString}`)
    // return { date: null, title: str }
  }
}
