import type { FC } from 'react'

import Link from 'next/link'

interface PostLinkProps {
  text: string
  href: string
}

interface PrevNext {
  prev?: PostLinkProps
  next?: PostLinkProps
  className?: string
}

export const PrevNextNav: FC<PrevNext> = ({ prev, next, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {prev && (
        <Link className="self-start no-underline" href={prev.href}>
          <div className="flex flex-row">
            <div className="mr-3 flex items-center">{'<'}</div>
            <div className="flex flex-col">
              <div>Prev</div>
              <div>{prev.text}</div>
            </div>
          </div>
        </Link>
      )}
      {next && (
        <Link className="self-end no-underline" href={next.href}>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="self-end">Next</div>
              <div>{next.text}</div>
            </div>
            <div className="ml-3 flex items-center">{'>'}</div>
          </div>
        </Link>
      )}
    </div>
  )
}
