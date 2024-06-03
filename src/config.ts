import { join } from 'path'

import { DEFAULT_CONTENT_DIR } from './constants'

export const contentDir = join(
  process.cwd(),
  process.env.CONTENT_DIR || DEFAULT_CONTENT_DIR,
)
