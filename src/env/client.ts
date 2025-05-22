import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_GA_ID: z.string().optional(),
    NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
    NEXT_PUBLIC_SELINE_TOKEN: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
    NEXT_PUBLIC_SELINE_TOKEN: process.env.NEXT_PUBLIC_SELINE_TOKEN,
  },
})
