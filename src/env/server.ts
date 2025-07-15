import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { DEFAULT_CONTENT_DIR } from 'src/constants'

export const env = createEnv({
  server: {
    CONTENT_DIR: z.string(), // .default(DEFAULT_CONTENT_DIR),
  },
  // For Next.js >= 13.4.4, you can just reference process.env:
  experimental__runtimeEnv: process.env,
})
