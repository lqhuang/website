import { allPosts } from 'content-collections'
import Link from 'next/link'

export default async function Page() {
  return (
    <>
      <h1 className="my-3">Posts</h1>
      {allPosts
        .sort(p => new Date(p.created).getTime())
        .reverse()
        .map(post => {
          return (
            <p className="my-2" key={post.metadata.slug}>
              <Link
                className="no-underline hover:underline"
                href={`/post/${post.metadata.slug}`}
              >
                <h3 className="my-1">{post.title}</h3>
              </Link>
              <span>{post.created}</span>
            </p>
          )
        })}
    </>
  )
}
