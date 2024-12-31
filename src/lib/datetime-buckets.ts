import { getYearWithMonth } from 'src/utils'

/**
 *
 * Collects an array of Date objects and assembles them into distinct "yyyy-mm"-like strings.
 *
 * @param datetimes
 *   An array of Date objects
 * @returns
 *   "yyyy-mm"-like string array
 */
export const datetimeBuckets = (datetimes: Date[]): string[] => {
  const buckets = new Set<string>()
  for (const dt of datetimes) {
    buckets.add(getYearWithMonth(dt))
  }
  return Array.from(buckets)
}
