import type { Doc } from './schema'

import { z } from 'zod'

type Cache = 'memory' | 'disk' | 'sqlite' | 'none'

type DefineCollectionParams<T, Output> = {
  name: string
  directory: string
  include: string
  //   yaml: true,
  schema: z.ZodSchema<T>
  transform: (doc: Doc<T>, context: any) => Output
  cache: Cache
}

export const defineCollection = <T, Output>(
  params: DefineCollectionParams<T, Output>,
) => params
