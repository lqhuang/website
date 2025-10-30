import type { ReactNode } from 'react'

import Link from 'next/link'

type MetaProps = {
  date?: string | Date
  created?: string | Date
  updated?: string | Date
  tags?: string[]
}

const join2 = (a: ReactNode, b: ReactNode, sep = ',') => (
  <>
    {a}
    {`${sep} `}
    {b}
  </>
)

export const Tags = ({
  tags,
  className,
}: {
  tags: string[]
  className?: string
}) => {
  const tagsLink = (
    <>
      {tags
        .map(tag => (
          <Link
            className={`no-underline hover:underline hover:decoration-current ${className ?? ''}`}
            key={tag}
            href={`/tag/${tag.toLowerCase()}`}
          >
            #{tag}
          </Link>
        ))
        .reduce((prev, curr) => join2(prev, curr))}
    </>
  )
  return (
    <span className={className ?? ''}>
      {`Tags: `}
      {tagsLink}
    </span>
  )
}

export const Meta = ({ date, created, updated, tags }: MetaProps) => {
  const dateString =
    date && (typeof date === 'string' ? date : date.toLocaleDateString())
  const createdString =
    created &&
    (typeof created === 'string' ? created : created.toLocaleDateString())
  const updatedString =
    updated &&
    (typeof updated === 'string' ? updated : updated.toLocaleDateString())

  return (
    <div className="flex flex-row text-sm gap-1 font-mono">
      {dateString && (
        <>
          <span>Date: {dateString}</span>
          <span>·</span>
        </>
      )}
      {createdString && (
        <>
          <span>Created: {createdString}</span>
          <span>·</span>
        </>
      )}
      {updatedString && updated !== created && (
        <>
          <span>Updated: {updatedString}</span>
          <span>·</span>
        </>
      )}
      {tags && tags.length > 0 && <Tags tags={tags} />}
    </div>
  )
}
