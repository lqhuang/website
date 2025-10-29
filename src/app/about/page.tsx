import type { Metadata } from 'next'
import { join } from 'node:path'

import z from 'zod'

import { defineOneDoc } from 'src/lib/content/local'
import { Article } from 'src/components/article'
import { env } from 'src/env/server'

import { site } from 'src/config'

export const dynamicParams = false
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn partial facts about me.',
  keywords: [...(site.meta.keywords ?? []), 'about'],
}

export default async function AboutMe() {
  const about = await defineOneDoc(
    join(env.CONTENT_DIR, 'about.md'),
    z.object({}),
  )
  const { metadata, content } = about

  return (
    <>
      <Article key={metadata.slug}>{content}</Article>
    </>
  )
}
