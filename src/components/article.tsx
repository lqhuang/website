import type { ComponentProps, FC } from 'react'
import { twMerge } from 'tailwind-merge'

export const Article: FC<ComponentProps<'article'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <article
      className={twMerge('prose dark:prose-invert prose-h1:my-3', className)}
      {...props}
    >
      {children}
    </article>
  )
}
