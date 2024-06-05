import Link from 'next/link'

import { Tags } from 'src/components/meta'
import { sortDateDesc } from 'src/utils'

import { allPosts } from 'content-collections'

export default async function Page() {
  return (
    <article>
      <h2 className="my-4">Posts</h2>
      {allPosts
        .filter(p => p.draft === undefined || !p.draft)
        .sort((a, b) => sortDateDesc(a.created, b.created))
        .map(post => {
          return (
            <p className="my-5" key={post.metadata.slug}>
              <Link
                className="no-underline hover:underline"
                href={`/post/${post.metadata.slug}`}
              >
                <h3 className="my-1">{post.title}</h3>
              </Link>
              <span>
                {post.created}
                {', '}
                <Tags tags={post.tags}></Tags>
              </span>
            </p>
          )
        })}
    </article>
  )
}
