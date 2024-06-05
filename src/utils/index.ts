export { product } from './itertools'

export const sortDateAsc = (a: string | Date, b: string | Date) => {
  return new Date(a).getTime() - new Date(b).getTime()
}

export const sortDateDesc = (a: string | Date, b: string | Date) => {
  return new Date(b).getTime() - new Date(a).getTime()
}
