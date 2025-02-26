import type { UseMdxComponents } from '@mdx-js/mdx'
import type { ComponentProps, FC } from 'react'

import Link from 'next/link'

import './components.css'

const HeadingLink: FC<
  ComponentProps<'h3'> & { tag: `h${1 | 2 | 3 | 4 | 5 | 6}` }
> = ({ tag: Tag, children, id, ...props }) => {
  return (
    <Link
      className="no-underline hover:underline"
      href={id ? `#${id}` : '#'}
      aria-label={id}
    >
      <span className="absolute -mt-3 hidden" id={id} />
      <Tag {...props}>{children}</Tag>
    </Link>
  )
}

const A = ({ children, ...props }: ComponentProps<'a'>) => {
  const { href, target, rel } = props
  if (href === undefined || typeof children !== 'string') {
    return null
  }
  const isExternal = href?.startsWith('https://') || href?.startsWith('http://')

  const targetFallback = isExternal ? '_blank' : target
  const relFallback = isExternal ? 'noreferrer' : rel

  return (
    <Link
      href={href}
      className="no-underline hover:underline"
      passHref
      target={targetFallback}
      rel={relFallback}
      {...props}
    >
      {children}
    </Link>
  )
}

export const useComponents: UseMdxComponents = () => {
  return {
    h1: props => <HeadingLink tag="h1" {...props} />,
    h2: props => <HeadingLink tag="h2" {...props} />,
    h3: props => <HeadingLink tag="h3" {...props} />,
    h4: props => <HeadingLink tag="h4" {...props} />,
    h5: props => <HeadingLink tag="h5" {...props} />,
    h6: props => <HeadingLink tag="h6" {...props} />,
    p: props => {
      const { className, ...rest } = props
      return <p className={`${className ?? ''} my-3`} {...rest} />
    },
    a: A,
    li: props => {
      const { className, ...rest } = props
      return <li className={`${className ?? ''} my-1`} {...rest} />
    },
    // footnotes: Footnotes,
  }
}
