import { format } from 'date-fns/format'

export const getYearAndMonth = (date: string | Date) => {
  if (typeof date !== 'string' && !(date instanceof Date))
    throw Error(
      `input arg 'date' expects string or Date type, but received ${typeof date}`,
    )

  return format(new Date(date), 'yyyy-MM')
}

export const sortDateAsc = (
  a: string | Date | null,
  b: string | Date | null,
) => {
  if (a === b) return 0
  if (!a) return -1
  if (!b) return 1
  return new Date(a).getTime() - new Date(b).getTime()
}

export const sortDateDesc = (
  a: string | Date | null,
  b: string | Date | null,
) => {
  if (a === b) return 0
  if (!a) return 1
  if (!b) return -1
  return new Date(b).getTime() - new Date(a).getTime()
}
