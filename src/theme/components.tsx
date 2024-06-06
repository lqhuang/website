import type { UseMdxComponents } from '@mdx-js/mdx'
import type { ComponentProps, ReactElement } from 'react'

import Link from 'next/link'

function HeadingLink({
  tag: Tag,
  children,
  id,
  ...props
}: ComponentProps<'h2'> & { tag: `h${1 | 2 | 3 | 4 | 5 | 6}` }): ReactElement {
  return (
    <Tag className={`subheading-${Tag}`} {...props}>
      {children}
      <span className="absolute -mt-7" id={id} />
      <a
        href={id && `#${id}`}
        className="subheading-anchor"
        aria-label="Permalink for this section"
      />
    </Tag>
  )
}

const A = ({ children, ...props }: ComponentProps<'a'>) => {
  const isExternal =
    props.href?.startsWith('https://') || props.href?.startsWith('http://')
  if (isExternal) {
    return (
      <a target="_blank" rel="noreferrer" {...props}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
        {/* nx-sr-only */}
      </a>
    )
  }
  return props.href ? (
    <Link href={props.href} passHref legacyBehavior>
      <a {...props}>{children}</a>
    </Link>
  ) : null
}

const useComponents: UseMdxComponents = () => {
  return {
    h1: props => <HeadingLink tag="h1" {...props} />,
    h2: props => <HeadingLink tag="h2" {...props} />,
    h3: props => <HeadingLink tag="h3" {...props} />,
    h4: props => <HeadingLink tag="h4" {...props} />,
    h5: props => <HeadingLink tag="h5" {...props} />,
    h6: props => <HeadingLink tag="h6" {...props} />,
    a: A,
    pre: ({ children, ...props }) => (
      <div className="not-prose">
        <Pre {...props}>{children}</Pre>
      </div>
    ),
    tr: Tr,
    th: Th,
    td: Td,
    table: props => <Table className="not-prose" {...props} />,
    code: Code,
    button: Button,
  }
}
