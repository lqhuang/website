import type { ComponentProps, FC } from 'react'
import type { MDXComponents } from 'mdx/types'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { Img, SVG, Picture } from './images'

const makeAnchor = (tag: `h${1 | 2 | 3 | 4 | 5 | 6}`) => {
  switch (tag) {
    case 'h1':
      return '#'
    case 'h2':
      return '##'
    case 'h3':
      return '###'
    case 'h4':
      return '####'
    case 'h5':
      return '#####'
    case 'h6':
      return '######'
  }
}

const HeadingLink: FC<
  ComponentProps<'h3'> & { tag: `h${1 | 2 | 3 | 4 | 5 | 6}` }
> = ({ tag: Tag, className, id, ...props }) => {
  const content = makeAnchor(Tag)
  return (
    <Link
      className={`hover: no-underline hover:underline hover:after:content-['${content}']`}
      href={id ? `#${id}` : '#'}
      aria-label={id}
    >
      <span className="absolute -mt-3 hidden" id={id} />
      <Tag className={twMerge(className, 'text-balance')} {...props} />
    </Link>
  )
}

const A = ({ href, target, rel, ...props }: ComponentProps<'a'>) => {
  const isExternal =
    href && (href.startsWith('https://') || href.startsWith('http://'))
  const targetFallback = isExternal ? '_blank' : target
  const relFallback = isExternal ? 'noopener noreferrer' : rel
  return (
    // after:content-['_↗']
    <Link
      className="no-underline hover:underline"
      href={href}
      passHref
      target={targetFallback}
      rel={relFallback}
      {...props}
    />
  )
}

export const defaultComponents: MDXComponents = {
  h1: props => <HeadingLink tag="h1" {...props} />,
  h2: props => <HeadingLink tag="h2" {...props} />,
  h3: props => <HeadingLink tag="h3" {...props} />,
  h4: props => <HeadingLink tag="h4" {...props} />,
  h5: props => <HeadingLink tag="h5" {...props} />,
  h6: props => <HeadingLink tag="h6" {...props} />,
  p: ({ className, ...props }) => (
    <p className={twMerge(className, 'my-3 text-pretty')} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong className={twMerge(className, 'font-bold')} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={twMerge(className, 'list-outside list-disc')} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={twMerge(className, 'list-outside list-decimal')}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={twMerge(className, '')} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={twMerge(className)} {...props} />
  ),
  a: A,
  pre: ({ className, ...props }) => (
    <pre
      className={twMerge(
        className,
        'mt-7 whitespace-pre md:whitespace-pre-wrap',
      )}
      {...props}
    />
  ),
  img: Img,
}
