import type { UseMdxComponents } from '@mdx-js/mdx'
import type { ComponentProps, FC } from 'react'

import Link from 'next/link'
import { codeToHtml, createCssVariablesTheme } from 'shiki'

import { Img, SVG, Picture } from './images'

import './components.css'

const cssVariablesTheme = createCssVariablesTheme({})

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

const Code: FC<ComponentProps<'code'>> = async props => {
  if (typeof props.children === 'string') {
    const code = await codeToHtml(props.children, {
      lang: 'jsx',
      theme: cssVariablesTheme,
      // theme: 'min-light',
      // theme: 'snazzy-light',
      transformers: [
        {
          // Since we're using dangerouslySetInnerHTML, the code and pre
          // tags should be removed.
          pre: hast => {
            if (hast.children.length !== 1) {
              throw new Error('<pre>: Expected a single <code> child')
            }
            if (hast.children[0].type !== 'element') {
              throw new Error('<pre>: Expected a <code> child')
            }
            return hast.children[0]
          },
          postprocess(html) {
            return html.replace(/^<code>|<\/code>$/g, '')
          },
        },
      ],
    })

    return (
      <code
        className="shiki css-variables inline text-[0.805rem] sm:text-[13.8px] md:text-[0.92rem]"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    )
  }

  return <code className="inline" {...props} />
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
    code: Code,
    img: Img,
    // picture: Picture,
    // svg: SVG,
    // footnotes: Footnotes,
  }
}

export const defaultComponents = useComponents()
