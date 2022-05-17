/** @jsxImportSource theme-ui */
import { FC, ReactElement, ComponentType } from 'react'
import { Themed } from 'theme-ui'

import { TagSection } from 'src/components/tags'
import type { Node } from 'src/types'

interface Props {
  node: Node
  title?: string | ReactElement
  beforeMarker?: string
  HeadingType?: ComponentType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> &
    typeof Themed.h1
}

const PostBlock: FC<Props> = (props) => {
  const { children, node, title, beforeMarker, HeadingType } = props
  const postTitle = title || node.frontmatter.title
  const { tagSlugs } = node.fields

  const H = HeadingType || Themed.h1

  const { date, created, updated } = node.frontmatter
  return (
    <div key={node.fields.slug} sx={{ mb: 3 }}>
      <H
        sx={{
          ':before': beforeMarker
            ? {
                content: `"${beforeMarker} "`,
                color: 'secondary',
              }
            : undefined,
        }}
      >
        {postTitle}
      </H>
      <Themed.p
        sx={{
          fontSize: 'small',
          mb: 3,
          a: {
            textDecoration: 'underline 1px solid',
          },
        }}
      >
        {date && `Date: ${date}`}
        {created && `Created: ${created}`}
        {updated && updated !== created && ` · Updated: ${updated}`}
        {tagSlugs && tagSlugs.length > 0 && (
          <>
            {' '}
            &middot; <TagSection tagSlugs={tagSlugs} />
          </>
        )}
      </Themed.p>
      {children}
    </div>
  )
}

export { PostBlock }
