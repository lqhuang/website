import type { ReactNode } from 'react'
import Link from 'next/link'

interface MetaProps {
  date?: string | Date
  created?: string | Date
  updated?: string | Date
  tags?: string[]
}

const join2 = (a: ReactNode, b: ReactNode, sep: string = ',') => (
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
        .sort()
        .map(tag => (
          <Link
            className={`no-underline ${className ?? ''}`}
            key={tag}
            href={`/tags/${tag.toLowerCase()}`}
          >
            {tag}
          </Link>
        ))
        .reduce((prev, curr) => join2(prev, curr))}
    </>
  )

  return <span>tags: {tagsLink}</span>
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
    <div className="flex flex-row">
      {dateString && `Date: ${dateString}`}
      {createdString && `Created: ${createdString}`}
      {updatedString && updated !== created && ` · Updated: ${updatedString}`}
      {tags && tags.length > 0 && (
        <>
          {' · '}
          <Tags tags={tags} />
        </>
      )}
    </div>
  )
}
