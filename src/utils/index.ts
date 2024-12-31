import { format } from 'date-fns/format'

export const getYearWithMonth = (date: string | Date) => {
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
