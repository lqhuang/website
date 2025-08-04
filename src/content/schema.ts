import { z } from 'zod'

export const NoteFrontMatter = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.string().array().optional(),
  draft: z.boolean().optional(),
  ref: z.string().optional(),
})
export type NoteFrontMatter = z.infer<typeof NoteFrontMatter>

export const PostFrontMatter = z.object({
  title: z.coerce.string(),
  created: z.coerce.string(),
  updated: z.coerce.string(),
  tags: z.string().array().optional(),
  draft: z.coerce.boolean().optional(),
})
export type PostFrontMatter = z.infer<typeof PostFrontMatter>

export const ProjectFrontMatter = z.object({})
export type ProjectFrontMatter = z.infer<typeof ProjectFrontMatter>
