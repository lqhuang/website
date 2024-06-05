/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * Returns the cartesian product of the given arrays.
 */
export const product = (...a) =>
  a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
