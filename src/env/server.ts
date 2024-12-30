import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { DEFAULT_CONTENT_DIR } from 'src/constants'

export const env = createEnv({
  server: {
    CONTENT_DIR: z.string().default(DEFAULT_CONTENT_DIR),
  },
  experimental__runtimeEnv: process.env,
})
