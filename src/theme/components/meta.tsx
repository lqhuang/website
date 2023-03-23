import Link from 'next/link'

interface MetaProps {
  date?: string | Date
  created?: string | Date
  updated?: string | Date
  tags?: string[]
}

const Tags = ({ tags }: { tags?: string[] }) => {
  const tagsLink = (
    <>
      {tags
        ?.sort()
        .map(tag => (
          <Link key={tag} href={`/tags/${tag}`}>
            {tag}
          </Link>
        ))
        .reduce((prev, curr) => [prev, <>{', '}</>, curr])}
    </>
  )

  return (
    <span
      style={{
        fontStyle: 'normal',
        textAlign: 'left',
      }}
    >
      Tags: {tagsLink}
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
