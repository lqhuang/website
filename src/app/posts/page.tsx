import Link from 'next/link'

import { Tags } from 'src/components/meta'
import { sortDateDesc } from 'src/utils'

import { allPosts } from 'src/content/posts'

import { WellTyped } from 'src/components/ui/well-typed'

export const dynamicParams = false
export const dynamic = 'force-static'

export default function Page({}) {
  return <div>WIP</div>
  return (
    <article className="prose lg:prose-lg">
      <h2 className="my-4">Posts</h2>
      {allPosts
        .filter(p => !p.frontmatter.draft)
        .sort((a, b) => sortDateDesc(a.metadata.date, b.metadata.date))
        .map(post => {
          const { title, tags, created, updated } = post.frontmatter
          return (
            <WellTyped key={post.metadata.slug}>
              <Link
                className="no-underline hover:underline"
                href={`/post/${post.metadata.slug}`}
              >
                <h1>{title}</h1>
              </Link>
              <span>
                Created: {created}
                {updated && updated !== created && <>, Updated: {updated}</>}
                {tags && tags.length > 0 && <Tags tags={tags}></Tags>}
              </span>
            </WellTyped>
          )
        })}
    </article>
  )
}
