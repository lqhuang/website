/** @jsxImportSource theme-ui */
import { Themed } from 'theme-ui'

const TagSection = ({
  tags,
  tagSlugs,
}: {
  tags?: string[]
  tagSlugs?: string[]
}) => {
  if (tagSlugs === null || tagSlugs === undefined) {
    return <></>
  }

  const tagsLink = tagSlugs
    .map((tag, i) => (
      <span key={tag}>
        <Themed.a href={tag}>{tag}</Themed.a>
      </span>
    ))
    .reduce((prev, curr) => [prev, ', ', curr])

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

export { TagSection }
