import type { FC } from 'react'
import type { Metadata } from 'next'

import Head from 'next/head'
import Link from 'next/link'

type PostLinkProps = {
  text: string
  href: string
}

type PrevNext = {
  prev?: PostLinkProps
  next?: PostLinkProps
  className?: string
}

export const PrevNextNav: FC<PrevNext> = ({ prev, next, className }) => {
  return (
    <>
      <Head>
        {/* FIXME: not work ??? */}
        {prev && <link rel="prev" href={prev.href} />}
        {next && <link rel="next" href={next.href} />}
      </Head>
      <div className={`flex flex-col ${className}`}>
        {prev && (
          <Link className="self-start no-underline" href={prev.href}>
            <div className="flex flex-row items-center gap-3">
              <span className="text-nowrap">{'<-'}</span>
              <span className="text-sm">{prev.text}</span>
            </div>
          </Link>
        )}
        {next && (
          <Link className="self-end no-underline" href={next.href}>
            <div className="flex flex-row items-center gap-3">
              <span className="text-sm text-end">{next.text}</span>
              <span className="text-nowrap">{'->'}</span>
            </div>
          </Link>
        )}
      </div>
    </>
  )
}
