import type { UseMdxComponents } from '@mdx-js/mdx'
import type { ComponentProps, FC } from 'react'

import Link from 'next/link'

import { Img, SVG, Picture } from './images'
// import { Code } from './codeblock'

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

const A = ({ href, target, rel, ...props }: ComponentProps<'a'>) => {
  const isExternal =
    href && (href.startsWith('https://') || href.startsWith('http://'))
  const targetFallback = isExternal ? '_blank' : target
  const relFallback = isExternal ? 'noopener noreferrer' : rel
  return (
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
    strong: props => <strong className="font-bold" {...props} />,
    a: A,
    li: props => {
      const { className, ...rest } = props
      return <li className={`${className ?? ''} my-1`} {...rest} />
    },
    blockquote: props => (
      <blockquote
        className="not-mobile:text-rurikon-400 -ml-6 pl-6 sm:-ml-10 sm:pl-10 md:-ml-14 md:pl-14"
        {...props}
      />
    ),
    pre: props => (
      <pre className="mt-7 whitespace-pre md:whitespace-pre-wrap" {...props} />
    ),
    // code: Code,
    img: Img,
    // picture: Picture,
    // svg: SVG,
    // footnotes: Footnotes,
  }
}

export const defaultComponents = useComponents()
