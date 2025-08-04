import { z } from 'zod'

export const NoteFrontMatter = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.string().array().optional(),
  ref: z.string().optional(),
  draft: z.boolean().optional(),
  deprecated: z.boolean().optional(),
})
export type NoteFrontMatter = z.infer<typeof NoteFrontMatter>

export const PostFrontMatter = z.object({
  title: z.coerce.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  tags: z.string().array().optional(),
  draft: z.coerce.boolean().optional(),
  deprecated: z.boolean().optional(),
})
export type PostFrontMatter = z.infer<typeof PostFrontMatter>

export const ProjectFrontMatter = z.object({
  title: z.coerce.string().optional(),
  date: z.coerce.date().optional(),
  tags: z.string().array().optional(),
})
export type ProjectFrontMatter = z.infer<typeof ProjectFrontMatter>
