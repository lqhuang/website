import { join } from 'node:path'

import z from 'zod'

import { defineOneDoc } from 'src/lib/content/local'
import { themeConfig } from 'src/theme-config'
import { Article } from 'src/components/article'
import { env } from 'src/env/server'

export const dynamicParams = false
export const dynamic = 'force-static'

export default async function AboutMe() {
  const { site } = themeConfig
  if (!site) {
    return <p>Site config is missing</p>
  }
  const { author, nickname, social } = site

  const about = await defineOneDoc(
    join(env.CONTENT_DIR, 'about.md'),
    z.object({}),
  )
  const { metadata, content } = about

  return <Article key={metadata.slug}>{content}</Article>
}
