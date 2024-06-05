import { allSnapshots } from 'content-collections'
import Link from 'next/link'

import { Markdown } from 'src/components/markdown'
import { Tags } from 'src/components/meta'
import { genPaginations } from 'src/lib/pagination'
import { sortDateDesc } from 'src/utils'

export const dynamicParams = false

const limit = 10
export const generateStaticParams = async () => {
  const { numPages } = genPaginations(allSnapshots, limit)
  return Array.from({ length: numPages }, (_, i) => i + 1).map(pid => {
    return { params: { pid } }
  })
}

export default async function Page({ params }: { params: { pid: number } }) {
  const currPages = allSnapshots
    .sort((a, b) => sortDateDesc(a.date, b.date))
    .slice((params.pid - 1) * limit, params.pid * limit)

  return (
    <>
      {currPages.map(post => {
        return (
          <article key={post.metadata.slug}>
            <Link
              className="no-underline hover:underline"
              href={`/digest/${post.metadata.slug}`}
            >
              <h3 className="my-1">{post.title}</h3>
            </Link>
            <span>
              <span>date: {post.date}</span>
              {post.tags && (
                <>
                  , <Tags tags={post.tags} />
                </>
              )}
            </span>
            <Markdown content={post.content} />
          </article>
        )
      })}
    </>
  )
}
